import { ArrowUp } from "lucide-react";
import { useCallback, useRef } from "react";
import { Button } from "./ui/button";

interface ChatInputProps {
  onSend: (message: string) => Promise<void>;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const value = textareaRef.current?.value.trim();
    if (!value || isLoading) return;
    textareaRef.current!.value = "";
    textareaRef.current!.style.height = "auto";
    onSend(value);
  }, [onSend, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = "auto";
    // Max 3 lines ≈ 24px line-height × 3 + padding
    const maxHeight = 24 * 3 + 24;
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  };

  return (
    <div className="sticky bottom-0 z-10 bg-background border-t border-border px-4 py-3 safe-area-bottom">
      <div className="max-w-3xl mx-auto flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            data-ocid="chat.input"
            placeholder="Type your message..."
            rows={1}
            disabled={isLoading}
            onKeyDown={handleKeyDown}
            onChange={handleInput}
            className="
              message-input resize-none leading-6
              disabled:opacity-50 disabled:cursor-not-allowed
              min-h-[44px] max-h-[96px] overflow-y-auto
            "
          />
        </div>
        <Button
          data-ocid="chat.submit_button"
          onClick={handleSend}
          disabled={isLoading}
          size="icon"
          className="h-11 w-11 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground flex-shrink-0 transition-smooth shadow-sm"
          aria-label="Send message"
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-2 max-w-3xl mx-auto">
        Synapse AI V2.4 | May be inaccurate
      </p>
    </div>
  );
}
