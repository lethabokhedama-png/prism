import { motion } from 'framer-motion'
import { pageVariants } from '@/styles/motion'
import PageHeader from '@/components/layout/PageHeader'

export default function RuntimePage() {
  const title = 'RuntimePage'.replace('Page', '')
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col h-full">
      <PageHeader title={title} />
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[var(--text-tertiary)] text-[14px]">{title} — coming next</p>
      </div>
    </motion.div>
  )
}
