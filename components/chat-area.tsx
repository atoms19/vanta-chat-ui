'use client'


import { useState, KeyboardEvent, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ArrowUpIcon, Loader2 } from 'lucide-react'
import { AutoResizeTextarea } from '@/components/autoresize-textarea'
import { cn } from '@/lib/utils'

interface ChatAreaProps {
  onSubmit: (message: string) => void
  disabled?: boolean
  isLoading?: boolean
  className?: string
}

export function ChatArea({ onSubmit, disabled, isLoading, className }: ChatAreaProps) {
  const [input, setInput] = useState('')

  const handleSubmit = () => {
    const trimmed = input.trim()
    if (!trimmed || disabled || isLoading) return
    onSubmit(trimmed)
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  return (
    <div
      className={cn(
        'relative flex w-full items-end gap-2 rounded-xl border bg-background px-4 py-2 shadow-sm',
        className
      )}
    >
      <AutoResizeTextarea
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={input}
        placeholder="Enter a message..."
        disabled={disabled || isLoading}
        rows={1}
        className={cn(
          'flex-1 resize-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none disabled:opacity-50'
        )}
      />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!input.trim() || disabled || isLoading}
            size="icon"
            variant="ghost"
            className="mb-1 rounded-full"
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              <ArrowUpIcon size={16} />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={8}>Submit</TooltipContent>
      </Tooltip>
    </div>
  )
}
