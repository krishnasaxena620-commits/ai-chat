import { Bot, Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  PERSONALITY_PRESETS,
  type PersonalityPresetId,
} from "../hooks/use-personality";
import { Button } from "./ui/button";

interface PersonalityModalProps {
  isOpen: boolean;
  onClose: () => void;
  systemPrompt: string;
  onSave: (prompt: string) => void;
}

const PRESET_DESCRIPTIONS: Record<PersonalityPresetId, string> = {
  default: "Friendly & helpful",
  professional: "Formal & thorough",
  creative: "Imaginative & vivid",
  concise: "Brief & to the point",
  tutor: "Step-by-step teaching",
  custom: "Your own prompt",
};

export function PersonalityModal({
  isOpen,
  onClose,
  systemPrompt,
  onSave,
}: PersonalityModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState(systemPrompt);
  const [activeId, setActiveId] = useState<PersonalityPresetId>(() => {
    const match = PERSONALITY_PRESETS.find(
      (p) => p.id !== "custom" && p.prompt === systemPrompt,
    );
    return match ? match.id : "custom";
  });

  // Open/close native dialog + sync state
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (isOpen) {
      setDraft(systemPrompt);
      const match = PERSONALITY_PRESETS.find(
        (p) => p.id !== "custom" && p.prompt === systemPrompt,
      );
      setActiveId(match ? match.id : "custom");
      if (!el.open) el.showModal();
    } else {
      if (el.open) el.close();
    }
  }, [isOpen, systemPrompt]);

  // Handle native cancel event (Escape key)
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    el.addEventListener("cancel", handler);
    return () => el.removeEventListener("cancel", handler);
  }, [onClose]);

  function handlePresetClick(id: PersonalityPresetId) {
    setActiveId(id);
    const preset = PERSONALITY_PRESETS.find((p) => p.id === id);
    if (preset && preset.id !== "custom") {
      setDraft(preset.prompt);
    }
  }

  function handleSave() {
    onSave(draft.trim());
    onClose();
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    const { clientX, clientY } = e;
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      onClose();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      data-ocid="personality.dialog"
      onClick={handleBackdropClick}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      className="fixed inset-0 m-auto w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl p-0 overflow-hidden backdrop:bg-foreground/20 backdrop:backdrop-blur-sm open:flex open:flex-col"
      aria-label="AI Personality"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <Bot className="w-5 h-5 text-primary" />
          <h2 className="font-display font-bold text-base text-foreground">
            AI Personality
          </h2>
        </div>
        <button
          type="button"
          data-ocid="personality.close_button"
          onClick={onClose}
          className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
          aria-label="Close personality editor"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Presets */}
      <div className="px-5 pt-4 pb-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Presets
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PERSONALITY_PRESETS.map((preset) => {
            const isActive = activeId === preset.id;
            return (
              <button
                type="button"
                key={preset.id}
                data-ocid={`personality.preset.${preset.id}`}
                onClick={() => handlePresetClick(preset.id)}
                className={[
                  "relative flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-xl border text-left transition-all duration-200",
                  isActive
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted/50",
                ].join(" ")}
              >
                {isActive && (
                  <span className="absolute top-2 right-2">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                )}
                <span className="text-sm font-medium leading-tight">
                  {preset.label}
                </span>
                <span className="text-xs text-muted-foreground leading-tight">
                  {PRESET_DESCRIPTIONS[preset.id]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom prompt textarea */}
      <div className="px-5 pt-3 pb-4">
        <label
          htmlFor="personality-prompt"
          className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2"
        >
          System Prompt
        </label>
        <textarea
          id="personality-prompt"
          data-ocid="personality.textarea"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            setActiveId("custom");
          }}
          rows={4}
          placeholder="Describe how the AI should behave..."
          className="w-full bg-input text-foreground border border-border rounded-xl px-3.5 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-colors duration-200"
        />
        <p className="text-xs text-muted-foreground mt-1.5">
          This sets the AI&apos;s behavior for the current session.
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-border bg-muted/30">
        <Button
          data-ocid="personality.cancel_button"
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
        >
          Cancel
        </Button>
        <Button
          data-ocid="personality.save_button"
          size="sm"
          onClick={handleSave}
          disabled={!draft.trim()}
          className="gap-1.5"
        >
          <Check className="w-3.5 h-3.5" />
          Save
        </Button>
      </div>
    </dialog>
  );
}
