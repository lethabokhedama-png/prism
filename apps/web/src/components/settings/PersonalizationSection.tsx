import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import { springs } from '@/styles/motion'
import { useAppStore } from '@/store/app.store'
import Avatar from '@/components/ui/Avatar'

const USAGES = [
  { id: 'chat',     emoji: '💬', label: 'Chat' },
  { id: 'coding',   emoji: '💻', label: 'Coding' },
  { id: 'research', emoji: '🔬', label: 'Research' },
  { id: 'creative', emoji: '✦',  label: 'Creative' },
  { id: 'all',      emoji: '⬡',  label: 'All of it' },
]

export default function PersonalizationSection() {
  const { userName, setUserName, userAvatar, setUserAvatar, primaryUsage, setPrimaryUsage } = useAppStore()

  const toggleUsage = (id: string) => {
    let next: string[]
    if (id === 'all') {
      next = ['all']
    } else {
      next = primaryUsage.includes(id)
        ? primaryUsage.filter((x) => x !== id)
        : [...primaryUsage.filter((x) => x !== 'all'), id]
    }
    setPrimaryUsage(next)
  }

  const handleAvatarPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setUserAvatar(URL.createObjectURL(file))
  }

  return (
    <div className="px-1 pb-2">
      <div className="flex flex-col items-center py-4">
        <label className="relative">
          <Avatar name={userName || 'User'} src={userAvatar} size="lg" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[var(--accent-purple)] flex items-center justify-center border-2 border-[var(--bg-elevated)]">
            <Camera size={11} className="text-white" />
          </div>
          <input type="file" accept="image/*" onChange={handleAvatarPick} className="hidden" />
        </label>
      </div>

      <label className="text-[10.5px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-1.5 block">Name</label>
      <input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Your name"
        className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-[14px] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent-purple)] transition-colors mb-4"
      />

      <label className="text-[10.5px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-2 block">Primary usage</label>
      <div className="grid grid-cols-3 gap-1.5">
        {USAGES.map(({ id, emoji, label }) => {
          const active = primaryUsage.includes(id)
          return (
            <motion.button
              key={id}
              whileTap={{ scale: 0.95, transition: springs.snappy }}
              onClick={() => toggleUsage(id)}
              className="flex flex-col items-center gap-1 py-2.5 rounded-[14px] border transition-all"
              style={{
                background: active ? 'var(--accent-purple-dim)' : 'var(--bg-primary)',
                borderColor: active ? 'var(--accent-purple)' : 'var(--border-subtle)',
              }}
            >
              <span className="text-base">{emoji}</span>
              <span className="text-[10.5px] font-medium text-[var(--text-primary)]">{label}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}