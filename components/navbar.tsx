"use client"

import { ModelSelector } from "./model-selector"

interface NavbarProps {
  selectedModel: string
  onModelChange: (model: string) => void
  models: string[]
}

export function Navbar({ selectedModel, onModelChange, models }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-zinc-900/30 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">Vanta Chat UI</h1>
      </div>
      <ModelSelector selectedModel={selectedModel} onModelChange={onModelChange} models={models} />
    </nav>
  )
}
