import { type ReactNode } from 'react'

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-full bg-prism-black text-prism-white overflow-hidden">
      {children}
    </div>
  )
}
