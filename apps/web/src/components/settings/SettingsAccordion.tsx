import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, type LucideIcon } from 'lucide-react'
import { springs } from '@/styles/motion'

interface Props {
  icon: LucideIcon
  title: string
  subtitle?: string
  defaultOpen?: boolean
  children: ReactNode
}

export default function SettingsAccordion({ icon: Icon, title, subtitle, defaultOpen, children }: Props) {
  const [open, setOpen] = useState(!!defaultOpen)

  return (
    <div className="rounded-[18px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] overflow-hidden mb-2.5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3.5"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-[11px] bg-white/6 flex items-center justify-center flex-shrink-0">
            <Icon size={16} className="text-[var(--text-secondary)]" strokeWidth={1.8} />
          </div>
          <div className="text-left min-w-0">
            <p className="text-[14px] font-semibold text-[var(--text-primary)]">{title}</p>
            {subtitle && <p className="text-[11.5px] text-[var(--text-tertiary)] truncate">{subtitle}</p>}
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={springs.snappy} className="flex-shrink-0">
          <ChevronDown size={16} className="text-[var(--text-tertiary)]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="px-4 pb-4 pt-1 border-t border-[var(--border-subtle)]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}