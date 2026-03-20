'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { personal } from '@/data'
import { fadeUp, slideRight, slideLeft, staggerContainer, EASE_PREMIUM } from '@/lib/motion'

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="about" className="section-pad bg-[var(--bg2)] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--gold-dim)] blur-[120px] pointer-events-none" />

      <div className="container-main" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* LEFT — Image & Metrics card */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            {/* Photo frame */}
            <div className="relative aspect-[4/5] max-w-[440px] mx-auto lg:mx-0">
              {/* Frame border with gold corner accents */}
              <div className="absolute inset-0 border border-[var(--border)] bg-[var(--surface)]">
                {/* Corner gold accents */}
                <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--gold)]" />
                <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--gold)]" />
                <span className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--gold)]" />
                <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--gold)]" />

                {/* Photo placeholder — replace with next/image */}
                <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[var(--surface)] to-[var(--surface2)]">
                  <Image src="/bac1.png" alt="VB logo" fill className="object-cover opacity-95" />
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg2)]/60 via-transparent to-transparent" />
              </div>

              {/* Floating metric card */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 20 }}
                animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8, ease: EASE_PREMIUM }}
                className="absolute -bottom-6 -right-6 glass-card p-5 min-w-[160px]"
              >
                <div
                  className="text-4xl font-black text-[var(--gold)] leading-none mb-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  5+
                </div>
                <div className="text-[0.65rem] font-700 tracking-[0.15em] uppercase text-[var(--text3)]">
                  Years crafting
                </div>
              </motion.div>

              {/* Second floating badge */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: -20 }}
                animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ delay: 0.65, duration: 0.8, ease: EASE_PREMIUM }}
                className="absolute -top-4 -left-4 glass-card px-4 py-3 flex items-center gap-2"
              >
                <div className="gold-dot animate-pulse" />
                <span className="text-[0.65rem] font-700 tracking-[0.12em] uppercase text-[var(--gold)]">
                  Available 2025
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — Bio content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div variants={fadeUp} className="section-eyebrow mb-5">
              About Me
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="display-section mb-8"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              A creative
              <br />
              at heart, an
              <br />
              engineer
              <br />
              by <span className="serif-accent">craft.</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="w-12 h-px bg-[var(--gold)] mb-8" />

            {personal.bio.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-[var(--text2)] text-base leading-[1.85] font-light mb-5"
                dangerouslySetInnerHTML={{ __html: para }}
                style={{ ['--tw-prose-bold' as string]: 'var(--text)' }}
              />
            ))}

            {/* Metrics grid */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-10 pt-8 border-t border-[var(--border)]"
            >
              {personal.metrics.map((m) => (
                <div key={m.label}>
                  <div
                    className="text-2xl font-black text-[var(--gold)] leading-none mb-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {m.value}
                  </div>
                  <div className="text-[0.65rem] font-600 tracking-[0.1em] uppercase text-[var(--text3)]">
                    {m.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Location */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mt-8 pt-7 border-t border-[var(--border)]"
            >
              <div className="gold-dot" />
              <p className="text-sm text-[var(--text3)]">
                Based in Austin, TX — often working from{' '}
                <span className="text-[var(--text)] font-medium">The Patio</span>, where the best ideas
                seem to find me.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
