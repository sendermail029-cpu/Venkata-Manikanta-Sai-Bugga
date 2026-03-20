'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { personal } from '@/data'
import { fadeUp, staggerContainer, EASE_PREMIUM } from '@/lib/motion'

export default function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="contact" className="section-pad bg-[var(--bg2)] relative overflow-hidden">
      {/* Background gold bloom */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] rounded-full bg-[var(--gold-dim)] blur-[120px]" />
      </div>

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-40" />

      <div className="container-main relative z-10" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-[860px] mx-auto text-center"
        >
          <motion.div variants={fadeUp} className="section-eyebrow justify-center mb-6 before:hidden">
            <span className="w-8 h-px bg-[var(--gold)]" />
            Let's build something remarkable
            <span className="w-8 h-px bg-[var(--gold)]" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="display-headline mb-8"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ready to make
            <br />
            something{' '}
            <span className="serif-accent">unforgettable?</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-[var(--text2)] font-light leading-relaxed max-w-[560px] mx-auto mb-12"
          >
            I'm open to select full-time roles and freelance projects.
            If you're building something that needs to feel premium — let's talk.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center mb-16">
            <a href={`mailto:${personal.email}`} className="btn-gold text-sm px-8 py-4">
              Send a Message <span className="text-base ml-1">→</span>
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm px-8 py-4">
              Download Resume
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-2 mb-16"
          >
            {[
              { label: 'LinkedIn',  href: personal.social.linkedin },
              { label: 'GitHub',    href: personal.social.github },
              { label: 'Twitter',   href: personal.social.twitter },
              { label: 'Dribbble',  href: personal.social.dribbble },
              { label: personal.email, href: `mailto:${personal.email}` },
            ].map((link, i, arr) => (
              <>
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="text-[0.72rem] font-700 tracking-[0.1em] uppercase text-[var(--text3)]
                             hover:text-[var(--gold)] transition-colors duration-300 nav-link-underline"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {link.label}
                </a>
                {i < arr.length - 1 && (
                  <span className="w-px h-3 bg-[var(--border-s)]" />
                )}
              </>
            ))}
          </motion.div>

          {/* Location note */}
          <motion.div
            variants={fadeUp}
            className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-[var(--text3)]"
          >
            <div className="flex items-center gap-2">
              <span className="gold-dot animate-pulse" />
              <span>Austin, TX — open to remote, hybrid, or in-person roles</span>
            </div>
            <span className="hidden sm:block w-px h-4 bg-[var(--border-s)]" />
            <span className="italic">Often found at The Patio between iced coffee and golden hour.</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
