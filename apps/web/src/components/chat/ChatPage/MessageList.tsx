import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { listContainerVariants } from '@/styles/motion'
import type { Message } from '@/types/chat.types'
import MessageBubble from './MessageBubble'

interface Props {
  messages: Message[]
}

export default function MessageList({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  const lastContent = messages[messages.length - 1]?.content

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, lastContent])

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-12 h-12 rounded-[18px] bg-[var(--bg-elevated)] flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <polygon points="16,2 30,28 2,28" fill="none" stroke="var(--accent-purple)" strokeWidth="2" strokeLinejoin="round" />
            <line x1="16" y1="2" x2="24" y2="28" stroke="var(--accent-blue)" strokeWidth="1.2" />
          </svg>
        </div>
        <p className="text-[17px] font-semibold text-[var(--text-primary)] mb-1">Start a conversation</p>
        <p className="text-[13px] text-[var(--text-tertiary)]">Ask anything. Prism routes to the best model.</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={listContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 overflow-y-auto overscroll-contain py-4 space-y-0.5"
    >
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </motion.div>
  )
}