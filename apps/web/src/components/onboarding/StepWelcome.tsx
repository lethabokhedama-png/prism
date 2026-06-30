import { motion } from 'framer-motion'
import { prismLogoVariants, fadeVariants, springs } from '@/styles/motion'
import PrismLogo from '@/components/ui/PrismLogo'
import Button from '@/components/ui/Button'

export default function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 text-center">
      <motion.div variants={prismLogoVariants} initial="hidden" animate="visible" className="mb-8">
        <PrismLogo size={72} />
      </motion.div>

      <motion.div variants={fadeVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-3">
          Prism
        </h1>
        <p className="text-[16px] text-[var(--text-secondary)] leading-relaxed mb-2">
          Every AI model. One interface.
        </p>
        <p className="text-[14px] text-[var(--text-tertiary)] leading-relaxed mb-12">
          Intelligent cascading. Full transparency. Yours to self-host.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, ...springs.bouncy }}
        className="w-full max-w-xs"
      >
        <Button onClick={onNext} size="lg" fullWidth>
          Get Started
        </Button>
      </motion.div>
    </div>
  )
}
