'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'p' | 'div' | 'span'
}

export default function RevealText({
  children,
  className = '',
  delay = 0,
  as: Tag = 'p',
}: Props) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      <Tag className={className}>{children}</Tag>
    </motion.div>
  )
}
