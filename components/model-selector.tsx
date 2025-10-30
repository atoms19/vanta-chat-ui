"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

const models = ["qwen3:0.6b", "llama3", "codegemma"]

interface ModelSelectorProps {
  selectedModel: string
  onModelChange: (model: string) => void
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        {selectedModel}
        <ChevronsUpDown className="size-4" />
      </Button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-full rounded-md border bg-zinc-900/80 p-2 backdrop-blur-md">
          {models.map((model) => (
            <Button
              key={model}
              variant="ghost"
              className="flex w-full items-center justify-between"
              onClick={() => {
                onModelChange(model)
                setIsOpen(false)
              }}
            >
              <span>{model}</span>
              {selectedModel === model && <Check className="size-4" />}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
