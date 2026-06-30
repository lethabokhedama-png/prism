import React from 'react'
import { useAppStore } from '@/store/app.store'
import Sidebar from './Sidebar'
import { useEdgeSwipe } from '@/hooks/useGestures'

interface AppShellProps {
  children: ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  const { setSidebarOpen } = useAppStore()
  useEdgeSwipe(() => setSidebarOpen(true))

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        {children}
      </div>
    </div>
  )
}