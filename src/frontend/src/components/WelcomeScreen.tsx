import { Bot, Lightbulb, MessageCircle, Sparkles } from "lucide-react";
import { SynapseIcon } from "./SynapseIcon";

interface WelcomeScreenProps {
  onPrompt: (prompt: string) => void;
}

const PROMPTS = [
  { icon: Lightbulb, label: "Explain quantum entanglement in simple terms" },
  {
    icon: MessageCircle,
    label: "Write me a short story about a robot who discovers music",
  },
  {
    icon: Sparkles,
    label: "What are the most important AI breakthroughs of 2024?",
  },
  { icon: Bot, label: "Help me debug a React component that won't re-render" },
];

export function WelcomeScreen({ onPrompt }: WelcomeScreenProps) {
  return (
    <div
      data-ocid="chat.empty_state"
      className="flex flex-col items-center justify-center flex-1 px-4 py-12 text-center"
    >
      {/* Logo mark */}
      <div className="mb-6 relative">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center shadow-lg text-primary">
          <SynapseIcon className="w-10 h-10" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary/70 animate-pulse" />
      </div>

      <h2 className="text-2xl font-display font-bold text-foreground mb-2 tracking-tight">
        Hi, I'm Synapse
      </h2>
      <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-8">
        Your AI assistant powered by the Internet Computer. Ask me anything —
        I'm here to help.
      </p>

      {/* Suggested prompts */}
      <div className="w-full max-w-sm space-y-2">
        {PROMPTS.map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            data-ocid="chat.prompt_button"
            onClick={() => onPrompt(label)}
            className="
              w-full text-left flex items-center gap-3 px-4 py-3
              bg-card border border-border rounded-xl
              text-sm text-foreground hover:border-accent/50 hover:bg-accent/5
              transition-smooth cursor-pointer group
            "
          >
            <Icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
            <span className="line-clamp-1">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
