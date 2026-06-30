import { motion, AnimatePresence } from 'framer-motion'
import { sheetVariants, sheetBackdropVariants } from '@/styles/motion'
import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

interface SheetProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  maxHeight?: string
}

export default function Sheet({ open, onClose, children, className, maxHeight = '85vh' }: SheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            variants={sheetBackdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            key="sheet"
            variants={sheetVariants}
            initial="closed"
            animate="open"
            exit="closed"
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80) onClose()
            }}
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50',
              'bg-[var(--sheet-bg)] rounded-t-[32px]',
              'pb-[env(safe-area-inset-bottom)]',
              'overflow-hidden',
              className
            )}
            style={{ maxHeight }}
          >
            <div className="w-9 h-1 rounded-full bg-white/20 mx-auto mt-3 mb-1 flex-shrink-0" />
            <div className="overflow-y-auto overscroll-contain" style={{ maxHeight: `calc(${maxHeight} - 32px)` }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
