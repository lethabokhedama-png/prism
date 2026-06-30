export interface ProviderMeta {
  id: string
  name: string
  hint: string
  env: string
  keyUrl: string
  setupNote?: string
  recommendedFor: string[]
}

export const PROVIDERS: ProviderMeta[] = [
  {
    id: 'anthropic',
    name: 'Anthropic',
    hint: 'sk-ant-...',
    env: 'ANTHROPIC_API_KEY',
    keyUrl: 'https://console.anthropic.com/settings/keys',
    recommendedFor: ['chat', 'coding', 'research', 'all'],
  },
  {
    id: 'openai',
    name: 'OpenAI',
    hint: 'sk-...',
    env: 'OPENAI_API_KEY',
    keyUrl: 'https://platform.openai.com/api-keys',
    recommendedFor: ['coding', 'creative', 'all'],
  },
  {
    id: 'google',
    name: 'Google',
    hint: 'AIza...',
    env: 'GOOGLE_API_KEY',
    keyUrl: 'https://aistudio.google.com/apikey',
    recommendedFor: ['research', 'all'],
  },
  {
    id: 'groq',
    name: 'Groq',
    hint: 'gsk_...',
    env: 'GROQ_API_KEY',
    keyUrl: 'https://console.groq.com/keys',
    setupNote: 'Free tier, very fast — good cascade fallback.',
    recommendedFor: ['chat', 'coding', 'all'],
  },
  {
    id: 'mistral',
    name: 'Mistral',
    hint: 'your key...',
    env: 'MISTRAL_API_KEY',
    keyUrl: 'https://console.mistral.ai/api-keys',
    recommendedFor: ['coding', 'all'],
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    hint: 'your key...',
    env: 'ELEVENLABS_API_KEY',
    keyUrl: 'https://elevenlabs.io/app/settings/api-keys',
    setupNote: 'Needed for text-to-speech.',
    recommendedFor: ['creative', 'all'],
  },
]

export function suggestedProviders(usage: string[]): string[] {
  if (usage.length === 0) return PROVIDERS.map((p) => p.id)
  return PROVIDERS.filter((p) => usage.some((u) => p.recommendedFor.includes(u))).map((p) => p.id)
}