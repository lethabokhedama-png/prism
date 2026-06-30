import { motion } from 'framer-motion'
import { ArrowLeft, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { springs } from '@/styles/motion'
import { useAppStore } from '@/store/app.store'
import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

interface PageHeaderProps {
  title?: string
  showBack?: boolean
  onBack?: () => void
  right?: ReactNode
  className?: string
}

export default function PageHeader({ title, showBack, onBack, right, className }: PageHeaderProps) {
  const navigate = useNavigate()
  const { toggleSidebar } = useAppStore()

  const handleBack = () => {
    if (onBack) return onBack()
    navigate(-1)
  }

  return (
    <div className={cn('flex items-center gap-3 px-4 pt-[env(safe-area-inset-top)] pb-0 h-14 mt-safe-top flex-shrink-0', className)}>
      <motion.button
        whileTap={{ scale: 0.88, transition: springs.snappy }}
        onClick={showBack ? handleBack : toggleSidebar}
        className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-primary)] hover:bg-white/6"
      >
        {showBack ? <ArrowLeft size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={1.8} />}
      </motion.button>

      {title && (
        <h1 className="flex-1 text-[17px] font-bold text-[var(--text-primary)] truncate">{title}</h1>
      )}

      {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
    </div>
  )
}
