"use client"

import { useState } from "react"
import { ChevronDown, Loader } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

interface ThinkingBlockProps {
  content: string;
  isThinkingDone: boolean;
}

export function ThinkingBlock({ content, isThinkingDone }: ThinkingBlockProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="self-start max-w-[80%] rounded-lg border-transparent bg-zinc-900/30">
      <Button
        variant="ghost"
        className="flex w-full items-center justify-between p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {!isThinkingDone && <Loader className="size-4 animate-spin" />}
          <span className="font-medium text-zinc-300">{isThinkingDone ? "thoughtProcess" : "thinking..."}</span>
        </div>
        <ChevronDown
          className={cn("size-4 transition-transform", isOpen && "rotate-180")}
        />
      </Button>
      {isOpen && (
        <div className="p-4 pt-0">
          <div className="prose prose-sm max-w-full rounded-lg bg-zinc-900/50 p-3 text-zinc-400">
            {content}
          </div>
        </div>
      )}
    </div>
  )
}
