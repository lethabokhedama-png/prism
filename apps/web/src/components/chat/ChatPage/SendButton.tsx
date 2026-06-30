import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { springs } from '@/styles/motion'

interface Props {
  disabled?: boolean
  onClick: () => void
}

export default function SendButton({ disabled, onClick }: Props) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.88, transition: springs.snappy }}
      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
      style={{
        background: disabled ? 'var(--bg-elevated)' : 'var(--accent-purple)',
      }}
    >
      <ArrowUp size={17} strokeWidth={2.5} className={disabled ? 'text-[var(--text-disabled)]' : 'text-white'} />
    </motion.button>
  )
}
