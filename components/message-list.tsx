"use client"

import { Message } from "@ai-sdk/react"
import { MessageBubble, MessageSpeaking, MessageThinking } from "@/components/message-bubble"
import { useEffect, useState } from "react";
import hljs from "highlight.js";

interface MessageListProps {
	messages: Message[];
	isLoading: boolean;
	status:any
}

export function MessageList({ messages, isLoading,status }: MessageListProps) {

	let [speaking, setSpeaking] = useState(false)
	useEffect(() => {
		const last = messages[messages.length - 1];
		const started = last?.parts?.some(p => p.type === 'text' && p.text.length > 0);

		if (status === 'streaming' && started) {
			setSpeaking(true);
		} else {
			setSpeaking(false);
		}
	}, [status, messages]);
	return (
		<div className="my-4 flex h-fit min-h-full flex-col gap-4 overflow-auto no-scroll">
			{messages.map((message, index) => (
				<MessageBubble
					key={index}
					role={message.role}
					content={message.content}
				/>
			))}
			{(isLoading && !speaking) && <MessageThinking />}
			{(speaking) && <MessageSpeaking/> }
		</div>
	)
}
