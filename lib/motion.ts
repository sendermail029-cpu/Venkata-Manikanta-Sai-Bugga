import { Variants } from 'framer-motion'

export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const
export const EASE_SPRING  = { type: 'spring', stiffness: 300, damping: 30 }

// Core page/section variants
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_PREMIUM } },
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: EASE_PREMIUM } },
}

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE_PREMIUM } },
}

export const blurReveal: Variants = {
  hidden:  { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE_PREMIUM } },
}

export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_PREMIUM } },
}

export const slideRight: Variants = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_PREMIUM } },
}

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

// Hero sequence — staggered entrance
export const heroSequence: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.4,
    },
  },
}

export const heroChild: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_PREMIUM } },
}

// Card hover
export const cardHover = {
  rest:  { scale: 1, y: 0 },
  hover: {
    scale: 1.01,
    y: -4,
    transition: { duration: 0.4, ease: EASE_PREMIUM },
  },
}

// Letter stagger for hero text
export const letterStagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.03 } },
}

export const letterVariant: Variants = {
  hidden:  { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: '0%', transition: { duration: 0.6, ease: EASE_PREMIUM } },
}

// Timeline item
export const timelineItem: Variants = {
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_PREMIUM } },
}

// Page transition
export const pageTransition = {
  initial: { opacity: 0, y: 20, filter: 'blur(6px)' },
  enter:   { opacity: 1, y: 0,  filter: 'blur(0px)',
             transition: { duration: 0.55, ease: EASE_PREMIUM } },
  exit:    { opacity: 0, y: -10, filter: 'blur(4px)',
             transition: { duration: 0.3,  ease: EASE_PREMIUM } },
}
