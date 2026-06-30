export type ProviderStatus = 'active' | 'rate_limited' | 'invalid' | 'unconfigured' | 'checking'

export type Capability = 'text' | 'vision' | 'tool_use' | 'streaming' | 'image_gen' | 'tts' | 'stt' | 'code'

export interface Model {
  id: string
  name: string
  provider: string
  capabilities: Capability[]
  contextWindow: number
  inputCostPer1k: number
  outputCostPer1k: number
}

export interface ProviderHealth {
  provider: string
  keyHint: string
  status: ProviderStatus
  modelsAvailable: string[]
  capabilities: Capability[]
  latencyMs: number | null
  lastChecked: number
  error: string | null
}
