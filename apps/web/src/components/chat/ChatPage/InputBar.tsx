import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mic } from 'lucide-react'
import { springs } from '@/styles/motion'
import SendButton from './SendButton'
import FileAttach from './FileAttach'
import FilePreview from './FilePreview/index'
import type { Attachment } from '@/types/chat.types'

interface Props {
  onSend: (text: string, attachments: Attachment[]) => void
  disabled?: boolean
  placeholder?: string
}

export default function InputBar({ onSend, disabled, placeholder = 'Message Prism...' }: Props) {
  const [text, setText] = useState('')
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${Math.min(ta.scrollHeight, 140)}px`
  }, [text])

  const hasContent = text.trim().length > 0 || attachments.length > 0
  const canSend = hasContent && !disabled

  const handleSend = () => {
    if (!canSend) return
    onSend(text.trim(), attachments)
    setText('')
    setAttachments([])
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const addFiles = (files: Attachment[]) => {
    setAttachments((prev) => [...prev, ...files])
  }

  const removeFile = (id: string) => {
    setAttachments((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="pb-[env(safe-area-inset-bottom)] flex-shrink-0">
      <AnimatePresence>
        {attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <FilePreview files={attachments} onRemove={removeFile} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-3 py-2.5">
        <div className="flex items-end gap-1.5 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-[24px] px-2.5 py-2">
          <FileAttach onFiles={addFiles} />

          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKey}
            placeholder={placeholder}
            rows={1}
            disabled={disabled}
            className="flex-1 bg-transparent text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] resize-none outline-none leading-relaxed max-h-[140px] py-1.5"
          />

          <AnimatePresence mode="wait" initial={false}>
            {hasContent ? (
              <motion.div
                key="send"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={springs.snappy}
              >
                <SendButton onClick={handleSend} disabled={!canSend} />
              </motion.div>
            ) : (
              <motion.button
                key="mic"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                whileTap={{ scale: 0.88, transition: springs.snappy }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-tertiary)] hover:bg-white/6 flex-shrink-0"
              >
                <Mic size={18} strokeWidth={1.8} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}