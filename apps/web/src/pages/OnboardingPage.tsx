import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { onboardingVariants } from '@/styles/motion'
import { useAppStore } from '@/store/app.store'
import StepWelcome         from '@/components/onboarding/StepWelcome'
import StepPersonalization from '@/components/onboarding/StepPersonalization'
import StepApiKeys         from '@/components/onboarding/StepApiKeys'
import StepCascade         from '@/components/onboarding/StepCascade'
import StepAppearance      from '@/components/onboarding/StepAppearance'

const STEPS = 5

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const { setHasOnboarded } = useAppStore()
  const navigate = useNavigate()

  const next = () => {
    if (step < STEPS - 1) {
      setDirection(1)
      setStep((s) => s + 1)
    } else {
      setHasOnboarded(true)
      navigate('/chat', { replace: true })
    }
  }

  const dots = Array.from({ length: STEPS })

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-center gap-2 pt-5 px-6 flex-shrink-0">
        {dots.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === step ? 24 : 6,
              background: i === step ? 'var(--accent-purple)' : i < step ? 'var(--accent-blue)' : 'var(--border-default)',
            }}
            transition={{ duration: 0.3 }}
            className="h-[6px] rounded-full"
          />
        ))}
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={onboardingVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex flex-col"
          >
            {step === 0 && <StepWelcome onNext={next} />}
            {step === 1 && <StepPersonalization onNext={next} />}
            {step === 2 && <StepApiKeys onNext={next} />}
            {step === 3 && <StepCascade onNext={next} />}
            {step === 4 && <StepAppearance onNext={next} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
