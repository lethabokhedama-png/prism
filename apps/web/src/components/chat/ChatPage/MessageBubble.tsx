import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { listItemVariants } from '@/styles/motion'
import type { Message } from '@/types/chat.types'
import CascadeEvent from './CascadeEvent'
import FilePreview from './FilePreview/index'

interface Props {
  message: Message
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user'

  return (
    <>
      {message.cascadeEvent && <CascadeEvent event={message.cascadeEvent} />}

      <motion.div
        variants={listItemVariants}
        className={cn('flex px-4 py-1', isUser ? 'justify-end' : 'justify-start')}
      >
        <div
          className={cn(
            'max-w-[82%] rounded-[20px] px-4 py-3 text-[15px] leading-relaxed',
            isUser
              ? 'bg-[var(--accent-purple)] text-white rounded-br-[6px]'
              : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] rounded-bl-[6px] ring-1 ring-[var(--border-subtle)]'
          )}
        >
          {message.attachments && message.attachments.length > 0 && (
            <div className="mb-2 -mx-2">
              <FilePreview files={message.attachments} />
            </div>
          )}

          {message.streaming ? (
            <span>
              {message.content}
              <span className="inline-block w-[3px] h-[14px] bg-current ml-0.5 animate-pulse rounded-full" />
            </span>
          ) : (
            <span className="whitespace-pre-wrap">{message.content}</span>
          )}

          {message.tokenUsage && !message.streaming && (
            <div className="mt-2 pt-2 border-t border-white/10 flex gap-3 text-[10px] opacity-60 tabular-nums">
              <span>{message.tokenUsage.total} tok</span>
              <span>${message.tokenUsage.costUsd.toFixed(4)}</span>
              {message.model && <span>{message.model.split('/').pop()}</span>}
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}
