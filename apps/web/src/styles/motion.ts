import type { Variants, Transition } from 'framer-motion'

// ── Spring presets ────────────────────────────────────────
export const springs = {
  // Snappy — for small UI elements, taps, buttons
  snappy: {
    type: 'spring',
    stiffness: 400,
    damping: 30,
  } as Transition,

  // Default — most transitions
  default: {
    type: 'spring',
    stiffness: 300,
    damping: 25,
  } as Transition,

  // Gentle — large surfaces, sheets, sidebar
  gentle: {
    type: 'spring',
    stiffness: 200,
    damping: 28,
  } as Transition,

  // Bouncy — onboarding, celebrations
  bouncy: {
    type: 'spring',
    stiffness: 350,
    damping: 20,
  } as Transition,

  // Slow — backdrop fade, ambient
  slow: {
    type: 'spring',
    stiffness: 120,
    damping: 20,
  } as Transition,
} as const

// ── Page transitions ──────────────────────────────────────
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 12, scale: 0.99 },
  animate: { opacity: 1, y: 0,  scale: 1,    transition: springs.default },
  exit:    { opacity: 0, y: -8, scale: 0.99, transition: { duration: 0.15 } },
}

// ── Sidebar ───────────────────────────────────────────────
export const sidebarVariants: Variants = {
  closed: { x: '-100%', transition: springs.gentle },
  open:   { x: '0%',   transition: springs.gentle },
}

export const sidebarBackdropVariants: Variants = {
  closed: { opacity: 0, pointerEvents: 'none' as const },
  open:   { opacity: 1, pointerEvents: 'auto' as const },
}

// ── Bottom sheet ──────────────────────────────────────────
export const sheetVariants: Variants = {
  closed: { y: '100%', transition: springs.gentle },
  open:   { y: '0%',   transition: springs.gentle },
}

export const sheetBackdropVariants: Variants = {
  closed: { opacity: 0 },
  open:   { opacity: 1 },
}

// ── List items stagger ────────────────────────────────────
export const listContainerVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

export const listItemVariants: Variants = {
  hidden:  { opacity: 0, y: 10, scale: 0.98 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: springs.default },
}

// ── Fade in ───────────────────────────────────────────────
export const fadeVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
}

// ── Scale in (tapping, button press) ─────────────────────
export const tapScale = {
  whileTap: { scale: 0.95, transition: springs.snappy },
}

// ── Slide up (toasts, small popups) ──────────────────────
export const slideUpVariants: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,  transition: springs.bouncy },
  exit:    { opacity: 0, y: 8,  transition: { duration: 0.15 } },
}

// ── Onboarding screen transitions ────────────────────────
export const onboardingVariants: Variants = {
  enter:  { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0,   transition: springs.default },
  exit:   { opacity: 0, x: -40, transition: { duration: 0.2 } },
}

// ── Token burn health bar ─────────────────────────────────
export const tokenBarVariants: Variants = {
  hidden:  { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: springs.slow },
}

// ── Prism logo refraction (onboarding) ───────────────────
export const prismLogoVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: springs.bouncy,
  },
}
