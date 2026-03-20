'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, staggerContainer, EASE_PREMIUM } from '@/lib/motion'

interface SpotifyData {
  isPlaying:    boolean
  title:        string
  artist:       string
  album:        string
  albumArt:     string
  songUrl:      string
  progressMs:   number
  durationMs:   number
}

function formatTime(ms: number) {
  const s = Math.floor(ms / 1000)
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
}

function EqBars({ playing }: { playing: boolean }) {
  const heights = [4, 10, 6, 12, 8, 5, 11, 7]
  return (
    <div className="flex items-end gap-[2px] h-4">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[2px] rounded-full bg-[var(--gold)]"
          style={{
            height:   `${h}px`,
            animation: playing
              ? `eq ${0.4 + i * 0.08}s ease-in-out infinite alternate`
              : 'none',
            animationDelay: `${i * 0.07}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function SpotifySection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [data, setData]       = useState<SpotifyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    async function fetchSpotify() {
      try {
        const res = await fetch('/api/spotify')
        if (res.ok) {
          const json = await res.json()
          setData(json)
          setProgress(json.progressMs)
        }
      } catch (e) {
        // fallback handled below
      } finally {
        setLoading(false)
      }
    }
    fetchSpotify()
    const interval = setInterval(fetchSpotify, 30_000)
    return () => clearInterval(interval)
  }, [])

  // Tick progress
  useEffect(() => {
    if (!data?.isPlaying) return
    const tick = setInterval(() => {
      setProgress((p) => Math.min(p + 1000, data.durationMs))
    }, 1000)
    return () => clearInterval(tick)
  }, [data])

  const pct = data ? (progress / data.durationMs) * 100 : 40

  // Demo fallback data
  const display = data ?? {
    isPlaying: true,
    title:     'Midnight City',
    artist:    'M83',
    album:     'Hurry Up, We\'re Dreaming',
    albumArt:  '',
    songUrl:   'https://open.spotify.com',
    progressMs: 102000,
    durationMs: 304000,
  }

  return (
    <section id="spotify" className="section-pad bg-[var(--bg2)] relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gold opacity-20 pointer-events-none" />

      <div className="container-main" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-[760px] mx-auto"
        >
          <motion.div variants={fadeUp} className="section-eyebrow mb-5 justify-center before:hidden">
            <span className="w-8 h-px bg-[var(--gold)]" /> Now Playing <span className="w-8 h-px bg-[var(--gold)]" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="display-section text-center mb-14"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The soundtrack
            <br />
            to my <span className="serif-accent">flow state.</span>
          </motion.h2>

          {/* Main card */}
          <motion.div
            variants={fadeUp}
            className="relative border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
          >
            {/* Gold glow top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-60" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold-dim)] blur-[80px] pointer-events-none" />

            <div className="relative z-10 p-8 md:p-10">
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                {/* Album art */}
                <div className="relative flex-shrink-0">
                  <div className={`w-28 h-28 md:w-36 md:h-36 relative overflow-hidden rounded-sm
                                   ${display.isPlaying ? 'shadow-gold-md' : 'shadow-dark-sm'}`}
                       style={{ boxShadow: display.isPlaying ? '0 8px 40px var(--gold-glow)' : undefined }}>
                    {display.albumArt ? (
                      <Image src={display.albumArt} alt={display.album} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1DB954]/30 to-[var(--surface)] text-4xl">
                        🎵
                      </div>
                    )}
                  </div>
                  {/* Vinyl ring */}
                  {display.isPlaying && (
                    <div
                      className="absolute -inset-2 rounded-full border border-[var(--gold)]/20 animate-spin-slow pointer-events-none"
                      style={{ borderStyle: 'dashed' }}
                    />
                  )}
                </div>

                {/* Meta */}
                <div className="flex-1 min-w-0">
                  {/* Status row */}
                  <div className="flex items-center gap-3 mb-4">
                    <EqBars playing={display.isPlaying} />
                    <span className="text-[0.62rem] font-700 tracking-[0.2em] uppercase text-[var(--gold)]"
                          style={{ fontFamily: 'var(--font-display)' }}>
                      {display.isPlaying ? 'Now Playing on Spotify' : 'Last Played'}
                    </span>
                  </div>

                  {/* Song title */}
                  <a
                    href={display.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-display text-2xl md:text-3xl font-900 text-[var(--text)] leading-tight mb-1.5 truncate hover:text-[var(--gold)] transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {display.title}
                  </a>

                  <p className="text-sm text-[var(--text2)] font-light mb-6 truncate">
                    {display.artist}
                    <span className="text-[var(--text3)] mx-2">·</span>
                    {display.album}
                  </p>

                  {/* Progress bar */}
                  <div className="w-full">
                    <div className="w-full h-[2px] bg-[var(--border)] rounded-full overflow-hidden cursor-pointer group/bar">
                      <div
                        className="h-full bg-[var(--gold)] rounded-full transition-all duration-1000 linear"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-[0.68rem] text-[var(--text3)] font-mono tabular-nums">
                        {formatTime(progress)}
                      </span>
                      <span className="text-[0.68rem] text-[var(--text3)] font-mono tabular-nums">
                        {formatTime(display.durationMs)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border)]">
                <p className="text-xs text-[var(--text3)] italic">
                  Music fuels the late-night sessions at The Patio.
                </p>
                <a
                  href="https://open.spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[0.65rem] font-700 tracking-[0.1em] uppercase text-[#1DB954] hover:opacity-80 transition-opacity"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#1DB954">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Open Spotify
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
