import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useRef, useState } from "react";
import { type Message, MessageRole, createActor } from "../backend";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

interface UseChatOptions {
  systemPrompt?: string;
}

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  isFetchingHistory: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => Promise<void>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

const STORAGE_KEY = "chat-history";

function loadLocalHistory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatMessage[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLocalHistory(messages: ChatMessage[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // ignore
  }
}

function clearLocalHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function toLocalMessage(msg: Message, idx: number): ChatMessage {
  return {
    id: `hist-${idx}`,
    role: msg.role,
    content: msg.content,
    timestamp: Number(msg.timestamp),
  };
}

export function useChat(options: UseChatOptions = {}): UseChatReturn {
  const { systemPrompt } = options;
  const { actor, isFetching } = useActor(createActor);
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    loadLocalHistory(),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingHistory, setIsFetchingHistory] = useState(true);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const idCounter = useRef(0);

  // Resolve history: prefer localStorage; fall back to backend getHistory()
  useEffect(() => {
    if (!actor || isFetching) return;
    let cancelled = false;

    const localHistory = loadLocalHistory();

    if (localHistory.length > 0) {
      // localStorage already has messages — use them, skip backend call
      if (!cancelled) {
        setMessages(localHistory);
        setIsFetchingHistory(false);
      }
      return;
    }

    // No local history — try fetching from backend (first load)
    (async () => {
      try {
        const history = await actor.getHistory();
        if (!cancelled && history.length > 0) {
          const loaded = history.map(toLocalMessage);
          setMessages(loaded);
          saveLocalHistory(loaded);
        }
      } catch {
        // ignore
      } finally {
        if (!cancelled) setIsFetchingHistory(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [actor, isFetching]);

  // Fallback: if actor never becomes available, stop loading spinner
  useEffect(() => {
    if (!isFetching && !actor) {
      setIsFetchingHistory(false);
    }
  }, [actor, isFetching]);

  // Auto-scroll to bottom on new messages or loading state change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const sendMessage = useCallback(
    async (content: string) => {
      if (!actor || !content.trim()) return;

      idCounter.current += 1;
      const userMsg: ChatMessage = {
        id: `msg-${idCounter.current}`,
        role: MessageRole.user,
        content: content.trim(),
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      // Build message to send — prepend system prompt context if set
      const trimmedPrompt = systemPrompt?.trim();
      const messageToSend = trimmedPrompt
        ? `[System: ${trimmedPrompt}]\n\n${content.trim()}`
        : content.trim();

      try {
        const result = await actor.chat(messageToSend);
        const responseText =
          result.__kind__ === "ok"
            ? result.ok
            : `Sorry, I encountered an error: ${result.err}`;

        idCounter.current += 1;
        const assistantMsg: ChatMessage = {
          id: `msg-${idCounter.current}`,
          role: MessageRole.assistant,
          content: responseText,
          timestamp: Date.now(),
        };

        setMessages((prev) => {
          const updated = [...prev, assistantMsg];
          saveLocalHistory(updated);
          return updated;
        });
      } catch {
        idCounter.current += 1;
        const errorMsg: ChatMessage = {
          id: `msg-${idCounter.current}`,
          role: MessageRole.assistant,
          content: "Sorry, something went wrong. Please try again.",
          timestamp: Date.now(),
        };
        setMessages((prev) => {
          const updated = [...prev, errorMsg];
          saveLocalHistory(updated);
          return updated;
        });
      } finally {
        setIsLoading(false);
      }
    },
    [actor, systemPrompt],
  );

  const clearChat = useCallback(async () => {
    clearLocalHistory();
    setMessages([]);
    if (!actor) return;
    try {
      await actor.clearHistory();
    } catch {
      // ignore — local is already cleared
    }
  }, [actor]);

  return {
    messages,
    isLoading,
    isFetchingHistory,
    sendMessage,
    clearChat,
    bottomRef,
  };
}
