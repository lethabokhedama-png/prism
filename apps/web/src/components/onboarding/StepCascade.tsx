import { motion } from 'framer-motion'
import { Zap, DollarSign, WifiOff } from 'lucide-react'
import { springs, listContainerVariants, listItemVariants } from '@/styles/motion'
import Button from '@/components/ui/Button'
import { useAppStore } from '@/store/app.store'

const PROFILES = [
  {
    id: 'quality' as const,
    icon: Zap,
    label: 'Quality',
    desc: 'Best model first, cascades down as tokens build up.',
    chain: ['Opus', 'GPT-4o', 'Gemini', 'Groq', 'Ollama'],
    color: 'var(--accent-purple)',
    dim: 'var(--accent-purple-dim)',
  },
  {
    id: 'cheap' as const,
    icon: DollarSign,
    label: 'Cheap',
    desc: 'Free and low-cost models only.',
    chain: ['Groq', 'Mixtral', 'Ollama'],
    color: 'var(--accent-blue)',
    dim: 'var(--accent-blue-dim)',
  },
  {
    id: 'offline' as const,
    icon: WifiOff,
    label: 'Offline',
    desc: 'Local Ollama only. No internet, no cost.',
    chain: ['Llama3', 'Mistral', 'Phi3'],
    color: '#10B981',
    dim: 'rgba(16,185,129,0.12)',
  },
]

interface Props {
  onNext: () => void
  onSkip: () => void
}

export default function StepCascade({ onNext, onSkip }: Props) {
  const { cascadeProfile, setCascadeProfile } = useAppStore()

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="px-5 pt-4 pb-3 flex-shrink-0">
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-[22px] font-bold text-[var(--text-primary)] mb-0.5">Cascade Profile</h2>
          <p className="text-[12.5px] text-[var(--text-tertiary)]">How should models hand off?</p>
        </motion.div>
      </div>

      <motion.div
        variants={listContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-y-auto px-5 space-y-2 pb-2"
      >
        {PROFILES.map(({ id, icon: Icon, label, desc, chain, color, dim }) => {
          const active = cascadeProfile === id
          return (
            <motion.button
              key={id}
              variants={listItemVariants}
              whileTap={{ scale: 0.97, transition: springs.snappy }}
              onClick={() => setCascadeProfile(id)}
              className="w-full text-left p-3.5 rounded-[18px] border transition-all"
              style={{
                background: active ? dim : 'var(--bg-elevated)',
                borderColor: active ? color : 'var(--border-subtle)',
              }}
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-7 h-7 rounded-[9px] flex items-center justify-center flex-shrink-0" style={{ background: active ? color : 'var(--bg-primary)' }}>
                  <Icon size={14} color={active ? '#fff' : 'var(--text-tertiary)'} />
                </div>
                <span className="text-[14.5px] font-bold" style={{ color: active ? color : 'var(--text-primary)' }}>{label}</span>
              </div>
              <p className="text-[12px] text-[var(--text-secondary)] mb-2 leading-snug">{desc}</p>
              <div className="flex items-center gap-1 flex-wrap">
                {chain.map((m, i) => (
                  <span key={m} className="flex items-center gap-1">
                    <span className="text-[10px] font-medium text-[var(--text-tertiary)] bg-white/5 px-1.5 py-0.5 rounded-full">{m}</span>
                    {i < chain.length - 1 && <span className="text-[9px] text-[var(--text-tertiary)]">→</span>}
                  </span>
                ))}
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      <div className="px-5 pt-2 pb-2 flex-shrink-0 flex items-center gap-3 bg-[var(--bg-primary)]">
        <button onClick={onSkip} className="text-[13px] font-medium text-[var(--text-tertiary)] px-2 py-2">
          Skip
        </button>
        <Button onClick={onNext} size="md" fullWidth>Next</Button>
      </div>
    </div>
  )
}