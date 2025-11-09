"use client"

import { cn } from "@/lib/utils"
import { useChat } from "@ai-sdk/react"
import { Paperclip, Send, StopCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AutoResizeTextarea } from "@/components/autoresize-textarea"
import { HistorySidebar } from "@/components/history-sidebar"
import { useEffect, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { ChatHeader } from "@/components/chat-header"
import { InitialPrompts } from "@/components/initial-prompts"
import { MessageList } from "@/components/message-list"
import { useStore } from "@/lib/store"

export function ChatForm({ className, ...props }: React.ComponentProps<"form">) {
  const {
    history,
    currentChat,
    selectedModel,
    models,
    systemPrompt,
    isSidebarOpen,
    setHistory,
    setCurrentChat,
    setSelectedModel,
    setModels,
    addHistoryItem,
    updateHistoryItem,
    deleteHistoryItem,
    renameHistoryItem,
  } = useStore()

  useEffect(() => {
    const fetchModels = async () => {
      const response = await fetch("/api/models")
      const data = await response.json()
      setModels(data.models)
      if (data.models.length > 0 && !selectedModel) {
        setSelectedModel(data.models[0])
      }
    }
    fetchModels()
  }, [selectedModel, setModels, setSelectedModel])

  const { messages, isLoading, input, status, setInput, append, setMessages, stop } = useChat({
    api: "/api/chat",
    body: {
      model: selectedModel,
      system: systemPrompt,
    },
    initialMessages: [
      {
        id: "welcome-message",
        role: "assistant",
        content: "Hello! How can I help you today?",
      },
    ],
  })

  useEffect(() => {
    handleSaveChat()
  }, [messages])

  const handleSaveChat = useCallback(() => {
    if (messages.length > 1) {
      const chatName = messages[1].content.substring(0, 20) + "..."
      const existingChatIndex = history.findIndex((h) => h.name === chatName)

      if (existingChatIndex !== -1) {
        updateHistoryItem(existingChatIndex, { name: chatName, messages: JSON.stringify(messages) })
      } else {
        addHistoryItem({ name: chatName, messages: JSON.stringify(messages) })
      }
    }
  }, [messages, history, updateHistoryItem, addHistoryItem])

  const handleSelectChat = useCallback((chatMessages: string) => {
    setCurrentChat(chatMessages)
    setMessages(JSON.parse(chatMessages))
  }, [setCurrentChat, setMessages])

  const handleNewChat = useCallback(() => {
    handleSaveChat()
    setCurrentChat("")
    setMessages([
      {
        id: "welcome-message",
        role: "assistant",
        content: "Hello! How can I help you today?",
      },
    ])
  }, [handleSaveChat, setCurrentChat, setMessages])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    append({ content: input, role: "user" })
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  return (
    <div className="flex h-full">
      <Navbar />
      <HistorySidebar onSelectChat={handleSelectChat} onNewChat={handleNewChat} />
      <main
        className={cn(
          "ring-none mx-auto flex h-svh max-h-svh w-full max-w-[50rem] flex-col items-stretch border-none pt-16",
          className,
        )}
        {...props}
      >
        <div className="flex-1 content-center overflow-y-auto px-6">
          {messages.length > 1 ? (
            <MessageList status={status} messages={messages} isLoading={isLoading} />
          ) : (
            <ChatHeader />
          )}
        </div>
        <div className="mx-auto w-full max-w-[50rem]">
          {messages.length === 1 && (
            <InitialPrompts onPromptClick={(message) => append({ content: message, role: "user" })} />
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-background ring-ring/10 relative mx-6 mb-6 rounded-2xl border shadow-lg"
        >
          <AutoResizeTextarea
            onKeyDown={handleKeyDown}
            onChange={(v) => setInput(v)}
            value={input}
            placeholder="Enter a message"
            className="placeholder:text-muted-foreground flex-1 resize-none bg-transparent px-4 py-3 text-sm focus:outline-none"
          />

          <div className="flex items-center justify-between border-t p-2">
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Paperclip size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={12}>Attach file</TooltipContent>
              </Tooltip>
            </div>

            {isLoading ? (
              <Button
                onClick={stop}
                variant="ghost"
                size="icon"
                className="rounded-full"
                type="button"
              >
                <StopCircle size={16} />
              </Button>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full enabled:bg-gradient-to-br enabled:from-[#bbaaff] enabled:to-[#8f80ff] enabled:text-white"
                    disabled={!input.trim()}
                    type="submit"
                  >
                    <Send size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={12}>Submit</TooltipContent>
              </Tooltip>
            )}
          </div>
        </form>
      </main>
    </div>
  )
}
