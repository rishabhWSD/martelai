import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const agentMemories: Record<string, string[]> = {};

// Local type for OpenAI chat messages
export type AgentChatMessage =
  | { role: "system" | "user" | "assistant"; content: string }
  | { role: "function"; content: string; name: string };

export async function streamAgentReply(
  prompt: string, 
  agent: string, 
  externalHistory?: AgentChatMessage[]
) {
  if (!agentMemories[agent]) agentMemories[agent] = [];

  // If no external history is provided, use the internal memory
  if (!externalHistory) {
    agentMemories[agent].push(`User: ${prompt}`);
    const history = agentMemories[agent].slice(-10).join("\n");
    
    const messages: AgentChatMessage[] = [
      { role: "system", content: `You are ${agent}, a specialized strategy AI.` },
      { role: "user", content: history },
    ];
    
    return messages;
  }
  
  // If external history is provided, use that instead
  const messages: AgentChatMessage[] = [
    { role: "system", content: `You are ${agent}, a specialized strategy AI.` },
    ...externalHistory,
    { role: "user", content: prompt }
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    stream: true,
    messages: messages as any, // Cast to any to satisfy the SDK
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const text = chunk.choices?.[0]?.delta?.content || "";
        controller.enqueue(encoder.encode(`data: ${text}\n\n`));
      }
      controller.close();
    },
  });

  agentMemories[agent].push(`Assistant: [RESPONSE STREAMED]`);
  return stream;
}
