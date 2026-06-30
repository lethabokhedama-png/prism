import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export type ChatErrorKind = 'no_key' | 'invalid_key' | 'rate_limited' | 'provider_down' | 'network'

interface Props {
  kind: ChatErrorKind | null
  provider?: string
  onDismiss: () => void
}

const MESSAGES: Record<ChatErrorKind, { title: string; desc: string; cta?: string }> = {
  no_key: {
    title: 'No API key configured',
    desc: 'Add a provider key in Settings to start chatting, or switch to Ollama for offline mode.',
    cta: 'Open Settings',
  },
  invalid_key: {
    title: 'API key rejected',
    desc: 'This key was rejected by the provider. It may be expired or revoked.',
    cta: 'Update key',
  },
  rate_limited: {
    title: 'Rate limited',
    desc: 'This provider is temporarily rate limited. Prism will cascade to the next model automatically.',
  },
  provider_down: {
    title: 'Provider unavailable',
    desc: 'This provider is not responding. Try another model or check back shortly.',
  },
  network: {
    title: 'Connection lost',
    desc: 'Could not reach the Prism gateway. Check that the backend is running.',
  },
}

export default function ErrorBanner({ kind, provider, onDismiss }: Props) {
  const navigate = useNavigate()
  if (!kind) return null
  const msg = MESSAGES[kind]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="mx-3 mt-2 rounded-[16px] bg-red-500/10 border border-red-500/25 px-3.5 py-3 flex gap-2.5"
      >
        <AlertTriangle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-red-300">
            {msg.title}{provider ? ` — ${provider}` : ''}
          </p>
          <p className="text-[11.5px] text-red-300/70 leading-relaxed mt-0.5">{msg.desc}</p>
          {msg.cta && (
            <button
              onClick={() => navigate('/settings')}
              className="text-[12px] font-semibold text-red-300 underline mt-1.5"
            >
              {msg.cta}
            </button>
          )}
        </div>
        <button onClick={onDismiss} className="flex-shrink-0">
          <X size={14} className="text-red-300/60" />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}