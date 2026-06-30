import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'purple' | 'blue' | 'green' | 'red' | 'grey'
  className?: string
}

const variants = {
  purple: 'bg-[var(--accent-purple-dim)] text-[var(--accent-purple)]',
  blue:   'bg-[var(--accent-blue-dim)] text-[var(--accent-blue)]',
  green:  'bg-emerald-500/15 text-emerald-400',
  red:    'bg-red-500/15 text-red-400',
  grey:   'bg-white/6 text-[var(--text-tertiary)]',
}

export default function Badge({ children, variant = 'grey', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium', variants[variant], className)}>
      {children}
    </span>
  )
}
