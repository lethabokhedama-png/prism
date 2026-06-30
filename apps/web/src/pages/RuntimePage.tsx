import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'
import { pageVariants } from '@/styles/motion'
import PageHeader from '@/components/layout/PageHeader'
import EmptyState from '@/components/ui/EmptyState'
import { useProvidersStore } from '@/store/providers.store'

export default function RuntimePage() {
  const { models } = useProvidersStore()

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col h-full">
      <PageHeader title="Runtime" />
      {models.length === 0 ? (
        <EmptyState
          icon={Activity}
          title="No active runtime data"
          desc="Start a chat to see live token burn, cascade events, and provider health."
        />
      ) : (
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {/* Live stats populate once gateway WebSocket connects */}
        </div>
      )}
    </motion.div>
  )
}