import { motion } from 'framer-motion'
import { springs } from '@/styles/motion'

interface Props {
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
}

export default function Toggle({ checked, onChange, disabled }: Props) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className="w-11 h-6.5 rounded-full p-0.5 flex-shrink-0 transition-colors duration-200"
      style={{
        background: checked ? 'var(--accent-purple)' : 'var(--border-default)',
        opacity: disabled ? 0.4 : 1,
        height: '26px',
        width: '44px',
      }}
    >
      <motion.div
        animate={{ x: checked ? 18 : 0 }}
        transition={springs.snappy}
        className="w-[22px] h-[22px] rounded-full bg-white shadow-sm"
      />
    </button>
  )
}