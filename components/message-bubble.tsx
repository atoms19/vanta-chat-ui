import { useEffect, useState, useMemo, useRef, memo } from "react"
import { marked } from "marked"
import hljs from "highlight.js"
import "highlight.js/styles/github-dark.css"
import { cva } from "class-variance-authority"
import { ThinkingBlock } from "./thinking-block"

const messageBubble = cva(
  "max-w-[80%] rounded-xl px-4 py-3 text-sm backdrop-blur-md shadow-md ring-1",
  {
    variants: {
      role: {
        assistant:
          "self-start bg-gradient-to-br from-[#2e2b44]/60 to-[#1f1d33]/60 text-[#bbaaff] ring-[#bbaaff]/30",
        user:
          "self-end bg-gradient-to-br from-[#bbaaff]/40 to-[#8f80ff]/50 text-white ring-[#d2c7ff]/40",
      },
    },
    defaultVariants: {
      role: "assistant",
    },
  },
)

interface MessageBubbleProps {
  role: "user" | "assistant"
  content: string
}

export const MessageBubble = memo(({ role, content }: MessageBubbleProps) => {
  const [thinkingContent, setThinkingContent] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [isThinkingDone, setIsThinkingDone] = useState(false)
  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (content) {
      const thinkTagStart = content.indexOf("<think>")
      const thinkTagEnd = content.indexOf("</think>")

      if (thinkTagStart !== -1) {
        if (thinkTagEnd !== -1) {
          setThinkingContent(content.substring(thinkTagStart + 7, thinkTagEnd))
          setMessageContent(content.substring(thinkTagEnd + 8))
          setIsThinkingDone(true)
        } else {
          setThinkingContent(content.substring(thinkTagStart + 7))
          setMessageContent("")
          setIsThinkingDone(false)
        }
      } else {
        setMessageContent(content)
        setThinkingContent("")
      }
    }
  }, [content])

  const processedContent = useMemo(() => {
    if (!messageContent) return ""
    return marked.parse(messageContent) as string
  }, [messageContent])

  useEffect(() => {
    if (messageRef.current) {
      const codeBlocks = messageRef.current.querySelectorAll("pre code")
      codeBlocks.forEach((block) => {
        hljs.highlightElement(block as HTMLElement)
      })
    }
  }, [processedContent])

  return (
    <div className="flex flex-col gap-2">
      {thinkingContent && <ThinkingBlock content={thinkingContent} isThinkingDone={isThinkingDone} />}
      {messageContent && (
        <div
          ref={messageRef}
          data-role={role}
          className={messageBubble({ role })}
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      )}
    </div>
  )
})

MessageBubble.displayName = "MessageBubble"



export const MessageThinking = memo(() => {
  return (
    <div
      className={messageBubble({
        role: "assistant",
      })}
    >
      <img src="https://media1.tenor.com/m/K3LslQdLo04AAAAd/inugami-korone-hololive.gif" className="w-48 h-48 rounded" />
    </div>
  )
})

MessageThinking.displayName = "MessageThinking"

export const MessageSpeaking = memo(() => {
  return (
    <div
      className={messageBubble({
        role: "assistant",
      })}
    >
      <img src="https://media1.tenor.com/m/RqnPsg7BRUEAAAAC/hololive-inugami-korone.gif" className="w-48 h-48 rounded" />
    </div>
  )
})

MessageSpeaking.displayName = "MessageSpeaking"


