import { Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import type { CascadeEvent as CascadeEventType } from '@/types/chat.types'

const reasonLabel: Record<CascadeEventType['reason'], string> = {
  token_threshold: 'token limit reached',
  cost_cap:        'cost cap reached',
  rate_limit:      'rate limited',
  error:           'provider error',
  manual:          'switched manually',
  quality_signal:  'upgrading model',
}

interface Props {
  event: CascadeEventType
}

export default function CascadeEvent({ event }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center gap-2 py-3 px-4"
    >
      <div className="flex-1 h-px bg-[var(--border-subtle)]" />
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-purple-dim)] text-[var(--accent-purple)]">
        <Zap size={11} strokeWidth={2.5} />
        <span className="text-[11px] font-medium">
          {event.from.split('/').pop()} → {event.to.split('/').pop()} · {reasonLabel[event.reason]}
        </span>
      </div>
      <div className="flex-1 h-px bg-[var(--border-subtle)]" />
    </motion.div>
  )
}
