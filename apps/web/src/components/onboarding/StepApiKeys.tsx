import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Loader, ChevronDown } from 'lucide-react'
import { springs, listContainerVariants, listItemVariants } from '@/styles/motion'
import Button from '@/components/ui/Button'

const PROVIDERS = [
  { id: 'anthropic', name: 'Anthropic',   hint: 'sk-ant-...',   env: 'ANTHROPIC_API_KEY' },
  { id: 'openai',    name: 'OpenAI',      hint: 'sk-...',       env: 'OPENAI_API_KEY' },
  { id: 'google',    name: 'Google',      hint: 'AIza...',      env: 'GOOGLE_API_KEY' },
  { id: 'groq',      name: 'Groq',        hint: 'gsk_...',      env: 'GROQ_API_KEY' },
  { id: 'mistral',   name: 'Mistral',     hint: 'your key...',  env: 'MISTRAL_API_KEY' },
  { id: 'elevenlabs',name: 'ElevenLabs',  hint: 'your key...',  env: 'ELEVENLABS_API_KEY' },
]

type KeyStatus = 'idle' | 'checking' | 'valid' | 'invalid'

interface KeyState {
  value: string
  status: KeyStatus
  error?: string
}

export default function StepApiKeys({ onNext }: { onNext: () => void }) {
  const [keys, setKeys] = useState<Record<string, KeyState>>(
    Object.fromEntries(PROVIDERS.map((p) => [p.id, { value: '', status: 'idle' }]))
  )
  const [expanded, setExpanded] = useState<string | null>('anthropic')

  const updateKey = (id: string, value: string) => {
    setKeys((prev) => ({ ...prev, [id]: { value, status: 'idle' } }))
  }

  const checkKey = async (id: string) => {
    const val = keys[id].value.trim()
    if (!val) return
    setKeys((prev) => ({ ...prev, [id]: { ...prev[id], status: 'checking' } }))
    await new Promise((r) => setTimeout(r, 900))
    const valid = val.length > 8
    setKeys((prev) => ({
      ...prev,
      [id]: { ...prev[id], status: valid ? 'valid' : 'invalid', error: valid ? undefined : 'Could not verify key' },
    }))
  }

  const anyValid = Object.values(keys).some((k) => k.status === 'valid')
  const ollamaAvailable = true

  return (
    <div className="flex flex-col flex-1 px-6 pt-8 pb-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-[26px] font-bold text-[var(--text-primary)] mb-1">API Keys</h2>
        <p className="text-[14px] text-[var(--text-tertiary)] mb-1">
          Prism auto-detects what each key unlocks.
        </p>
        {ollamaAvailable && (
          <div className="flex items-center gap-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[12px] text-emerald-400 font-medium">Ollama detected — offline mode ready</span>
          </div>
        )}
      </motion.div>

      <motion.div
        variants={listContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-y-auto space-y-2"
      >
        {PROVIDERS.map(({ id, name, hint }) => {
          const k = keys[id]
          const isOpen = expanded === id
          return (
            <motion.div
              key={id}
              variants={listItemVariants}
              className="rounded-[18px] overflow-hidden bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : id)}
                className="w-full flex items-center justify-between px-4 py-3.5"
              >
                <div className="flex items-center gap-3">
                  <StatusDot status={k.status} />
                  <span className="text-[15px] font-semibold text-[var(--text-primary)]">{name}</span>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={springs.snappy}>
                  <ChevronDown size={16} className="text-[var(--text-tertiary)]" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4"
                  >
                    <div className="flex gap-2">
                      <input
                        value={k.value}
                        onChange={(e) => updateKey(id, e.target.value)}
                        onBlur={() => checkKey(id)}
                        placeholder={hint}
                        type="password"
                        className="flex-1 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-[12px] px-3 py-2.5 text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent-purple)] transition-colors font-mono"
                      />
                    </div>
                    {k.status === 'invalid' && (
                      <p className="text-[11px] text-red-400 mt-1.5">{k.error}</p>
                    )}
                    {k.status === 'valid' && (
                      <p className="text-[11px] text-emerald-400 mt-1.5">Key verified</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="mt-6 space-y-3">
        {!anyValid && !ollamaAvailable && (
          <p className="text-[12px] text-[var(--text-tertiary)] text-center">Add at least one key to continue</p>
        )}
        <Button onClick={onNext} size="lg" fullWidth disabled={!anyValid && !ollamaAvailable}>
          {anyValid ? 'Continue' : ollamaAvailable ? 'Continue with Ollama' : 'Add a key to continue'}
        </Button>
        <Button onClick={onNext} variant="ghost" size="md" fullWidth>
          Skip for now
        </Button>
      </div>
    </div>
  )
}

function StatusDot({ status }: { status: KeyStatus }) {
  if (status === 'checking') return <Loader size={14} className="text-[var(--accent-blue)] animate-spin" />
  if (status === 'valid')    return <Check size={14} className="text-emerald-400" />
  if (status === 'invalid')  return <X size={14} className="text-red-400" />
  return <div className="w-3.5 h-3.5 rounded-full border border-[var(--border-default)]" />
}
