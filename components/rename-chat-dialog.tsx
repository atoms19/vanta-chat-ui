"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"

interface RenameChatDialogProps {
  isOpen: boolean
  onClose: () => void
  onRename: (newName: string) => void
  chatName: string
}

export function RenameChatDialog({ isOpen, onClose, onRename, chatName }: RenameChatDialogProps) {
  const [newName, setNewName] = useState(chatName)

  const handleSave = () => {
    onRename(newName)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Chat</DialogTitle>
          <DialogDescription>
            Enter a new name for this chat.
          </DialogDescription>
        </DialogHeader>
        <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}