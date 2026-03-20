'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { heroSequence, heroChild } from '@/lib/motion'
import { personal } from '@/data'

function HeroOrbVisual() {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-[10%] rounded-full border border-[var(--gold)]/20"
        style={{ boxShadow: '0 0 80px rgba(198, 169, 114, 0.08)' }}
      />
      <div className="absolute inset-[18%] rounded-full border border-[var(--gold)]/12 animate-spin-slow" />
      <div
        className="absolute inset-[26%] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(198,169,114,0.35) 0%, rgba(198,169,114,0.08) 35%, transparent 72%)',
          filter: 'blur(10px)',
        }}
      />
      <div className="absolute inset-0">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="absolute rounded-full border border-[var(--gold)]/10"
            style={{
              inset: `${14 + index * 10}%`,
              transform: `rotate(${index * 18}deg)`,
            }}
          />
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold)] shadow-[0_0_30px_rgba(198,169,114,0.7)]" />
    </div>
  )
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)
    let mouseX = width / 2
    let mouseY = height / 2

    const points = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.35 + 0.08,
      gold: Math.random() > 0.65,
    }))

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })

    let raf = 0

    const draw = () => {
      context.clearRect(0, 0, width, height)

      points.forEach((point, index) => {
        const dx = mouseX - point.x
        const dy = mouseY - point.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > 0 && distance < 160) {
          point.vx -= (dx / distance) * 0.018
          point.vy -= (dy / distance) * 0.018
        }

        point.vx *= 0.98
        point.vy *= 0.98
        point.x += point.vx
        point.y += point.vy

        if (point.x < 0) point.x = width
        if (point.x > width) point.x = 0
        if (point.y < 0) point.y = height
        if (point.y > height) point.y = 0

        context.beginPath()
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        context.fillStyle = point.gold
          ? `rgba(198,169,114,${point.opacity})`
          : `rgba(255,255,255,${point.opacity * 0.35})`
        context.fill()

        for (let nextIndex = index + 1; nextIndex < points.length; nextIndex += 1) {
          const nextPoint = points[nextIndex]
          const nextDistance = Math.sqrt((point.x - nextPoint.x) ** 2 + (point.y - nextPoint.y) ** 2)

          if (nextDistance < 80) {
            context.beginPath()
            context.moveTo(point.x, point.y)
            context.lineTo(nextPoint.x, nextPoint.y)
            context.strokeStyle = `rgba(198,169,114,${0.08 * (1 - nextDistance / 80)})`
            context.lineWidth = 0.4
            context.stroke()
          }
        }
      })

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  useEffect(() => {
    const orb = document.getElementById('hero-orb')
    if (!orb) return

    const onMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18
      const y = (event.clientY / window.innerHeight - 0.5) * 18
      orb.style.transform = `translateY(-50%) translate(${x}px, ${y}px)`
      orb.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute right-0 top-1/2 z-0 h-[700px] w-[700px] -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(198,169,114,0.12) 0%, transparent 68%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[30%] z-0 h-[400px] w-[400px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(198,169,114,0.05) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container-main relative z-10 w-full pb-16 pt-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_540px]">
          <motion.div variants={heroSequence} initial="hidden" animate="visible" className="max-w-[820px]">
            <motion.div variants={heroChild} className="mb-8">
              <div className="inline-flex items-center gap-2 border border-[var(--gold)]/30 bg-[var(--gold-dim)] px-3 py-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--gold)]" />
                <span
                  className="text-[0.6rem] font-700 uppercase tracking-[0.25em] text-[var(--gold)]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Available for new opportunities · 2025
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={heroChild}
              className="display-hero mb-7"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Crafting digital
              <br />
              experiences that
              <br />
              feel{' '}
              <em
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'var(--gold)',
                  fontSize: '1.05em',
                }}
              >
                alive.
              </em>
            </motion.h1>

            <motion.p
              variants={heroChild}
              className="mb-11 max-w-[540px] text-lg font-light leading-relaxed text-[var(--text2)] md:text-xl"
            >
              {personal.subtagline}
            </motion.p>

            <motion.div variants={heroChild} className="mb-14 flex flex-wrap gap-4">
              <Link href="/#projects" className="btn-gold px-8 py-4 text-sm">
                View Work <span className="ml-1">→</span>
              </Link>
              <Link href="/contact" className="btn-outline px-8 py-4 text-sm">
                Contact Me
              </Link>
            </motion.div>

            <motion.div variants={heroChild} className="flex flex-wrap gap-8 border-t border-[var(--border)] pt-10">
              {personal.metrics.map((metric) => (
                <div key={metric.label}>
                  <div
                    className="mb-1 text-3xl font-900 leading-none text-[var(--gold)]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {metric.value}
                  </div>
                  <div
                    className="text-[0.65rem] font-700 uppercase tracking-[0.12em] text-[var(--text3)]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {metric.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            id="hero-orb"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="relative hidden h-[440px] flex-shrink-0 lg:block xl:h-[520px]"
          >
            <HeroOrbVisual />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[0.58rem] uppercase tracking-[0.3em] text-[var(--text3)]">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-[var(--gold)] to-transparent" />
      </motion.div>
    </section>
  )
}
