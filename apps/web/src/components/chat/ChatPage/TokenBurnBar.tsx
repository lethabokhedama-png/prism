import { motion, AnimatePresence } from 'framer-motion'
import { useRuntimeStore } from '@/store/runtime.store'
import { useAppStore } from '@/store/app.store'

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}

function fmtCost(n: number) {
  if (n < 0.001) return '<$0.001'
  return `$${n.toFixed(4)}`
}

export default function TokenBurnBar() {
  const { showTokenBurn, showHealthBar } = useAppStore()
  const { tokensBurned, tokensPerSec, costUsd, sessionTokens, sessionCostUsd, isStreaming } = useRuntimeStore()

  if (!showTokenBurn) return null

  return (
    <AnimatePresence>
      {(isStreaming || tokensBurned > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.2 }}
          className="px-4 py-1.5 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-mono text-[var(--accent-purple)] tabular-nums">
              {fmt(tokensBurned)} tok
            </span>
            {isStreaming && tokensPerSec > 0 && (
              <span className="text-[11px] text-[var(--text-tertiary)] tabular-nums">
                {tokensPerSec.toFixed(1)}/s
              </span>
            )}
            <span className="text-[11px] text-[var(--text-tertiary)] tabular-nums">
              {fmtCost(costUsd)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[var(--text-tertiary)] tabular-nums">
            <span>session {fmt(sessionTokens)} · {fmtCost(sessionCostUsd)}</span>
          </div>
        </motion.div>
      )}

      {showHealthBar && isStreaming && (
        <motion.div
          key="healthbar"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-[2px] mx-4 rounded-full origin-left"
          style={{
            background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-blue))',
          }}
        />
      )}
    </AnimatePresence>
  )
}
