'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Props {
  text:      string
  className?: string
  tag?:      'h1' | 'h2' | 'h3' | 'h4'
  delay?:    number
}

const word: import('framer-motion').Variants = {
  hidden:  { y: '105%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.06,
    },
  }),
}

export default function AnimatedHeading({ text, className = '', tag: Tag = 'h2', delay = 0 }: Props) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={`overflow-hidden ${className}`} aria-label={text}>
      <span className="flex flex-wrap" aria-hidden>
        {words.map((w, i) => (
          <span key={i} className="overflow-hidden mr-[0.25em]">
            <motion.span
              className="inline-block"
              variants={word}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={i + delay / 0.06}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
