import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion'
import { pageVariants } from '@/styles/motion'
import { useChatStore } from '@/store/chat.store'
import { useRuntimeStore } from '@/store/runtime.store'
import { useProvidersStore } from '@/store/providers.store'
import PageHeader from '@/components/layout/PageHeader'
import MessageList from '@/components/chat/ChatPage/MessageList'
import InputBar from '@/components/chat/ChatPage/InputBar'
import ModelSelector from '@/components/chat/ChatPage/ModelSelector'
import TokenBurnBar from '@/components/chat/ChatPage/TokenBurnBar'
import ErrorBanner, { type ChatErrorKind } from '@/components/chat/ChatPage/ErrorBanner'
import type { Attachment, Message } from '@/types/chat.types'

function uid() { return Math.random().toString(36).slice(2, 10) }

export default function ChatPage() {
  const { id } = useParams()
  const { conversations, activeId, startNewConversation, setActiveId, addMessage, setTitle } = useChatStore()
  const { resetTurn, setStreaming } = useRuntimeStore()
  const { models } = useProvidersStore()
  const [error, setError] = useState<ChatErrorKind | null>(null)

  useEffect(() => {
    if (id) {
      setActiveId(id)
    } else if (!activeId) {
      startNewConversation()
    }
  }, [id])

  useEffect(() => {
    if (models.length === 0) setError('no_key')
    else setError(null)
  }, [models.length])

  const conv = conversations.find((c) => c.id === (id ?? activeId))
  const messages = conv?.messages ?? []

  const handleSend = async (text: string, attachments: Attachment[]) => {
    const convId = conv?.id
    if (!convId) return

    if (models.length === 0) {
      setError('no_key')
      return
    }

    if (messages.length === 0 && text) {
      setTitle(convId, text.slice(0, 40))
    }

    const userMsg: Message = {
      id: uid(),
      role: 'user',
      content: text,
      createdAt: Date.now(),
      attachments: attachments.length ? attachments : undefined,
    }
    addMessage(convId, userMsg)
    resetTurn()
    setStreaming(true)

    const assistantId = uid()
    const assistantMsg: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
      model: 'claude-sonnet-4-6',
      createdAt: Date.now(),
      streaming: true,
    }
    addMessage(convId, assistantMsg)
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col h-full"
    >
      <PageHeader right={<ModelSelector />} />
      <ErrorBanner kind={error} onDismiss={() => setError(null)} />
      <MessageList messages={messages} />
      <TokenBurnBar />
      <InputBar onSend={handleSend} disabled={models.length === 0} />
    </motion.div>
  )
}