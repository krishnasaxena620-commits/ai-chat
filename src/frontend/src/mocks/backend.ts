import type { backendInterface, Message, ChatResult } from "../backend";
import { MessageRole } from "../backend";

export const mockBackend: backendInterface = {
  chat: async (_userMessage: string): Promise<ChatResult> => ({
    __kind__: "ok",
    ok: "That's a great question! I'm here to help you explore ideas, answer questions, and have meaningful conversations. What would you like to know?",
  }),
  clearHistory: async (): Promise<void> => undefined,
  getHistory: async (): Promise<Array<Message>> => [
    {
      content: "Hi Synapse, can you explain quantum entanglement in simple terms?",
      role: MessageRole.user,
      timestamp: BigInt(1713400000000),
    },
    {
      content:
        "Absolutely! Quantum entanglement is a phenomenon where two or more particles become linked — measuring one instantly affects the other, no matter how far apart they are. Think of it like a pair of magic dice that always show matching numbers, even when rolled on opposite sides of the universe.",
      role: MessageRole.assistant,
      timestamp: BigInt(1713400005000),
    },
    {
      content: "Great, that's helpful. How does it relate to quantum computing?",
      role: MessageRole.user,
      timestamp: BigInt(1713400010000),
    },
    {
      content:
        "In quantum computing, entanglement allows qubits to be correlated in ways that classical bits cannot. This enables quantum computers to process vast amounts of information simultaneously, making them exponentially faster for specific tasks like cryptography and optimization.",
      role: MessageRole.assistant,
      timestamp: BigInt(1713400015000),
    },
  ],
  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: input.response.headers,
  }),
};
