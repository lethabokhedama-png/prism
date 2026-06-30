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
    <div className="flex flex-col flex-1 px-6 pt-8 pb-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-[26px] font-bold text-[var(--text-primary)] mb-1">Appearance</h2>
        <p className="text-[14px] text-[var(--text-tertiary)] mb-8">You can change this any time in settings.</p>
      </motion.div>

      <motion.div
        variants={listContainerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {THEMES.map(({ id, icon: Icon, label, desc }) => {
          const active = theme === id
          return (
            <motion.button
              key={id}
              variants={listItemVariants}
              whileTap={{ scale: 0.97, transition: springs.snappy }}
              onClick={() => setTheme(id)}
              className="w-full flex items-center gap-4 p-4 rounded-[20px] border text-left transition-all"
              style={{
                background: active ? 'var(--accent-purple-dim)' : 'var(--bg-elevated)',
                borderColor: active ? 'var(--accent-purple)' : 'var(--border-subtle)',
              }}
            >
              <div className="w-10 h-10 rounded-[14px] flex items-center justify-center" style={{ background: active ? 'var(--accent-purple)' : 'var(--bg-primary)' }}>
                <Icon size={18} color={active ? '#fff' : 'var(--text-tertiary)'} />
              </div>
              <div>
                <p className="text-[15px] font-semibold text-[var(--text-primary)]">{label}</p>
                <p className="text-[12px] text-[var(--text-tertiary)]">{desc}</p>
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      <div className="mt-auto pt-8">
        <Button onClick={onNext} size="lg" fullWidth>Let's go</Button>
      </div>
    </div>
  )
}
