'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Props {
  className?: string
}

export default function SectionDivider({ className = '' }: Props) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })

  return (
    <div ref={ref} className={`relative h-px overflow-hidden ${className}`}>
      <motion.div
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
      />
    </div>
  )
}
