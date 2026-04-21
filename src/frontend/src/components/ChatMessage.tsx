import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { MessageRole } from "../backend";
import type { ChatMessage as ChatMessageType } from "../hooks/use-chat";
import { SynapseIcon } from "./SynapseIcon";

interface ChatMessageProps {
  message: ChatMessageType;
  index: number;
}

export function ChatMessage({ message, index }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === MessageRole.user;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-ocid={`chat.item.${index + 1}`}
      className={`group flex items-end gap-2 mb-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
          <SynapseIcon className="w-5 h-5" />
        </div>
      )}

      {/* Bubble + copy button */}
      <div
        className={`relative max-w-[75%] sm:max-w-[65%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}
      >
        <div
          className={`
            relative px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words
            ${
              isUser
                ? "bg-accent text-accent-foreground rounded-br-sm"
                : "bg-card text-card-foreground border border-border rounded-bl-sm"
            }
          `}
        >
          {message.content}
        </div>

        {/* Copy button */}
        <button
          type="button"
          data-ocid={`chat.copy_button.${index + 1}`}
          onClick={handleCopy}
          aria-label="Copy message"
          className={`
            flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground
            transition-opacity duration-200 opacity-0 group-hover:opacity-100
            ${isUser ? "self-end" : "self-start"}
          `}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" /> Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" /> Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export function LoadingBubble() {
  return (
    <div data-ocid="chat.loading_state" className="flex items-end gap-2 mb-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
        <SynapseIcon className="w-5 h-5" />
      </div>
      <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1.5 items-center h-4">
          <span className="loading-dot" style={{ animationDelay: "0ms" }} />
          <span className="loading-dot" style={{ animationDelay: "200ms" }} />
          <span className="loading-dot" style={{ animationDelay: "400ms" }} />
        </div>
      </div>
    </div>
  );
}
