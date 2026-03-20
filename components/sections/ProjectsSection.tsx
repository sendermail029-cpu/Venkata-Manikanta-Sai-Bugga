'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { projects } from '@/data'
import { fadeUp, staggerContainer, EASE_PREMIUM } from '@/lib/motion'
import { useTilt } from '@/hooks/useTilt'

// ─── Featured Project Card ─────────────────────────────────
function FeaturedCard({ project }: { project: typeof projects[0] }) {
  const { cardRef, onMouseMove, onMouseLeave } = useTilt(5)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE_PREMIUM }}
    >
      <Link href={`/projects/${project.slug}`}>
        <div
          ref={cardRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="group relative grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] min-h-[520px]
                     border border-[var(--border)] overflow-hidden
                     hover:border-[var(--gold-glow)] transition-all duration-600 cursor-pointer"
          style={{ transitionTimingFunction: 'var(--ease-premium)', transformStyle: 'preserve-3d' }}
        >
          {/* Visual pane */}
          <div className="relative overflow-hidden min-h-[320px] lg:min-h-auto bg-[var(--surface)]">
            {/* Animated canvas background */}
            <FeaturedVisual accentColor={project.accentColor} mockColor={project.mockColor} />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent" />

            {/* Featured badge */}
            <div className="absolute top-5 left-5">
              <span className="inline-flex items-center gap-2 bg-[var(--bg)]/90 border border-[var(--gold)] px-3 py-1.5 text-[0.6rem] font-800 tracking-[0.15em] uppercase text-[var(--gold)]"
                style={{ fontFamily: 'var(--font-display)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
                Featured
              </span>
            </div>

            <div className="absolute bottom-5 left-5 text-[0.6rem] font-700 tracking-[0.2em] uppercase text-[var(--text3)]">
              {project.num} / 0{projects.length}
            </div>
          </div>

          {/* Info pane */}
          <div className="flex flex-col justify-between p-8 xl:p-12 bg-[var(--surface)]
                          group-hover:bg-[var(--bg2)] transition-colors duration-500">
            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-chip">{tag}</span>
                ))}
              </div>

              {/* Title */}
              <h3
                className="text-[1.9rem] xl:text-[2.4rem] font-900 leading-[1.08] tracking-[-0.025em] text-[var(--text)] mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {project.title}
              </h3>

              <p className="text-[var(--text2)] text-sm leading-relaxed font-light mb-8">
                {project.fullDesc}
              </p>

              {/* Outcome highlight */}
              <div className="border-l-2 border-[var(--gold)] pl-4 mb-8">
                <div className="text-[0.6rem] font-700 tracking-[0.2em] uppercase text-[var(--gold)] mb-1">
                  Outcome
                </div>
                <p className="text-sm text-[var(--text2)] font-light">{project.outcome}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between pt-6 border-t border-[var(--border)]">
              <div>
                <div className="text-[0.6rem] font-700 tracking-[0.15em] uppercase text-[var(--text3)] mb-0.5">Role</div>
                <div className="text-sm text-[var(--text)] font-medium">{project.role}</div>
              </div>
              <div
                className="flex items-center gap-2 text-[0.7rem] font-800 tracking-[0.12em] uppercase text-[var(--gold)]
                           group-hover:gap-4 transition-all duration-500"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                View Case Study
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Animated featured visual ─────────────────────────────
function FeaturedVisual({ accentColor, mockColor }: { accentColor: string; mockColor: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: mockColor }}>
      {/* Animated gradient orbs */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width:  `${120 + i * 60}px`,
            height: `${120 + i * 60}px`,
            left:   `${10 + i * 18}%`,
            top:    `${15 + (i % 3) * 25}%`,
            background: `radial-gradient(circle, ${accentColor}${Math.floor(15 - i * 2).toString(16).padStart(2,'0')} 0%, transparent 70%)`,
            animationDelay: `${i * 1.1}s`,
            animationDuration: `${6 + i}s`,
          }}
        />
      ))}
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  )
}

// ─── Secondary Project Card ────────────────────────────────
function SecondaryCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { cardRef, onMouseMove, onMouseLeave } = useTilt(7)
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE_PREMIUM, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.slug}`}>
        <div
          ref={cardRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="group relative border border-[var(--border)] bg-[var(--surface)] overflow-hidden
                     hover:border-[var(--gold-glow)] hover:bg-[var(--bg2)]
                     transition-all duration-500 cursor-pointer h-full"
          style={{ transformStyle: 'preserve-3d', transitionTimingFunction: 'var(--ease-premium)' }}
        >
          {/* Visual zone */}
          <div className="relative h-44 overflow-hidden" style={{ background: project.mockColor }}>
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `linear-gradient(${project.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor} 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-xl"
              style={{ background: `${project.accentColor}20` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/80 to-transparent" />

            {/* Num */}
            <div
              className="absolute top-4 left-4 text-5xl font-900 text-[var(--gold)] opacity-[0.12] leading-none"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {project.num}
            </div>

            <div
              className="absolute top-4 right-4 text-[0.6rem] font-700 tracking-[0.15em] uppercase px-2 py-1 border"
              style={{
                color: project.accentColor,
                borderColor: `${project.accentColor}40`,
                background: `${project.accentColor}0d`,
                fontFamily: 'var(--font-display)',
              }}
            >
              {project.category.split(' ')[0]}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag-chip">{tag}</span>
              ))}
            </div>

            <h3
              className="text-xl font-800 text-[var(--text)] mb-3 leading-[1.2] tracking-[-0.015em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {project.title}
            </h3>

            <p className="text-sm text-[var(--text2)] leading-relaxed font-light mb-5 line-clamp-2">
              {project.shortDesc}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
              <span className="text-[0.65rem] text-[var(--text3)] font-600 tracking-[0.08em]">{project.year}</span>
              <span
                className="text-[0.65rem] font-800 tracking-[0.1em] uppercase text-[var(--gold)] flex items-center gap-1.5
                           group-hover:gap-3 transition-all duration-300"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Explore <span>→</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Main Export ───────────────────────────────────────────
export default function ProjectsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const featured   = projects.find((p) => p.featured)!
  const secondary  = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="section-pad bg-[var(--bg2)] relative overflow-hidden">
      <div className="container-main">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <motion.div variants={fadeUp} className="section-eyebrow mb-5">
              Selected Work
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="display-section"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Projects that
              <br />
              made an <span className="serif-accent">impact.</span>
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link href="/projects" className="btn-outline text-sm">
              All Projects →
            </Link>
          </motion.div>
        </motion.div>

        {/* Featured */}
        <div className="mb-[1.5px]">
          <FeaturedCard project={featured} />
        </div>

        {/* Secondary grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.5px]">
          {secondary.map((p, i) => (
            <SecondaryCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
