import { type CoreMessage, streamText } from "ai"
import { createOllama, ollama } from 'ollama-ai-provider';

const ollamaModel=createOllama({
  baseURL:'http://localhost:11434/api/'
})

export async function POST(req: Request) {
  const { messages, model, system }: { messages: CoreMessage[], model: string, system: string } = await req.json()
  
  const result = streamText({
    model: ollamaModel(model || "qwen3:0.6b"),
    system: system || "You are a helpful assistant.",
    messages,
  })

  return result.toDataStreamResponse()
}
