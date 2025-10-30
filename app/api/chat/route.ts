import { type CoreMessage, streamText } from "ai"
import { createOllama, ollama } from 'ollama-ai-provider';

const ollamaModel=createOllama({
  baseURL:'http://localhost:11434/api/'
})

export async function POST(req: Request) {
  const { messages, model }: { messages: CoreMessage[], model: string } = await req.json()
  
  const result = streamText({
    model: ollamaModel(model || "qwen3:0.6b"),
    system: "You are a helpful assistant.",
    messages,
  })

  return result.toDataStreamResponse()
}
