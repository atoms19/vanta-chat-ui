"use client"

import { useStore } from "@/lib/store"
import { shallow } from "zustand/shallow"
import { ModelSelector } from "./model-selector"
import { SystemPromptDialog } from "./system-prompt-dialog"

export function Navbar() {
  const selectedModel = useStore((state) => state.selectedModel)
  const models = useStore((state) => state.models)
  const systemPrompt = useStore((state) => state.systemPrompt)
  const setSelectedModel = useStore((state) => state.setSelectedModel)
  const setSystemPrompt = useStore((state) => state.setSystemPrompt)

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-zinc-900/30 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">Vanta Chat UI</h1>
      </div>
      <div className="flex items-center gap-4">
        <SystemPromptDialog systemPrompt={systemPrompt} onSystemPromptChange={setSystemPrompt} />
        <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} models={models} />
      </div>
    </nav>
  )
}
