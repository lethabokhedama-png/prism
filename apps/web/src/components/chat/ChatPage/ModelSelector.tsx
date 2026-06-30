import { useState } from 'react'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import Sheet from '@/components/ui/Sheet'
import Badge from '@/components/ui/Badge'
import PrismLogo from '@/components/ui/PrismLogo'
import { springs, listContainerVariants, listItemVariants } from '@/styles/motion'
import { useAppStore } from '@/store/app.store'
import { useProvidersStore } from '@/store/providers.store'
import type { Capability } from '@/types/provider.types'

const capLabel: Record<Capability, string> = {
  text:      'Text',
  vision:    'Vision',
  tool_use:  'Tools',
  streaming: 'Stream',
  image_gen: '🖼 Image gen',
  tts:       '🔊 TTS',
  stt:       '🎤 STT',
  code:      'Code',
}

export default function ModelSelector() {
  const [open, setOpen] = useState(false)
  const { activeModel, setActiveModel } = useAppStore()
  const { models } = useProvidersStore()

  const displayName = activeModel.split('/').pop() ?? activeModel

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.93, transition: springs.snappy }}
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
      >
        <PrismLogo size={14} />
        <span className="text-[13px] font-semibold text-[var(--text-primary)]">{displayName}</span>
        <span className="text-[10px] text-[var(--text-tertiary)]">▾</span>
      </motion.button>

      <Sheet open={open} onClose={() => setOpen(false)}>
        <div className="px-5 pb-2 pt-1">
          <p className="text-[17px] font-bold text-[var(--text-primary)]">Select Model</p>
          <p className="text-[13px] text-[var(--text-tertiary)] mt-0.5">Only showing configured providers</p>
        </div>

        <motion.div
          variants={listContainerVariants}
          initial="hidden"
          animate="visible"
          className="px-3 pb-6"
        >
          {models.length === 0 && (
            <p className="text-center text-[13px] text-[var(--text-tertiary)] py-8">
              No providers configured. Add keys in Settings.
            </p>
          )}

          {models.map((model) => {
            const active = model.id === activeModel
            return (
              <motion.button
                key={model.id}
                variants={listItemVariants}
                whileTap={{ scale: 0.97, transition: springs.snappy }}
                onClick={() => { setActiveModel(model.id); setOpen(false) }}
                className="w-full flex items-start justify-between gap-3 px-3 py-3.5 rounded-[16px] mb-1 text-left transition-colors"
                style={{ background: active ? 'var(--accent-purple-dim)' : 'transparent' }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[15px] font-semibold text-[var(--text-primary)]">{model.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {model.capabilities.map((cap) => (
                      <Badge key={cap} variant={cap === 'vision' ? 'blue' : 'grey'}>{capLabel[cap]}</Badge>
                    ))}
                  </div>
                </div>
                {active && <Check size={16} className="text-[var(--accent-purple)] mt-0.5 flex-shrink-0" />}
              </motion.button>
            )
          })}
        </motion.div>
      </Sheet>
    </>
  )
}
