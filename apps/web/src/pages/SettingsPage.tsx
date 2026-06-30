import { motion } from 'framer-motion'
import { pageVariants } from '@/styles/motion'
import PageHeader from '@/components/layout/PageHeader'
import { useAppStore } from '@/store/app.store'
import Avatar from '@/components/ui/Avatar'

export default function SettingsPage() {
  const { userName, userAvatar } = useAppStore()

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col h-full">
      <PageHeader title="Settings" showBack />
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="flex items-center gap-3 mb-6">
          <Avatar name={userName || 'User'} src={userAvatar} size="lg" />
          <div>
            <p className="text-[17px] font-bold text-[var(--text-primary)]">{userName || 'Set up profile'}</p>
            <p className="text-[12.5px] text-[var(--text-tertiary)]">Personalization</p>
          </div>
        </div>
        <p className="text-[12.5px] text-[var(--text-tertiary)]">More settings sections coming next.</p>
      </div>
    </motion.div>
  )
}