import { motion } from 'framer-motion'
import { Moon, Sun, Smartphone } from 'lucide-react'
import { springs, listContainerVariants, listItemVariants } from '@/styles/motion'
import Button from '@/components/ui/Button'
import { useAppStore } from '@/store/app.store'

const THEMES = [
  { id: 'dark',   icon: Moon,       label: 'Dark',   desc: 'Easy on the eyes' },
  { id: 'light',  icon: Sun,        label: 'Light',  desc: 'Clean and bright' },
  { id: 'system', icon: Smartphone, label: 'System', desc: 'Follows your device' },
] as const

export default function StepAppearance({ onNext }: { onNext: () => void }) {
  const { theme, setTheme } = useAppStore()

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="px-5 pt-4 pb-3 flex-shrink-0">
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-[22px] font-bold text-[var(--text-primary)] mb-0.5">Appearance</h2>
          <p className="text-[12.5px] text-[var(--text-tertiary)]">Change this any time in settings</p>
        </motion.div>
      </div>

      <motion.div
        variants={listContainerVariants}
        initial="hidden"
        animate="visible"
        className="px-5 space-y-2 flex-1"
      >
        {THEMES.map(({ id, icon: Icon, label, desc }) => {
          const active = theme === id
          return (
            <motion.button
              key={id}
              variants={listItemVariants}
              whileTap={{ scale: 0.97, transition: springs.snappy }}
              onClick={() => setTheme(id)}
              className="w-full flex items-center gap-3 p-3.5 rounded-[16px] border text-left transition-all"
              style={{
                background: active ? 'var(--accent-purple-dim)' : 'var(--bg-elevated)',
                borderColor: active ? 'var(--accent-purple)' : 'var(--border-subtle)',
              }}
            >
              <div className="w-9 h-9 rounded-[12px] flex items-center justify-center flex-shrink-0" style={{ background: active ? 'var(--accent-purple)' : 'var(--bg-primary)' }}>
                <Icon size={16} color={active ? '#fff' : 'var(--text-tertiary)'} />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[var(--text-primary)]">{label}</p>
                <p className="text-[11px] text-[var(--text-tertiary)]">{desc}</p>
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      <div className="px-5 pt-2 pb-2 flex-shrink-0 bg-[var(--bg-primary)]">
        <Button onClick={onNext} size="md" fullWidth>Let's go</Button>
      </div>
    </div>
  )
}