import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import Button from '@/components/ui/Button'

interface Props {
  icon: LucideIcon
  title: string
  desc: string
  ctaLabel?: string
  onCta?: () => void
}

export default function EmptyState({ icon: Icon, title, desc, ctaLabel, onCta }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col items-center justify-center px-8 text-center"
    >
      <div className="w-14 h-14 rounded-[20px] bg-[var(--bg-elevated)] flex items-center justify-center mb-4 border border-[var(--border-subtle)]">
        <Icon size={24} className="text-[var(--text-tertiary)]" strokeWidth={1.6} />
      </div>
      <p className="text-[16px] font-semibold text-[var(--text-primary)] mb-1">{title}</p>
      <p className="text-[13px] text-[var(--text-tertiary)] leading-relaxed max-w-[260px] mb-5">{desc}</p>
      {ctaLabel && onCta && (
        <Button onClick={onCta} size="md">{ctaLabel}</Button>
      )}
    </motion.div>
  )
}