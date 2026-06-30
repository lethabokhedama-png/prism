import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Plus, MessageSquare, FolderOpen, Image, Activity, Settings
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
            className="fixed top-0 left-0 bottom-0 z-50 w-[82vw] max-w-[300px] bg-[var(--sidebar-bg)] flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <PrismLogo size={22} />
                <span className="text-[15px] font-bold tracking-tight text-[var(--text-primary)]">Prism</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.88, transition: springs.snappy }}
                onClick={newChat}
                className="w-7 h-7 rounded-full bg-white/8 flex items-center justify-center text-[var(--text-secondary)] flex-shrink-0"
              >
                <Plus size={14} />
              </motion.button>
            </div>

            <div className="px-2.5 mb-1.5 flex-shrink-0">
              {NAV.map(({ label, path, icon: Icon }) => {
                const active = location.pathname.startsWith(path)
                return (
                  <motion.button
                    key={path}
                    whileTap={{ scale: 0.97, transition: springs.snappy }}
                    onClick={() => go(path)}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[12px] text-left mb-0.5 transition-colors',
                      active
                        ? 'bg-[var(--sidebar-item-active)] text-[var(--accent-purple)]'
                        : 'text-[var(--text-secondary)] active:bg-[var(--sidebar-item-hover)]'
                    )}
                  >
                    <Icon size={16} strokeWidth={active ? 2.2 : 1.8} className="flex-shrink-0" />
                    <span className={cn('text-[13.5px]', active ? 'font-semibold' : 'font-medium')}>{label}</span>
                  </motion.button>
                )
              })}
            </div>

            <div className="px-4 mb-1 flex-shrink-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">Recents</p>
            </div>

            <motion.div
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 overflow-y-auto px-2.5 min-h-0"
            >
              {conversations.slice(0, 30).map((conv) => (
                <motion.button
                  key={conv.id}
                  variants={listItemVariants}
                  whileTap={{ scale: 0.97, transition: springs.snappy }}
                  onClick={() => go(`/chat/${conv.id}`)}
                  className="w-full flex items-center px-2.5 py-2 rounded-[12px] text-left mb-0.5 active:bg-[var(--sidebar-item-hover)]"
                >
                  <span className="text-[13px] text-[var(--text-secondary)] truncate font-medium">{conv.title || 'New Chat'}</span>
                </motion.button>
              ))}

              {conversations.length === 0 && (
                <p className="px-2.5 py-3 text-[12px] text-[var(--text-tertiary)] text-center">No chats yet</p>
              )}
            </motion.div>

            <div className="border-t border-[var(--border-subtle)] mx-2.5 flex-shrink-0" />
            <motion.button
              whileTap={{ scale: 0.98, transition: springs.snappy }}
              onClick={() => go('/settings')}
              className="flex items-center gap-2.5 px-4 py-3 active:bg-[var(--sidebar-item-hover)] transition-colors flex-shrink-0"
            >
              <Avatar name={userName || 'User'} src={userAvatar} size="sm" />
              <div className="flex-1 text-left min-w-0">
                <p className="text-[13px] font-semibold text-[var(--text-primary)] truncate">{userName || 'Set up profile'}</p>
                <p className="text-[10.5px] text-[var(--text-tertiary)]">Settings</p>
              </div>
              <Settings size={14} className="text-[var(--text-tertiary)] flex-shrink-0" />
            </motion.button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}