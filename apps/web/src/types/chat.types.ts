export type Role = 'user' | 'assistant' | 'system'

export interface Attachment {
  id: string
  name: string
  type: 'image' | 'pdf' | 'text' | 'zip' | 'other'
  url: string
  size: number
  mimeType: string
}

export interface CascadeEvent {
  from: string
  to: string
  reason: 'token_threshold' | 'cost_cap' | 'rate_limit' | 'error' | 'manual' | 'quality_signal'
  at: number
  tokensUsed: number
}

export interface TokenUsage {
  input: number
  output: number
  total: number
  costUsd: number
}

export interface Message {
  id: string
  role: Role
  content: string
  model?: string
  createdAt: number
  attachments?: Attachment[]
  tokenUsage?: TokenUsage
  cascadeEvent?: CascadeEvent
  streaming?: boolean
}

export interface Conversation {
  id: string
  title: string
  createdAt: number
  updatedAt: number
  messages: Message[]
  model: string
  cascadeProfile: string
}
