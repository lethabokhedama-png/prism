import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Plus, MessageSquare, FolderOpen, Image, Activity, Settings, ChevronRight
} from 'lucide-react'
import { useAppStore } from '@/store/app.store'
import { useChatStore } from '@/store/chat.store'
import { sidebarVariants, sidebarBackdropVariants, springs, listContainerVariants, listItemVariants } from '@/styles/motion'
import PrismLogo from '@/components/ui/PrismLogo'
import Avatar from '@/components/ui/Avatar'
import { cn } from '@/lib/cn'

const NAV = [
  { label: 'Chats',    path: '/chat',     icon: MessageSquare },
  { label: 'Projects', path: '/projects', icon: FolderOpen },
  { label: 'Library',  path: '/library',  icon: Image },
  { label: 'Runtime',  path: '/runtime',  icon: Activity },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { sidebarOpen, setSidebarOpen, userName, userAvatar } = useAppStore()
  const { conversations, startNewConversation } = useChatStore()

  const close = () => setSidebarOpen(false)

  const go = (path: string) => {
    navigate(path)
    close()
  }

  const newChat = () => {
    startNewConversation()
    navigate('/chat')
    close()
  }

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          <motion.div
            key="sidebar-backdrop"
            variants={sidebarBackdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          <motion.aside
            key="sidebar"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 bottom-0 z-50 w-[82vw] max-w-[320px] bg-[var(--sidebar-bg)] flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-2.5">
                <PrismLogo size={26} />
                <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]">Prism</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.9, transition: springs.snappy }}
                onClick={newChat}
                className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center text-[var(--text-secondary)]"
              >
                <Plus size={16} />
              </motion.button>
            </div>

            <div className="px-3 mb-2">
              {NAV.map(({ label, path, icon: Icon }) => {
                const active = location.pathname.startsWith(path)
                return (
                  <motion.button
                    key={path}
                    whileTap={{ scale: 0.97, transition: springs.snappy }}
                    onClick={() => go(path)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-[14px] text-left mb-0.5 transition-colors',
                      active
                        ? 'bg-[var(--sidebar-item-active)] text-[var(--accent-purple)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--sidebar-item-hover)]'
                    )}
                  >
                    <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
                    <span className={cn('text-[15px]', active ? 'font-semibold' : 'font-medium')}>{label}</span>
                  </motion.button>
                )
              })}
            </div>

            <div className="px-5 mb-2">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-2">Recents</p>
            </div>

            <motion.div
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 overflow-y-auto px-3"
            >
              {conversations.slice(0, 20).map((conv) => (
                <motion.button
                  key={conv.id}
                  variants={listItemVariants}
                  whileTap={{ scale: 0.97, transition: springs.snappy }}
                  onClick={() => go(`/chat/${conv.id}`)}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-[14px] text-left mb-0.5 hover:bg-[var(--sidebar-item-hover)] group"
                >
                  <span className="text-[14px] text-[var(--text-secondary)] truncate font-medium">{conv.title || 'New Chat'}</span>
                  <ChevronRight size={13} className="text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 flex-shrink-0 transition-opacity" />
                </motion.button>
              ))}

              {conversations.length === 0 && (
                <p className="px-3 py-4 text-[13px] text-[var(--text-tertiary)] text-center">No chats yet</p>
              )}
            </motion.div>

            <div className="border-t border-[var(--border-subtle)] mx-3" />
            <motion.button
              whileTap={{ scale: 0.97, transition: springs.snappy }}
              onClick={() => go('/settings')}
              className="flex items-center gap-3 px-5 py-4 hover:bg-[var(--sidebar-item-hover)] transition-colors"
            >
              <Avatar name={userName || 'User'} src={userAvatar} size="sm" />
              <div className="flex-1 text-left">
                <p className="text-[14px] font-semibold text-[var(--text-primary)] truncate">{userName || 'Set up profile'}</p>
                <p className="text-[11px] text-[var(--text-tertiary)]">Settings</p>
              </div>
              <Settings size={15} className="text-[var(--text-tertiary)]" />
            </motion.button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
