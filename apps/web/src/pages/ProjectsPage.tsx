import { motion } from 'framer-motion'
import { FolderOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { pageVariants } from '@/styles/motion'
import PageHeader from '@/components/layout/PageHeader'
import EmptyState from '@/components/ui/EmptyState'

export default function ProjectsPage() {
  const navigate = useNavigate()
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col h-full">
      <PageHeader title="Projects" />
      <EmptyState
        icon={FolderOpen}
        title="No projects yet"
        desc="Group related chats together. Projects unlock parallel model runs."
        ctaLabel="Create Project"
        onCta={() => navigate('/chat')}
      />
    </motion.div>
  )
}