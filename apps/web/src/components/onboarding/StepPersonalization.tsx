import React, { useState } from 'react'
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

interface Props {
  onNext: () => void
  onSkip: () => void
}

export default function StepPersonalization({ onNext, onSkip }: Props) {
  const { userName, setUserName, setPrimaryUsage } = useAppStore()
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) => {
    let next: string[]
    if (id === 'all') {
      next = ['all']
    } else {
      next = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected.filter((x) => x !== 'all'), id]
    }
    setSelected(next)
    setPrimaryUsage(next)
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="px-5 pt-4 pb-3 flex-shrink-0">
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-[22px] font-bold text-[var(--text-primary)] mb-0.5">Personalize</h2>
          <p className="text-[12.5px] text-[var(--text-tertiary)] mb-4">Tell Prism a bit about you</p>
        </motion.div>

        <label className="text-[10.5px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-1.5 block">Your name</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Your name"
          className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-[14px] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent-purple)] transition-colors"
        />
      </div>

      <div className="px-5 flex-shrink-0">
        <label className="text-[10.5px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-2 block">Primary usage</label>
      </div>

      <motion.div
        variants={listContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-2 px-5 overflow-y-auto flex-1 content-start pb-2"
      >
        {USAGES.map(({ id, emoji, label, desc }) => {
          const active = selected.includes(id)
          return (
            <motion.button
              key={id}
              variants={listItemVariants}
              whileTap={{ scale: 0.95, transition: springs.snappy }}
              onClick={() => toggle(id)}
              className="flex flex-col items-start p-3 rounded-[16px] border text-left transition-all"
              style={{
                background: active ? 'var(--accent-purple-dim)' : 'var(--bg-elevated)',
                borderColor: active ? 'var(--accent-purple)' : 'var(--border-subtle)',
              }}
            >
              <span className="text-xl mb-1.5">{emoji}</span>
              <span className="text-[13px] font-semibold text-[var(--text-primary)] leading-tight">{label}</span>
              <span className="text-[10px] text-[var(--text-tertiary)] mt-0.5 leading-tight">{desc}</span>
            </motion.button>
          )
        })}
      </motion.div>

      <div className="px-5 pt-3 pb-2 flex-shrink-0 flex items-center gap-3 bg-[var(--bg-primary)]">
        <button onClick={onSkip} className="text-[13px] font-medium text-[var(--text-tertiary)] px-2 py-2">
          Skip
        </button>
        <Button onClick={onNext} size="md" fullWidth disabled={!userName.trim()}>
          Next
        </Button>
      </div>
    </div>
  )
}