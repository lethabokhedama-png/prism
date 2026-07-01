import { motion } from 'framer-motion'
import { Moon, Sun, Smartphone } from 'lucide-react'
import { springs } from '@/styles/motion'
import { useAppStore } from '@/store/app.store'
import SettingsRow from './SettingsRow'
import Toggle from './Toggle'

const THEMES = [
  { id: 'dark',   icon: Moon },
  { id: 'light',  icon: Sun },
  { id: 'system', icon: Smartphone },
] as const

export default function AppearanceSection() {
  const { theme, setTheme, showTokenBurn, setShowTokenBurn, showHealthBar, setShowHealthBar } = useAppStore()

  return (
    <div className="px-1 pb-1">
      <div className="flex gap-1.5 mb-3">
        {THEMES.map(({ id, icon: Icon }) => {
          const active = theme === id
          return (
            <motion.button
              key={id}
              whileTap={{ scale: 0.95, transition: springs.snappy }}
              onClick={() => setTheme(id)}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-[14px] border transition-all"
              style={{
                background: active ? 'var(--accent-purple-dim)' : 'var(--bg-primary)',
                borderColor: active ? 'var(--accent-purple)' : 'var(--border-subtle)',
              }}
            >
              <Icon size={16} color={active ? 'var(--accent-purple)' : 'var(--text-tertiary)'} />
              <span className="text-[11px] font-medium capitalize" style={{ color: active ? 'var(--accent-purple)' : 'var(--text-secondary)' }}>
                {id}
              </span>
            </motion.button>
          )
        })}
      </div>

      <SettingsRow
        label="Live token burn"
        desc="Show real-time token count while streaming"
        control={<Toggle checked={showTokenBurn} onChange={setShowTokenBurn} />}
      />
      <SettingsRow
        label="Health bar"
        desc="Visual bar showing token usage toward limit"
        control={<Toggle checked={showHealthBar} onChange={setShowHealthBar} />}
      />
    </div>
  )
}