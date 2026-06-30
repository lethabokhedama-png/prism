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
    desc: 'Best available model first. Cascades to cheaper options as tokens accumulate.',
    chain: ['Claude Opus', 'GPT-4o', 'Gemini Pro', 'Groq', 'Ollama'],
    color: 'var(--accent-purple)',
    dim: 'var(--accent-purple-dim)',
  },
  {
    id: 'cheap' as const,
    icon: DollarSign,
    label: 'Cheap',
    desc: 'Free and low-cost models only. Great for casual use and long sessions.',
    chain: ['Groq Llama3', 'Mixtral', 'Ollama'],
    color: 'var(--accent-blue)',
    dim: 'var(--accent-blue-dim)',
  },
  {
    id: 'offline' as const,
    icon: WifiOff,
    label: 'Offline',
    desc: 'Local Ollama models only. No internet required, no API costs.',
    chain: ['Ollama Llama3', 'Mistral', 'Phi3'],
    color: '#10B981',
    dim: 'rgba(16,185,129,0.12)',
  },
]

export default function StepCascade({ onNext }: { onNext: () => void }) {
  const { cascadeProfile, setCascadeProfile } = useAppStore()

  return (
    <div className="flex flex-col flex-1 px-6 pt-8 pb-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-[26px] font-bold text-[var(--text-primary)] mb-1">Cascade Profile</h2>
        <p className="text-[14px] text-[var(--text-tertiary)] mb-6">
          How should Prism hand off between models?
        </p>
      </motion.div>

      <motion.div
        variants={listContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 space-y-3"
      >
        {PROFILES.map(({ id, icon: Icon, label, desc, chain, color, dim }) => {
          const active = cascadeProfile === id
          return (
            <motion.button
              key={id}
              variants={listItemVariants}
              whileTap={{ scale: 0.97, transition: springs.snappy }}
              onClick={() => setCascadeProfile(id)}
              className="w-full text-left p-5 rounded-[22px] border transition-all"
              style={{
                background: active ? dim : 'var(--bg-elevated)',
                borderColor: active ? color : 'var(--border-subtle)',
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{ background: active ? color : 'var(--bg-primary)' }}>
                  <Icon size={16} color={active ? '#fff' : 'var(--text-tertiary)'} />
                </div>
                <span className="text-[16px] font-bold" style={{ color: active ? color : 'var(--text-primary)' }}>{label}</span>
              </div>
              <p className="text-[13px] text-[var(--text-secondary)] mb-3 leading-relaxed">{desc}</p>
              <div className="flex items-center gap-1.5 flex-wrap">
                {chain.map((m, i) => (
                  <span key={m} className="flex items-center gap-1.5">
                    <span className="text-[11px] font-medium text-[var(--text-tertiary)] bg-white/5 px-2 py-0.5 rounded-full">{m}</span>
                    {i < chain.length - 1 && <span className="text-[10px] text-[var(--text-tertiary)]">→</span>}
                  </span>
                ))}
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      <div className="mt-6">
        <Button onClick={onNext} size="lg" fullWidth>Continue</Button>
      </div>
    </div>
  )
}
