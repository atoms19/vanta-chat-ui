
import { useEffect, useState } from "react"

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

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const [thinkingContent, setThinkingContent] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [isThinkingDone, setIsThinkingDone] = useState(false)

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

      hljs.highlightAll()
    }
  }, [content])

	const processedContent = marked.parse(messageContent) as string

	return (
    <div className="flex flex-col gap-2">
      {thinkingContent && <ThinkingBlock content={thinkingContent} isThinkingDone={isThinkingDone} />}
      {messageContent && (
        <div
          data-role={role}
          className={messageBubble({ role })}
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      )}
    </div>
	)
}


export function MessageThinking() {
	return (
		<div
			className={messageBubble({
				role: "assistant",
			})}
		>
		<img src="https://media1.tenor.com/m/K3LslQdLo04AAAAd/inugami-korone-hololive.gif" className="w-48 h-48 rounded"/>
		</div>
	)
}



export function MessageSpeaking() {
	return (
		<div
			className={messageBubble({
				role: "assistant",
			})}
		>
		<img src="https://media1.tenor.com/m/RqnPsg7BRUEAAAAC/hololive-inugami-korone.gif" className="w-48 h-48 rounded"/>
		</div>
	)
}

