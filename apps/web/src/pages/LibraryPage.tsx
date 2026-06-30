import { motion } from 'framer-motion'
import { Image } from 'lucide-react'
import { pageVariants } from '@/styles/motion'
import PageHeader from '@/components/layout/PageHeader'
import EmptyState from '@/components/ui/EmptyState'

export default function LibraryPage() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col h-full">
      <PageHeader title="Library" />
      <EmptyState
        icon={Image}
        title="Nothing here yet"
        desc="Uploads and AI-generated media from your chats will show up here."
      />
    </motion.div>
  )
}