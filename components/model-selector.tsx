"use client"

import { Button } from "./ui/button"
import { ChevronsUpDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  models: string[];
}

export function ModelSelector({ selectedModel, onModelChange, models }: ModelSelectorProps) {
  const truncate = (str: string, n: number) => {
    return str.length > n ? str.slice(0, n - 1) + "..." : str
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2"
        >
          {truncate(selectedModel, 20)}
          <ChevronsUpDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={selectedModel} onValueChange={onModelChange}>
          {models.map((model) => (
            <DropdownMenuRadioItem key={model} value={model}>
              {truncate(model, 20)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
