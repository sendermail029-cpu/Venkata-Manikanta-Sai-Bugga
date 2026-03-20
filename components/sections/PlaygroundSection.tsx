'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, staggerContainer, EASE_PREMIUM } from '@/lib/motion'

// ─── Particle Flow Canvas ──────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cardRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const card   = cardRef.current
    if (!canvas || !card) return
    const ctx = canvas.getContext('2d')!
    let W = canvas.width  = card.offsetWidth
    let H = canvas.height = card.offsetHeight
    let mx = W / 2, my = H / 2

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: 0, vy: 0,
      r: Math.random() * 2 + 0.5,
    }))

    const onResize = () => {
      W = canvas.width  = card.offsetWidth
      H = canvas.height = card.offsetHeight
    }
    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
    }
    window.addEventListener('resize', onResize, { passive: true })
    card.addEventListener('mousemove', onMove, { passive: true })

    let raf: number
    function draw() {
      ctx.fillStyle = 'rgba(10,10,10,0.25)'
      ctx.fillRect(0, 0, W, H)
      pts.forEach((p, i) => {
        const dx = mx - p.x, dy = my - p.y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < 130) { p.vx += dx / d * 0.45; p.vy += dy / d * 0.45 }
        p.vx *= 0.93; p.vy *= 0.93
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(198,169,114,0.75)`
        ctx.fill()
        for (let j = i + 1; j < pts.length; j++) {
          const q  = pts[j]
          const dd = Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2)
          if (dd < 75) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(198,169,114,${0.22 * (1 - dd / 75)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      card.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div ref={cardRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

// ─── Wave Ripple Canvas ────────────────────────────────────
function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cardRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const card   = cardRef.current
    if (!canvas || !card) return
    const ctx = canvas.getContext('2d')!
    let W = canvas.width  = card.offsetWidth
    let H = canvas.height = card.offsetHeight
    let ripples: { x: number; y: number; r: number; max: number }[] = []

    const onResize = () => {
      W = canvas.width  = card.offsetWidth
      H = canvas.height = card.offsetHeight
    }
    const onClick = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, r: 0, max: Math.max(W, H) })
    }
    window.addEventListener('resize', onResize, { passive: true })
    card.addEventListener('click', onClick)

    // Auto ripple every 2.5s
    const auto = setInterval(() => {
      ripples.push({ x: Math.random() * W, y: Math.random() * H, r: 0, max: Math.max(W, H) })
    }, 2500)

    const GRID = 28
    let raf: number
    function draw() {
      ctx.fillStyle = '#0A0A0A'
      ctx.fillRect(0, 0, W, H)
      for (let gx = 0; gx < W; gx += GRID) {
        for (let gy = 0; gy < H; gy += GRID) {
          let disp = 0
          ripples.forEach(rp => {
            const d = Math.sqrt((gx - rp.x) ** 2 + (gy - rp.y) ** 2)
            const wave = Math.sin((d - rp.r) * 0.18) * Math.exp(-Math.max(0, d - rp.r) * 0.013) * 9
            if (d < rp.r + 70) disp += wave
          })
          ctx.beginPath()
          ctx.arc(gx, gy + disp, 1.6, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(198,169,114,${0.28 + Math.abs(disp) * 0.045})`
          ctx.fill()
        }
      }
      ripples.forEach(rp => { rp.r += 3.5 })
      ripples = ripples.filter(rp => rp.r < rp.max + 70)
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      clearInterval(auto)
      window.removeEventListener('resize', onResize)
      card.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div ref={cardRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
    </div>
  )
}

// ─── Aurora Field Canvas ───────────────────────────────────
function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cardRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const card   = cardRef.current
    if (!canvas || !card) return
    const ctx = canvas.getContext('2d')!
    let W = canvas.width  = card.offsetWidth
    let H = canvas.height = card.offsetHeight
    let t = 0

    const onResize = () => {
      W = canvas.width  = card.offsetWidth
      H = canvas.height = card.offsetHeight
    }
    window.addEventListener('resize', onResize, { passive: true })

    let raf: number
    function draw() {
      ctx.fillStyle = `rgba(10,10,10,0.07)`
      ctx.fillRect(0, 0, W, H)
      const orbs = [
        { speed: 0.7, freq: 0.5, r: W * 0.42, hue: 43 },
        { speed: 0.5, freq: 0.8, r: W * 0.38, hue: 33 },
        { speed: 0.9, freq: 0.3, r: W * 0.35, hue: 50 },
        { speed: 0.4, freq: 1.1, r: W * 0.32, hue: 25 },
      ]
      orbs.forEach((o, i) => {
        const x = W / 2 + Math.cos(t * o.speed + i * 1.6) * o.r * 0.7
        const y = H / 2 + Math.sin(t * o.freq  + i * 1.0) * o.r * 0.5
        const g = ctx.createRadialGradient(x, y, 0, x, y, o.r)
        g.addColorStop(0, `hsla(${o.hue}, 55%, 52%, 0.065)`)
        g.addColorStop(0.5, `hsla(${o.hue + 15}, 45%, 38%, 0.03)`)
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, W, H)
      })
      t += 0.007
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div ref={cardRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

// ─── Draggable Card ────────────────────────────────────────
function DraggableCard() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const start = useRef({ mx: 0, my: 0, px: 0, py: 0 })

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    start.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y }
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return
    setPos({
      x: start.current.px + (e.clientX - start.current.mx),
      y: start.current.py + (e.clientY - start.current.my),
    })
  }
  const onMouseUp = () => setDragging(false)

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden select-none"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{ background: 'linear-gradient(135deg, #0D0D0D 0%, #151505 100%)' }}
    >
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.07]"
           style={{ backgroundImage: 'linear-gradient(#C6A972 1px, transparent 1px), linear-gradient(90deg, #C6A972 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Draggable element */}
      <div
        onMouseDown={onMouseDown}
        className={`relative z-10 border border-[var(--gold)] bg-[var(--surface)]/80 backdrop-blur-sm px-6 py-4 select-none
                    ${dragging ? 'cursor-grabbing scale-105' : 'cursor-grab'} transition-transform duration-200`}
        style={{ transform: `translate(${pos.x}px, ${pos.y}px) ${dragging ? 'scale(1.05)' : 'scale(1)'}`, boxShadow: '0 0 30px var(--gold-glow)' }}
      >
        <div className="text-[0.6rem] font-700 tracking-[0.2em] uppercase text-[var(--gold)] mb-1"
             style={{ fontFamily: 'var(--font-display)' }}>
          Drag me
        </div>
        <div className="text-sm font-800 text-[var(--text)]"
             style={{ fontFamily: 'var(--font-display)' }}>
          ✦ Interaction
        </div>
      </div>

      {/* Hint */}
      <div className="absolute bottom-4 right-4 text-[0.55rem] tracking-[0.15em] uppercase text-[var(--text3)]">
        Click & drag
      </div>
    </div>
  )
}

