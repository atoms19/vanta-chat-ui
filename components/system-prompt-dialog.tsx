"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface SystemPromptDialogProps {
  systemPrompt: string
  onSystemPromptChange: (prompt: string) => void
}

export function SystemPromptDialog({ systemPrompt, onSystemPromptChange }: SystemPromptDialogProps) {
  const [prompt, setPrompt] = useState(systemPrompt)

  const handleSave = () => {
    onSystemPromptChange(prompt)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Set System Prompt</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set System Prompt</DialogTitle>
          <DialogDescription>
            Set a custom system prompt for the model. This will be saved in your local storage.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter system prompt"
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
