"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  models: string[];
}

export function ModelSelector({ selectedModel, onModelChange, models }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const truncate = (str: string, n: number) => {
    return str.length > n ? str.slice(0, n - 1) + "..." : str
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        {truncate(selectedModel, 20)}
        <ChevronsUpDown className="size-4" />
      </Button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-full rounded-md border bg-zinc-900/80 p-2 backdrop-blur-md">
          {models.map((model) => (
            <Tooltip key={model}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-between"
                  onClick={() => {
                    onModelChange(model)
                    setIsOpen(false)
                  }}
                >
                  <span>{truncate(model, 20)}</span>
                  {selectedModel === model && <Check className="size-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={12}>{model}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  )
}