// ─── Play Card Wrapper ─────────────────────────────────────
function PlayCard({
  children, label, sublabel, delay,
}: {
  children: React.ReactNode
  label: string
  sublabel: string
  delay: number
}) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE_PREMIUM, delay }}
      className="relative aspect-square overflow-hidden border border-[var(--border)] bg-[var(--surface)]
                 hover:border-[var(--gold-glow)] transition-border duration-500 group"
    >
      {children}

      {/* Label overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--bg)]/90 to-transparent z-10 pointer-events-none">
        <div className="font-display text-sm font-800 text-[var(--text)] mb-0.5 tracking-[-0.01em]"
             style={{ fontFamily: 'var(--font-display)' }}>
          {label}
        </div>
        <div className="text-[0.6rem] tracking-[0.1em] uppercase text-[var(--text3)]">{sublabel}</div>
      </div>
    </motion.div>
  )
}

// ─── Main Export ───────────────────────────────────────────
export default function PlaygroundSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="playground" className="section-pad bg-[var(--bg)] relative overflow-hidden">
      <div className="container-main">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-14"
        >
          <motion.div variants={fadeUp} className="section-eyebrow mb-5">
            Playground
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="display-section max-w-[700px]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Experiments &
            <br />
            creative <span className="serif-accent">curiosities.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-[var(--text2)] text-base font-light max-w-[500px] leading-relaxed"
          >
            A space where I push boundaries, test ideas, and explore the edges of what's possible in the browser.
          </motion.p>
        </motion.div>

        {/* 3-col canvas grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5px] mb-[1.5px]">
          <PlayCard label="Particle Flow" sublabel="Move cursor to interact" delay={0}>
            <ParticleCanvas />
          </PlayCard>
          <PlayCard label="Wave Engine" sublabel="Click to create ripples" delay={0.1}>
            <WaveCanvas />
          </PlayCard>
          <PlayCard label="Aurora Field" sublabel="Live generative art" delay={0.2}>
            <AuroraCanvas />
          </PlayCard>
        </div>

        {/* Bottom row — draggable + location card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.5px]">
          {/* Draggable experiment */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: EASE_PREMIUM, delay: 0.3 }}
            className="relative min-h-[240px] overflow-hidden border border-[var(--border)] bg-[var(--surface)]
                       hover:border-[var(--gold-glow)] transition-colors duration-500"
          >
            <DraggableCard />
          </motion.div>

          {/* Austin / The Patio card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: EASE_PREMIUM, delay: 0.4 }}
            className="relative min-h-[240px] overflow-hidden border border-[var(--border)] bg-[var(--surface)]
                       hover:border-[var(--gold-glow)] transition-colors duration-500 group
                       flex flex-col justify-end p-8"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold-soft)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none" />
            {/* Ambient dot grid */}
            <div className="absolute inset-0 opacity-[0.04]"
                 style={{ backgroundImage: 'radial-gradient(#C6A972 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="gold-dot animate-pulse" />
                <span className="text-[0.6rem] font-700 tracking-[0.2em] uppercase text-[var(--gold)]"
                      style={{ fontFamily: 'var(--font-display)' }}>
                  Austin, Texas · The Patio
                </span>
              </div>

              <p
                className="text-xl font-300 leading-[1.45] mb-4"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text)' }}
              >
                "Some of my best work gets written between iced coffee and golden hour light."
              </p>

              <div className="flex items-center gap-3">
                <div className="text-[0.6rem] tracking-[0.12em] uppercase text-[var(--text3)]">
                  30.2672° N, 97.7431° W
                </div>
                <div className="h-3 w-px bg-[var(--border-s)]" />
                <div className="text-[0.6rem] tracking-[0.1em] uppercase text-[var(--text3)]">UTC −6</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
