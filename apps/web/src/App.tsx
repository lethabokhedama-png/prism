import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useAppStore } from '@store/app.store'

// Pages (scaffolded — built next)
import OnboardingPage  from '@pages/OnboardingPage'
import ChatPage        from '@pages/ChatPage'
import ProjectsPage    from '@pages/ProjectsPage'
import LibraryPage     from '@pages/LibraryPage'
import RuntimePage     from '@pages/RuntimePage'
import SettingsPage    from '@pages/SettingsPage'

// Layout
import AppShell from '@components/layout/AppShell'

export default function App() {
  const { theme, hasOnboarded } = useAppStore()

  // Apply theme to root
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', theme)
    }
  }, [theme])

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {!hasOnboarded ? (
          <OnboardingPage key="onboarding" />
        ) : (
          <AppShell key="app">
            <Routes>
              <Route path="/"          element={<Navigate to="/chat" replace />} />
              <Route path="/chat"      element={<ChatPage />} />
              <Route path="/chat/:id"  element={<ChatPage />} />
              <Route path="/projects"  element={<ProjectsPage />} />
              <Route path="/library"   element={<LibraryPage />} />
              <Route path="/runtime"   element={<RuntimePage />} />
              <Route path="/settings"  element={<SettingsPage />} />
            </Routes>
          </AppShell>
        )}
      </AnimatePresence>
    </BrowserRouter>
  )
}
