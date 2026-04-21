import { Bot, Moon, Sun, Trash2 } from "lucide-react";
import { useState } from "react";
import { ChatInput } from "./components/ChatInput";
import { ChatMessage, LoadingBubble } from "./components/ChatMessage";
import { PersonalityModal } from "./components/PersonalityModal";
import { SynapseIcon } from "./components/SynapseIcon";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { Button } from "./components/ui/button";
import { useChat } from "./hooks/use-chat";
import { usePersonality } from "./hooks/use-personality";
import { useTheme } from "./hooks/use-theme";

export default function App() {
  const {
    messages,
    isLoading,
    isFetchingHistory,
    sendMessage,
    clearChat,
    bottomRef,
  } = useChat();

  const { isDark, toggleTheme } = useTheme();
  const { systemPrompt, setPersonality } = usePersonality();
  const [personalityOpen, setPersonalityOpen] = useState(false);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-dvh bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-card border-b border-border px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 min-w-0">
          <SynapseIcon className="w-7 h-7 text-primary flex-shrink-0" />
          <span className="font-display font-bold text-lg text-foreground tracking-tight">
            Synapse AI
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Personality editor */}
          <Button
            data-ocid="chat.personality_button"
            variant="ghost"
            size="sm"
            onClick={() => setPersonalityOpen(true)}
            className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth gap-1.5 text-xs"
            aria-label="Edit AI personality"
            title="AI Personality"
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Personality</span>
          </Button>

          {/* Theme toggle */}
          <Button
            data-ocid="chat.theme_toggle"
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5" />
            ) : (
              <Moon className="w-3.5 h-3.5" />
            )}
          </Button>

          {/* Clear chat */}
          <Button
            data-ocid="chat.clear_button"
            variant="ghost"
            size="sm"
            onClick={clearChat}
            disabled={!hasMessages || isLoading}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth gap-1.5 text-xs"
            aria-label="Clear conversation"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </Button>
        </div>
      </header>

      {/* Message list */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {isFetchingHistory ? (
            <div
              data-ocid="chat.loading_state"
              className="flex items-center justify-center py-12"
            >
              <div className="flex gap-1.5">
                <span
                  className="loading-dot"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="loading-dot"
                  style={{ animationDelay: "200ms" }}
                />
                <span
                  className="loading-dot"
                  style={{ animationDelay: "400ms" }}
                />
              </div>
            </div>
          ) : !hasMessages ? (
            <WelcomeScreen onPrompt={sendMessage} />
          ) : (
            <div
              data-ocid="chat.list"
              role="log"
              aria-live="polite"
              aria-label="Conversation"
            >
              {messages.map((message, index) => (
                <ChatMessage key={message.id} message={message} index={index} />
              ))}
              {isLoading && <LoadingBubble />}
            </div>
          )}
          <div ref={bottomRef} aria-hidden="true" />
        </div>
      </main>

      {/* Input */}
      <ChatInput onSend={sendMessage} isLoading={isLoading} />

      {/* Personality modal */}
      <PersonalityModal
        isOpen={personalityOpen}
        onClose={() => setPersonalityOpen(false)}
        systemPrompt={systemPrompt}
        onSave={setPersonality}
      />
    </div>
  );
}
