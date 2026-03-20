'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { experience } from '@/data'
import { fadeUp, staggerContainer, EASE_PREMIUM } from '@/lib/motion'

function TimelineItem({ item, index }: { item: typeof experience[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.1 }}
      className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0 md:gap-8"
    >
      {/* Left content (desktop) */}
      <div className={`hidden md:flex flex-col ${isEven ? 'items-end text-right' : 'items-start'}`}>
        {isEven && <TimelineContent item={item} />}
      </div>

      {/* Center — node */}
      <div className="flex flex-col items-center">
        {/* Node */}
        <div className="relative w-4 h-4 flex-shrink-0 mt-1">
          <div className="absolute inset-0 rounded-full bg-[var(--gold)]"
               style={{ boxShadow: '0 0 16px var(--gold-glow)' }} />
          <div className="absolute inset-0 rounded-full bg-[var(--gold)] opacity-30 animate-ping"
               style={{ animationDuration: '2.5s' }} />
        </div>

        {/* Year badge — mobile shows inline */}
        <div
          className="md:hidden mt-3 mb-4 text-xs font-800 tracking-[0.1em] uppercase text-[var(--gold)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {item.year}
        </div>

        {/* Connecting line (not on last) */}
        {index < experience.length - 1 && (
          <div className="flex-1 w-px bg-gradient-to-b from-[var(--gold)] via-[var(--gold)]/30 to-transparent mt-4 min-h-[60px]" />
        )}
      </div>

      {/* Right content (desktop) */}
      <div className={`hidden md:flex flex-col ${!isEven ? 'items-end text-right' : 'items-start'}`}>
        {!isEven && <TimelineContent item={item} rightAlign />}
      </div>

      {/* Mobile — full width below node */}
      <div className="md:hidden pl-6">
        <TimelineContent item={item} />
      </div>
    </motion.div>
  )
}

function TimelineContent({ item, rightAlign }: { item: typeof experience[0]; rightAlign?: boolean }) {
  return (
    <div
      className={`group relative bg-[var(--surface)] border border-[var(--border)] p-6 mb-8
                  hover:border-[var(--gold-glow)] hover:bg-[var(--bg2)]
                  transition-all duration-500 max-w-[420px]
                  ${rightAlign ? 'items-end' : ''}`}
      style={{ transitionTimingFunction: 'var(--ease-premium)' }}
    >
      {/* Gold corner accent */}
      <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Year — desktop shows here */}
      <div
        className="hidden md:block mb-2 text-[0.65rem] font-800 tracking-[0.15em] uppercase text-[var(--gold)]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {item.year}
      </div>

      <h3
        className="text-base font-800 text-[var(--text)] mb-1 leading-tight"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {item.role}
      </h3>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-[var(--gold)] font-medium">{item.company}</span>
        <span className="text-[var(--text3)] text-xs">·</span>
        <span className="text-xs text-[var(--text3)]">{item.location}</span>
        <span className="text-[var(--text3)] text-xs">·</span>
        <span
          className="text-[0.6rem] font-700 tracking-[0.1em] uppercase px-2 py-0.5 border border-[var(--border)] text-[var(--text3)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {item.type}
        </span>
      </div>

      <p className="text-sm text-[var(--text2)] leading-relaxed font-light mb-4">
        {item.desc}
      </p>

      {/* Highlights */}
      <ul className="space-y-1.5">
        {item.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-[var(--text3)]">
            <span className="text-[var(--gold)] mt-0.5 flex-shrink-0">↳</span>
            {h}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function JourneySection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="journey" className="section-pad bg-[var(--bg)] relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-[var(--gold)]/10 to-transparent pointer-events-none hidden md:block" />

      <div className="container-main">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="section-eyebrow justify-center mb-5 before:hidden">
            <span className="w-8 h-px bg-[var(--gold)]" /> Journey <span className="w-8 h-px bg-[var(--gold)]" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="display-section"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The path that
            <br />
            brought me <span className="serif-accent">here.</span>
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="flex flex-col gap-0">
          {experience.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
