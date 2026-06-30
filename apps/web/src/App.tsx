import React, { useEffect } from 'react'
import { BrowserRouter, ErrorBoundary, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/app.store'
import ErrorBoundary from '@/components/layout/ErrorBoundary'
import OnboardingPage  from '@pages/OnboardingPage'
import ChatPage        from '@pages/ChatPage'
import ProjectsPage    from '@pages/ProjectsPage'
import LibraryPage     from '@pages/LibraryPage'
import RuntimePage     from '@pages/RuntimePage'
import SettingsPage    from '@pages/SettingsPage'
import AppShell from '@components/layout/AppShell'

export default function App() {
  const { theme, hasOnboarded } = useAppStore()

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', theme)
    }
  }, [theme])

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  )
}