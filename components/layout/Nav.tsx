'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'lottie-react'
import celAnimation from '@/public/cel.json'
import { personal } from '@/data'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/tools', label: 'Tools' },
  { href: '/projects', label: 'Projects' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [playBurst, setPlayBurst] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    links.forEach((link) => router.prefetch(link.href))
  }, [router])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!playBurst) return

    const timeout = window.setTimeout(() => {
      setPlayBurst(false)
    }, 3200)

    return () => window.clearTimeout(timeout)
  }, [playBurst])

  function triggerBurst() {
    setAnimationKey((current) => current + 1)
    setPlayBurst(true)
  }

  return (
    <>
      {playBurst ? (
        <div className="pointer-events-none fixed inset-0 z-[120] overflow-hidden">
          <Lottie
            key={animationKey}
            animationData={celAnimation}
            loop={false}
            autoplay
            className="h-full w-full scale-[1.08]"
          />
        </div>
      ) : null}

      <nav
        className={`fixed left-0 right-0 top-0 z-[100] border-[var(--border)] transition-all duration-200 ${
          scrolled
            ? 'border-b bg-[var(--bg)]/78 py-3 backdrop-blur-[20px]'
            : 'border-transparent bg-transparent py-5'
        }`}
      >
        <div className="container-main flex items-center justify-between gap-3">
          <Link
            href="/"
            prefetch
            className="group relative h-11 w-11 shrink-0 overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_12px_28px_rgba(15,23,42,0.06)] sm:h-12 sm:w-12"
            aria-label={`${personal.name} home`}
          >
            <Image src="/bac1.png" alt="VB logo" fill className="object-cover" />
          </Link>

          <div className="hidden rounded-full border border-[var(--border)] bg-[var(--surface)]/85 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur md:flex">
            {links.map((link) => {
              const active = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch
                  className={`rounded-full px-6 py-3 text-[0.82rem] font-700 tracking-[0.04em] transition-all duration-150 ${
                    active
                      ? 'border border-[var(--border)] bg-white text-[#111111] shadow-sm'
                      : 'text-[var(--text2)] hover:text-[var(--text)]'
                  }`}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={triggerBurst} aria-label="Play celebration animation" className="newtons-cradle-button">
              <span className="newtons-cradle" aria-hidden="true">
                <span className="newtons-cradle__dot" />
                <span className="newtons-cradle__dot" />
                <span className="newtons-cradle__dot" />
                <span className="newtons-cradle__dot" />
              </span>
            </button>

            <button
              onClick={() => setMenuOpen((open) => !open)}
              className="flex cursor-pointer flex-col gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)]/92 p-2.5 shadow-[0_10px_26px_rgba(15,23,42,0.06)] backdrop-blur md:hidden"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block h-px w-6 bg-[var(--text)]"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-px w-6 bg-[var(--text)]"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block h-px w-6 bg-[var(--text)]"
              />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="fixed inset-0 z-[98] bg-[rgba(5,8,14,0.62)] backdrop-blur-[10px] md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.985 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-4 right-4 top-[5.35rem] z-[99] overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)]/96 p-3 shadow-[0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-[18px] md:hidden"
            >
              <div className="mb-2 flex items-center justify-between px-2 pt-1">
                <div className="text-[0.72rem] font-700 uppercase tracking-[0.18em] text-[var(--text3)]">
                  Navigation
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-[var(--gold)]/70" />
              </div>

              <div className="space-y-2">
                {links.map((link, index) => {
                  const active = pathname === link.href

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={link.href}
                        prefetch
                        className={`flex items-center justify-between rounded-[20px] px-4 py-4 transition-all duration-200 ${
                          active
                            ? 'bg-[var(--gold-soft)] text-[var(--text)] shadow-[0_10px_28px_rgba(15,23,42,0.08)]'
                            : 'bg-[var(--bg2)]/46 text-[var(--text2)] hover:bg-[var(--bg2)] hover:text-[var(--text)]'
                        }`}
                      >
                        <span className="text-[1rem] font-700 tracking-[0.01em]" style={{ fontFamily: 'var(--font-display)' }}>
                          {link.label}
                        </span>
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-full border text-[1rem] ${
                            active
                              ? 'border-[var(--gold)]/45 bg-white/75 text-[var(--gold)]'
                              : 'border-[var(--border)] bg-white/55 text-[var(--text3)]'
                          }`}
                          aria-hidden="true"
                        >
                          {'\u2197'}
                        </span>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
