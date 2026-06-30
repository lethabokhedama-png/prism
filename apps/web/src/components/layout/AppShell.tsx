import { useEffect, useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/app.store'
import Sidebar from './Sidebar'
import { pageVariants } from '@/styles/motion'

interface AppShellProps {
  children: ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  const location = useLocation()
  const { setSidebarOpen } = useAppStore()
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current)
      if (touchStartX.current < 24 && dx > 60 && dy < 60) {
        setSidebarOpen(true)
      }
    }
    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchend', onTouchEnd)
    }
  }, [setSidebarOpen])

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)] overflow-hidden">
      <Sidebar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-1 flex flex-col overflow-hidden"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
