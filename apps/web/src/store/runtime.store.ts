import { create } from 'zustand'

interface RuntimeState {
  activeModel: string | null
  tokensBurned: number
  tokensPerSec: number
  costUsd: number
  sessionCostUsd: number
  sessionTokens: number
  isStreaming: boolean
  cascadePosition: number
  cascadeTotal: number
  ollamaRam: number | null
  ollamaCpu: number | null

  setActiveModel: (m: string) => void
  setStreaming: (v: boolean) => void
  tickTokens: (delta: number, cost: number) => void
  setTps: (v: number) => void
  setCascadePosition: (pos: number, total: number) => void
  setOllamaStats: (ram: number, cpu: number) => void
  resetTurn: () => void
}

export const useRuntimeStore = create<RuntimeState>((set) => ({
  activeModel: null,
  tokensBurned: 0,
  tokensPerSec: 0,
  costUsd: 0,
  sessionCostUsd: 0,
  sessionTokens: 0,
  isStreaming: false,
  cascadePosition: 1,
  cascadeTotal: 1,
  ollamaRam: null,
  ollamaCpu: null,

  setActiveModel: (m) => set({ activeModel: m }),
  setStreaming: (v) => set({ isStreaming: v }),

  tickTokens: (delta, cost) => set((s) => ({
    tokensBurned: s.tokensBurned + delta,
    costUsd: s.costUsd + cost,
    sessionTokens: s.sessionTokens + delta,
    sessionCostUsd: s.sessionCostUsd + cost,
  })),

  setTps: (v) => set({ tokensPerSec: v }),
  setCascadePosition: (pos, total) => set({ cascadePosition: pos, cascadeTotal: total }),
  setOllamaStats: (ram, cpu) => set({ ollamaRam: ram, ollamaCpu: cpu }),

  resetTurn: () => set({ tokensBurned: 0, costUsd: 0, tokensPerSec: 0, isStreaming: false }),
}))
