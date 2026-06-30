import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { springs } from '@/styles/motion'
import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
  className?: string
}

const variants = {
  primary: 'bg-[var(--accent-purple)] text-white hover:opacity-90 active:opacity-80',
  ghost:   'bg-transparent text-[var(--text-secondary)] hover:bg-white/5',
  danger:  'bg-transparent text-red-400 hover:bg-red-500/10',
  outline: 'border border-[var(--border-default)] text-[var(--text-primary)] hover:bg-white/5',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-[12px]',
  md: 'px-4 py-2.5 text-base rounded-[16px]',
  lg: 'px-6 py-3.5 text-base rounded-[20px]',
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled,
  fullWidth,
  className,
}: ButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.96, transition: springs.snappy }}
      className={cn(
        'font-semibold transition-colors duration-150 select-none',
        'flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        disabled && 'opacity-40 cursor-not-allowed',
        className
      )}
    >
      {children}
    </motion.button>
  )
}
