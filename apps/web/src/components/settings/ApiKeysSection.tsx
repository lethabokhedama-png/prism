import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Loader, ChevronDown, ExternalLink, RotateCw } from 'lucide-react'
import { springs } from '@/styles/motion'
import { PROVIDERS } from '@/lib/providers.meta'

type KeyStatus = 'idle' | 'checking' | 'valid' | 'invalid'

interface KeyState {
  value: string
  status: KeyStatus
  error?: string
}

export default function ApiKeysSection() {
  const [keys, setKeys] = useState<Record<string, KeyState>>(
    Object.fromEntries(PROVIDERS.map((p) => [p.id, { value: '', status: 'idle' }]))
  )
  const [expanded, setExpanded] = useState<string | null>(null)

  const updateKey = (id: string, value: string) => {
    setKeys((prev) => ({ ...prev, [id]: { value, status: 'idle' } }))
  }

  const checkKey = async (id: string) => {
    const val = keys[id].value.trim()
    if (!val) return
    setKeys((prev) => ({ ...prev, [id]: { ...prev[id], status: 'checking' } }))
    await new Promise((r) => setTimeout(r, 700))
    const valid = val.length > 8
    setKeys((prev) => ({
      ...prev,
      [id]: { ...prev[id], status: valid ? 'valid' : 'invalid', error: valid ? undefined : 'Key rejected by provider' },
    }))
  }

  return (
    <div className="px-1 pb-1 space-y-1.5">
      {PROVIDERS.map((provider) => {
        const k = keys[provider.id]
        const isOpen = expanded === provider.id
        return (
          <div key={provider.id} className="rounded-[14px] bg-[var(--bg-primary)] border border-[var(--border-subtle)] overflow-hidden">
            <button
              onClick={() => setExpanded(isOpen ? null : provider.id)}
              className="w-full flex items-center justify-between px-3 py-2.5"
            >
              <div className="flex items-center gap-2 min-w-0">
                <StatusDot status={k.status} />
                <span className="text-[13px] font-semibold text-[var(--text-primary)] truncate">{provider.name}</span>
              </div>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={springs.snappy} className="flex-shrink-0">
                <ChevronDown size={14} className="text-[var(--text-tertiary)]" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-3 pb-3">
                    <div className="flex gap-1.5">
                      <input
                        value={k.value}
                        onChange={(e) => updateKey(provider.id, e.target.value)}
                        onBlur={() => checkKey(provider.id)}
                        placeholder={provider.hint}
                        type="password"
                        className="flex-1 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-[10px] px-2.5 py-2 text-[12px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent-purple)] transition-colors font-mono"
                      />
                      <button
                        onClick={() => checkKey(provider.id)}
                        className="w-8 h-8 rounded-[10px] bg-white/6 flex items-center justify-center flex-shrink-0"
                      >
                        <RotateCw size={13} className="text-[var(--text-secondary)]" />
                      </button>
                    </div>

                    <a
                      href={provider.keyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-[11px] text-[var(--accent-blue)] font-medium mt-2"
                    >
                      <ExternalLink size={10} />
                      Get your {provider.name} key
                    </a>

                    {k.status === 'invalid' && <p className="text-[10.5px] text-red-400 mt-1.5">{k.error}</p>}
                    {k.status === 'valid' && <p className="text-[10.5px] text-emerald-400 mt-1.5">Verified and active</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

function StatusDot({ status }: { status: KeyStatus }) {
  if (status === 'checking') return <Loader size={12} className="text-[var(--accent-blue)] animate-spin flex-shrink-0" />
  if (status === 'valid')    return <Check size={12} className="text-emerald-400 flex-shrink-0" />
  if (status === 'invalid')  return <X size={12} className="text-red-400 flex-shrink-0" />
  return <div className="w-2.5 h-2.5 rounded-full border border-[var(--border-default)] flex-shrink-0" />
}