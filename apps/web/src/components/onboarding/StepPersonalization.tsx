import { useState } from 'react'
import { motion } from 'framer-motion'
import { listContainerVariants, listItemVariants, springs } from '@/styles/motion'
import Button from '@/components/ui/Button'
import { useAppStore } from '@/store/app.store'

const USAGES = [
  { id: 'chat',     emoji: '💬', label: 'Chat',     desc: 'General conversation' },
  { id: 'coding',   emoji: '💻', label: 'Coding',   desc: 'Code generation & review' },
  { id: 'research', emoji: '🔬', label: 'Research', desc: 'Deep analysis & summaries' },
  { id: 'creative', emoji: '✦',  label: 'Creative', desc: 'Writing & ideation' },
  { id: 'all',      emoji: '⬡',  label: 'All of it', desc: 'Everything Prism offers' },
]

export default function StepPersonalization({ onNext }: { onNext: () => void }) {
  const { userName, setUserName } = useAppStore()
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) => {
    if (id === 'all') { setSelected(['all']); return }
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev.filter((x) => x !== 'all'), id]
    )
  }

  return (
    <div className="flex flex-col flex-1 px-6 pt-8 pb-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-[26px] font-bold text-[var(--text-primary)] mb-1">Personalize</h2>
        <p className="text-[14px] text-[var(--text-tertiary)] mb-6">Tell Prism a bit about you</p>
      </motion.div>

      <div className="mb-6">
        <label className="text-[12px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-2 block">Your name</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Lethabo"
          className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-[16px] px-4 py-3 text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent-purple)] transition-colors"
        />
      </div>

      <label className="text-[12px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-3 block">Primary usage</label>

      <motion.div
        variants={listContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-2 flex-1"
      >
        {USAGES.map(({ id, emoji, label, desc }) => {
          const active = selected.includes(id)
          return (
            <motion.button
              key={id}
              variants={listItemVariants}
              whileTap={{ scale: 0.95, transition: springs.snappy }}
              onClick={() => toggle(id)}
              className="flex flex-col items-start p-4 rounded-[20px] border text-left transition-all"
              style={{
                background: active ? 'var(--accent-purple-dim)' : 'var(--bg-elevated)',
                borderColor: active ? 'var(--accent-purple)' : 'var(--border-subtle)',
              }}
            >
              <span className="text-2xl mb-2">{emoji}</span>
              <span className="text-[14px] font-semibold text-[var(--text-primary)]">{label}</span>
              <span className="text-[11px] text-[var(--text-tertiary)] mt-0.5">{desc}</span>
            </motion.button>
          )
        })}
      </motion.div>

      <div className="mt-6">
        <Button onClick={onNext} size="lg" fullWidth disabled={!userName.trim()}>
          Continue
        </Button>
      </div>
    </div>
  )
}
