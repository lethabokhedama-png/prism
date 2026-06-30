import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Conversation, Message } from '@/types/chat.types'

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

interface ChatState {
  conversations: Conversation[]
  activeId: string | null

  startNewConversation: () => string
  setActiveId: (id: string) => void
  getActive: () => Conversation | null
  addMessage: (convId: string, msg: Message) => void
  updateMessage: (convId: string, msgId: string, patch: Partial<Message>) => void
  setTitle: (convId: string, title: string) => void
  deleteConversation: (convId: string) => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeId: null,

      startNewConversation: () => {
        const id = uid()
        const conv: Conversation = {
          id,
          title: 'New Chat',
          createdAt: Date.now(),
          updatedAt: Date.now(),
          messages: [],
          model: 'claude-sonnet-4-6',
          cascadeProfile: 'quality',
        }
        set((s) => ({ conversations: [conv, ...s.conversations], activeId: id }))
        return id
      },

      setActiveId: (id) => set({ activeId: id }),

      getActive: () => {
        const { conversations, activeId } = get()
        return conversations.find((c) => c.id === activeId) ?? null
      },

      addMessage: (convId, msg) => set((s) => ({
        conversations: s.conversations.map((c) =>
          c.id === convId
            ? { ...c, messages: [...c.messages, msg], updatedAt: Date.now() }
            : c
        ),
      })),

      updateMessage: (convId, msgId, patch) => set((s) => ({
        conversations: s.conversations.map((c) =>
          c.id === convId
            ? {
                ...c,
                messages: c.messages.map((m) => m.id === msgId ? { ...m, ...patch } : m),
                updatedAt: Date.now(),
              }
            : c
        ),
      })),

      setTitle: (convId, title) => set((s) => ({
        conversations: s.conversations.map((c) => c.id === convId ? { ...c, title } : c),
      })),

      deleteConversation: (convId) => set((s) => ({
        conversations: s.conversations.filter((c) => c.id !== convId),
        activeId: s.activeId === convId ? null : s.activeId,
      })),
    }),
    { name: 'prism-chats' }
  )
)
