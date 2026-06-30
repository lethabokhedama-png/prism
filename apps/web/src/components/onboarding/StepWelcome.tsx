import { motion } from 'framer-motion'
import { prismLogoVariants, fadeVariants, springs } from '@/styles/motion'
import PrismLogo from '@/components/ui/PrismLogo'
import Button from '@/components/ui/Button'

export default function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 text-center">
      <motion.div variants={prismLogoVariants} initial="hidden" animate="visible" className="mb-6">
        <PrismLogo size={56} />
      </motion.div>

      <motion.div variants={fadeVariants} initial="hidden" animate="visible" transition={{ delay: 0.25 }}>
        <h1 className="text-[32px] font-extrabold tracking-tight text-[var(--text-primary)] mb-2">
          Prism
        </h1>
        <p className="text-[14.5px] text-[var(--text-secondary)] leading-relaxed mb-1">
          Every AI model. One interface.
        </p>
        <p className="text-[12.5px] text-[var(--text-tertiary)] leading-relaxed mb-9">
          Intelligent cascading. Full transparency. Yours to self-host.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, ...springs.bouncy }}
        className="w-full max-w-xs"
      >
        <Button onClick={onNext} size="md" fullWidth>
          Get Started
        </Button>
      </motion.div>
    </div>
  )
}