import { create } from 'zustand'
import type { ProviderHealth, Model } from '@/types/provider.types'

interface ProvidersState {
  health: ProviderHealth[]
  models: Model[]
  loading: boolean
  setHealth: (h: ProviderHealth[]) => void
  setModels: (m: Model[]) => void
  setLoading: (v: boolean) => void
}

export const useProvidersStore = create<ProvidersState>((set) => ({
  health: [],
  models: [],
  loading: false,
  setHealth: (h) => set({ health: h }),
  setModels: (m) => set({ models: m }),
  setLoading: (v) => set({ loading: v }),
}))
