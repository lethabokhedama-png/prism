import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'dark' | 'light' | 'system'
type CascadeProfile = 'quality' | 'cheap' | 'offline'

interface AppState {
  // Onboarding
  hasOnboarded: boolean
  setHasOnboarded: (v: boolean) => void

  // Theme
  theme: Theme
  setTheme: (t: Theme) => void

  // Sidebar
  sidebarOpen: boolean
  setSidebarOpen: (v: boolean) => void
  toggleSidebar: () => void

  // Active cascade profile
  cascadeProfile: CascadeProfile
  setCascadeProfile: (p: CascadeProfile) => void

  // Active model (current session)
  activeModel: string
  setActiveModel: (m: string) => void

  // Token burn visibility
  showTokenBurn: boolean
  setShowTokenBurn: (v: boolean) => void

  // Health bar visibility
  showHealthBar: boolean
  setShowHealthBar: (v: boolean) => void

  // User
  userName: string
  setUserName: (n: string) => void
  userAvatar: string | null
  setUserAvatar: (url: string | null) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasOnboarded: false,
      setHasOnboarded: (v) => set({ hasOnboarded: v }),

      theme: 'dark',
      setTheme: (t) => set({ theme: t }),

      sidebarOpen: false,
      setSidebarOpen: (v) => set({ sidebarOpen: v }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      cascadeProfile: 'quality',
      setCascadeProfile: (p) => set({ cascadeProfile: p }),

      activeModel: 'claude-sonnet-4-6',
      setActiveModel: (m) => set({ activeModel: m }),

      showTokenBurn: true,
      setShowTokenBurn: (v) => set({ showTokenBurn: v }),

      showHealthBar: true,
      setShowHealthBar: (v) => set({ showHealthBar: v }),

      userName: '',
      setUserName: (n) => set({ userName: n }),
      userAvatar: null,
      setUserAvatar: (url) => set({ userAvatar: url }),
    }),
    {
      name: 'prism-app',
      partialize: (s) => ({
        hasOnboarded:  s.hasOnboarded,
        theme:         s.theme,
        cascadeProfile:s.cascadeProfile,
        activeModel:   s.activeModel,
        showTokenBurn: s.showTokenBurn,
        showHealthBar: s.showHealthBar,
        userName:      s.userName,
        userAvatar:    s.userAvatar,
      }),
    }
  )
)
