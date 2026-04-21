import { useCallback, useState } from "react";

const STORAGE_KEY = "ai-personality";

export const PERSONALITY_PRESETS = [
  {
    id: "default",
    label: "Helpful Assistant",
    prompt:
      "You are a helpful AI assistant. Be concise, friendly, and accurate.",
  },
  {
    id: "professional",
    label: "Professional",
    prompt:
      "You are a professional assistant. Use formal language, provide thorough and well-structured answers, and cite reasoning where applicable.",
  },
  {
    id: "creative",
    label: "Creative",
    prompt:
      "You are a creative and imaginative assistant. Think outside the box, use vivid language, and inspire with your responses.",
  },
  {
    id: "concise",
    label: "Concise",
    prompt:
      "You are a concise assistant. Always reply in as few words as possible while still being accurate and complete.",
  },
  {
    id: "tutor",
    label: "Tutor",
    prompt:
      "You are a patient tutor. Explain concepts step by step in simple language, use examples, and check for understanding.",
  },
  {
    id: "custom",
    label: "Custom",
    prompt: "",
  },
] as const;

export type PersonalityPresetId = (typeof PERSONALITY_PRESETS)[number]["id"];

const DEFAULT_PROMPT = PERSONALITY_PRESETS[0].prompt;

function loadStoredPrompt(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored !== null ? stored : DEFAULT_PROMPT;
  } catch {
    return DEFAULT_PROMPT;
  }
}

export interface UsePersonalityReturn {
  systemPrompt: string;
  setPersonality: (prompt: string) => void;
  presets: typeof PERSONALITY_PRESETS;
  activePresetId: PersonalityPresetId;
}

export function usePersonality(): UsePersonalityReturn {
  const [systemPrompt, setSystemPromptState] =
    useState<string>(loadStoredPrompt);

  const setPersonality = useCallback((prompt: string) => {
    setSystemPromptState(prompt);
    try {
      localStorage.setItem(STORAGE_KEY, prompt);
    } catch {
      // ignore
    }
  }, []);

  const activePresetId: PersonalityPresetId = (() => {
    const match = PERSONALITY_PRESETS.find(
      (p) => p.id !== "custom" && p.prompt === systemPrompt,
    );
    return match ? match.id : "custom";
  })();

  return {
    systemPrompt,
    setPersonality,
    presets: PERSONALITY_PRESETS,
    activePresetId,
  };
}
