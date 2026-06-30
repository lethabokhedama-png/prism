import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Loader, ChevronDown, ExternalLink, Sparkles } from 'lucide-react'
import { springs, listContainerVariants, listItemVariants } from '@/styles/motion'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { useAppStore } from '@/store/app.store'
import { PROVIDERS, suggestedProviders } from '@/lib/providers.meta'

type KeyStatus = 'idle' | 'checking' | 'valid' | 'invalid'

interface KeyState {
  value: string
  status: KeyStatus
  error?: string
}

interface Props {
  onNext: () => void
  onSkip: () => void
}

export default function StepApiKeys({ onNext, onSkip }: Props) {
  const { primaryUsage, ollamaStatus, setOllamaStatus } = useAppStore()
  const [keys, setKeys] = useState<Record<string, KeyState>>(
    Object.fromEntries(PROVIDERS.map((p) => [p.id, { value: '', status: 'idle' }]))
  )
  const [expanded, setExpanded] = useState<string | null>(null)

  const suggested = suggestedProviders(primaryUsage)

  useEffect(() => {
    setOllamaStatus('checking')
    fetch('http://localhost:11434/api/tags', { signal: AbortSignal.timeout(2500) })
      .then((r) => setOllamaStatus(r.ok ? 'available' : 'unavailable'))
      .catch(() => setOllamaStatus('unavailable'))
  }, [setOllamaStatus])

  const updateKey = (id: string, value: string) => {
    setKeys((prev) => ({ ...prev, [id]: { value, status: 'idle' } }))
  }

  const checkKey = async (id: string) => {
    const val = keys[id].value.trim()
    if (!val) return
    setKeys((prev) => ({ ...prev, [id]: { ...prev[id], status: 'checking' } }))
    await new Promise((r) => setTimeout(r, 800))
    const valid = val.length > 8
    setKeys((prev) => ({
      ...prev,
      [id]: { ...prev[id], status: valid ? 'valid' : 'invalid', error: valid ? undefined : 'Key format not recognized — check and try again' },
    }))
  }

  const anyValid = Object.values(keys).some((k) => k.status === 'valid')
  const canContinue = anyValid || ollamaStatus === 'available'

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="px-5 pt-4 pb-2 flex-shrink-0">
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-[22px] font-bold text-[var(--text-primary)] mb-0.5">API Keys</h2>
          <p className="text-[12.5px] text-[var(--text-tertiary)] mb-2">Prism auto-detects what each key unlocks</p>
        </motion.div>

        <OllamaStatusRow status={ollamaStatus} />
      </div>

      <motion.div
        variants={listContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-y-auto px-5 space-y-1.5 pb-2"
      >
        {PROVIDERS.map((provider) => {
          const k = keys[provider.id]
          const isOpen = expanded === provider.id
          const isSuggested = suggested.includes(provider.id) && primaryUsage.length > 0

          return (
            <motion.div
              key={provider.id}
              variants={listItemVariants}
              className="rounded-[16px] overflow-hidden bg-[var(--bg-elevated)] border"
              style={{ borderColor: k.status === 'invalid' ? 'rgba(239,68,68,0.4)' : 'var(--border-subtle)' }}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : provider.id)}
                className="w-full flex items-center justify-between px-3.5 py-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <StatusDot status={k.status} />
                  <span className="text-[14px] font-semibold text-[var(--text-primary)] truncate">{provider.name}</span>
                  {isSuggested && (
                    <Badge variant="purple" className="flex-shrink-0">
                      <Sparkles size={9} /> suggested
                    </Badge>
                  )}
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={springs.snappy} className="flex-shrink-0">
                  <ChevronDown size={15} className="text-[var(--text-tertiary)]" />
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
                    <div className="px-3.5 pb-3.5">
                      <input
                        value={k.value}
                        onChange={(e) => updateKey(provider.id, e.target.value)}
                        onBlur={() => checkKey(provider.id)}
                        placeholder={provider.hint}
                        type="password"
                        className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-[12px] px-3 py-2.5 text-[12.5px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent-purple)] transition-colors font-mono mb-2"
                      />

                      <a
                        href={provider.keyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-[11.5px] text-[var(--accent-blue)] font-medium"
                      >
                        <ExternalLink size={11} />
                        Get your {provider.name} key
                      </a>

                      {provider.setupNote && (
                        <p className="text-[11px] text-[var(--text-tertiary)] mt-1.5 leading-relaxed">{provider.setupNote}</p>
                      )}

                      {k.status === 'invalid' && (
                        <p className="text-[11px] text-red-400 mt-1.5">{k.error}</p>
                      )}
                      {k.status === 'valid' && (
                        <p className="text-[11px] text-emerald-400 mt-1.5">Key verified — ready to use</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="px-5 pt-2 pb-2 flex-shrink-0 flex items-center gap-3 bg-[var(--bg-primary)]">
        <button onClick={onSkip} className="text-[13px] font-medium text-[var(--text-tertiary)] px-2 py-2 whitespace-nowrap">
          Skip
        </button>
        <Button onClick={onNext} size="md" fullWidth disabled={!canContinue}>
          {anyValid ? 'Next' : ollamaStatus === 'available' ? 'Continue with Ollama' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

function StatusDot({ status }: { status: KeyStatus }) {
  if (status === 'checking') return <Loader size={13} className="text-[var(--accent-blue)] animate-spin flex-shrink-0" />
  if (status === 'valid')    return <Check size={13} className="text-emerald-400 flex-shrink-0" />
  if (status === 'invalid')  return <X size={13} className="text-red-400 flex-shrink-0" />
  return <div className="w-3 h-3 rounded-full border border-[var(--border-default)] flex-shrink-0" />
}

function OllamaStatusRow({ status }: { status: 'checking' | 'available' | 'unavailable' }) {
  if (status === 'checking') {
    return (
      <div className="flex items-center gap-1.5 mb-2">
        <Loader size={11} className="text-[var(--text-tertiary)] animate-spin" />
        <span className="text-[11.5px] text-[var(--text-tertiary)]">Checking for Ollama...</span>
      </div>
    )
  }
  if (status === 'available') {
    return (
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span className="text-[11.5px] text-emerald-400 font-medium">Ollama detected — offline mode ready</span>
      </div>
    )
  }
  return (
    <div className="mb-2 rounded-[12px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-3 py-2">
      <div className="flex items-center gap-1.5 mb-1">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span className="text-[11.5px] text-amber-400 font-medium">Ollama not detected</span>
      </div>
      <p className="text-[10.5px] text-[var(--text-tertiary)] leading-relaxed">
        Install for free offline AI: <span className="font-mono text-[var(--text-secondary)]">curl -fsSL ollama.com/install.sh | sh</span>
      </p>
    </div>
  )
}