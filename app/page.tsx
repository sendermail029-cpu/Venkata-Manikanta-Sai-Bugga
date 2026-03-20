'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import Lottie from 'lottie-react'
import { useTheme } from 'next-themes'
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { SiSpotify } from 'react-icons/si'
import Footer from '@/components/layout/Footer'
import LoaderScreen from '@/components/ui/LoaderScreen'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'
import ToolLogo from '@/components/ui/ToolLogo'
import bacAnimation from '@/public/bac.json'

const socials = [
  { name: 'GitHub', icon: FaGithub, color: 'linear-gradient(135deg,#5f1f81 0%,#b61df4 55%,#6b2aa8 100%)', href: 'https://github.com/VenkataManikantaSaiBugga' },
  { name: 'LinkedIn', icon: FaLinkedinIn, color: '#0A66C2', href: 'https://www.linkedin.com/in/venkata-bugga15' },
  { name: 'Instagram', icon: FaInstagram, color: 'linear-gradient(135deg,#f58529 0%,#feda77 40%,#dd2a7b 72%,#8134af 100%)', href: 'https://www.instagram.com/kittubugga?igsh=eXA3cmdhMzdycnNt' },
  { name: 'Twitter', icon: FaXTwitter, color: '#111111', href: '#' },
]

const homepageMapUrl =
  'https://www.google.com/maps/search/The%20Patio%20-%20Austin%2C%20Texas/@30.462261199951172,-97.59745025634766,17z?hl=en'
const homepageMapEmbedUrl =
  'https://www.google.com/maps?q=The%20Patio%20Austin%20Texas&ll=30.462261199951172,-97.59745025634766&z=17&output=embed'
const homepageToolPreview = ['JavaScript', 'Python', 'TypeScript', 'Cloud Computing', 'Artificial Intelligence', 'Angular', 'GitHub', 'Postman']

interface SpotifyData {
  isPlaying: boolean
  title?: string
  artist?: string
  album?: string
  albumArt?: string
  songUrl?: string
  progressMs?: number
  durationMs?: number
  unavailable?: boolean
}

function getGreeting(hour: number) {
  if (hour < 12) return 'Good Morning!'
  if (hour < 17) return 'Good Afternoon!'
  return 'Good Evening!'
}

function Card({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <section
      className={`overflow-hidden rounded-[34px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_20px_60px_rgba(15,23,42,0.06)] ${className}`}
    >
      {children}
    </section>
  )
}

export default function HomePage() {
  const [greeting, setGreeting] = useState('Hello!')
  const [socialIndex, setSocialIndex] = useState(0)
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setGreeting(getGreeting(new Date().getHours()))
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setSocialIndex((current) => (current + 1) % socials.length)
    }, 2600)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    let active = true

    async function fetchSpotify() {
      try {
        const res = await fetch('/api/spotify', { cache: 'no-store' })
        if (!res.ok) return
        const json = await res.json()
        if (active) {
          setSpotifyData(json)
        }
      } catch {
        // Keep the card stable if Spotify is not configured yet.
      }
    }

    fetchSpotify()
    const interval = window.setInterval(fetchSpotify, 30_000)
    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [])

  const activeSocial = useMemo(() => socials[socialIndex], [socialIndex])
  const SocialIcon = activeSocial.icon
  const spotifyDisplay = spotifyData?.title
    ? spotifyData
    : {
        isPlaying: false,
        title: 'Spotify Not Connected',
        artist: 'Add Spotify API credentials to show live listening.',
        album: '',
        songUrl: 'https://open.spotify.com',
      }

  return (
    <>
      <LoaderScreen />
      <ScrollProgressBar />
      <main className="bg-transparent pb-16 pt-28 md:pb-20 md:pt-32">
        <div className="container-main space-y-4 md:space-y-5">
          <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12 lg:grid-rows-[160px_160px_160px_160px_160px_160px]">
            <Card className="p-5 md:p-8 lg:col-span-6 lg:row-span-2">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                <div className="relative h-20 w-20 overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#f6f0e4_0%,#efe7d7_100%)] shadow-[0_18px_42px_rgba(15,23,42,0.08)] sm:h-28 sm:w-28 sm:rounded-[28px]">
                  <Image src="/bac1.png" alt="VB logo" fill className="object-cover" />
                </div>
                <div className="w-fit rounded-[18px] bg-[linear-gradient(135deg,#ff5630_0%,#ff8f1f_100%)] px-5 py-2.5 text-[0.95rem] font-800 text-white shadow-[0_18px_34px_rgba(255,118,44,0.26)] sm:rounded-[22px] sm:px-6 sm:py-3 sm:text-[1.05rem]">
                  {greeting}
                </div>
              </div>

              <div className="mt-6 max-w-[660px] text-[1rem] leading-[1.75] text-[var(--text2)] md:mt-10 md:text-[1.26rem]">
                I&apos;m <span className="font-800 text-[var(--text)]">Venkata Manikanta Sai Bugga</span>, an IT professional passionate about{' '}
                <span className="font-700 text-[var(--text)]">data analysis, cloud computing, AI, and backend-oriented technical problem solving.</span>
              </div>
            </Card>

            <Card className="p-3 lg:col-span-3 lg:row-span-2">
              <div className="relative h-full min-h-[320px] overflow-hidden rounded-[28px] bg-[#eef3f8] sm:min-h-[360px]">
                <iframe
                  title="Google Maps location for The Patio, Austin, Texas"
                  src={homepageMapEmbedUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 bg-white/18 backdrop-blur-[1px]" />
                <Link
                  href={homepageMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open The Patio location in Google Maps"
                  className="absolute left-3 top-3 z-10 rounded-[12px] bg-white px-3 py-1.5 text-[0.82rem] font-700 text-[#2966de] shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-0.5 sm:left-4 sm:top-4 sm:rounded-[14px] sm:px-4 sm:py-2 sm:text-[0.92rem]"
                >
                  Open in Maps
                </Link>
                <div className="absolute left-[18%] top-[30%] z-10 h-20 w-20 rounded-full border-[3px] border-dashed border-[#ff7259] sm:left-[20%] sm:top-[28%] sm:h-24 sm:w-24" />
                <div className="absolute left-[10%] top-[59%] z-10 text-[0.9rem] font-600 text-[#3759ab] sm:left-[13%] sm:text-[0.96rem]">The Patio</div>
                <div className="absolute left-[54%] top-[35%] z-10 text-[0.92rem] font-600 text-[#4f6179] sm:left-[56%] sm:top-[33%] sm:text-[1rem]">Austin, Texas</div>
                <div className="absolute left-[10%] top-[68%] z-10 text-[0.66rem] font-600 tracking-[0.08em] text-[#64748b] sm:left-[13%] sm:text-[0.72rem]">
                  30.4623, -97.5975
                </div>
                <div className="absolute bottom-[16%] left-[48%] z-10 h-24 w-24 overflow-hidden rounded-full border-[5px] border-white bg-white shadow-[0_22px_50px_rgba(15,23,42,0.2)] sm:bottom-[18%] sm:left-[50%] sm:h-28 sm:w-28">
                  <Image src="/bac1.png" alt="VB logo" fill className="object-cover" />
                </div>
                <div className="absolute bottom-4 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/92 text-[1.5rem] text-[var(--text)] shadow-[0_10px_24px_rgba(15,23,42,0.1)] sm:bottom-6 sm:right-6 sm:h-14 sm:w-14 sm:text-[1.9rem]">
                  +
                </div>
              </div>
            </Card>

            <Card className="p-3 lg:col-span-3 lg:row-span-4">
              <Link
                href="/tools"
                aria-label="Open tools page"
                className="group relative block h-full min-h-[430px] overflow-hidden rounded-[28px] border border-dashed border-[rgba(15,23,42,0.08)] bg-white sm:min-h-[660px]"
              >
                <div
                  className="absolute inset-0 opacity-[0.15]"
                  style={{
                    backgroundImage:
                      'radial-gradient(color-mix(in srgb, var(--text3) 60%, transparent) 1.1px, transparent 1.1px)',
                    backgroundSize: '42px 42px',
                  }}
                />
                <div className="pointer-events-none absolute left-6 top-6 h-11 w-11 rounded-full border border-[var(--gold)]/55" />
                <div className="pointer-events-none absolute left-[2.15rem] top-[2.15rem] h-3.5 w-3.5 rounded-full bg-[#3466b6]" />
                <div className="pointer-events-none absolute inset-6 rounded-[26px] border border-dashed border-[var(--border)] bg-white/92" />

                <div className="absolute left-6 top-6 z-10 text-[0.68rem] font-700 uppercase tracking-[0.18em] text-[var(--text3)] sm:left-8 sm:top-8 sm:text-[0.78rem] sm:tracking-[0.22em]">
                  Tools Collage
                </div>

                <div
                  className="pointer-events-none absolute inset-[2.4rem] opacity-[0.22]"
                  style={{
                    backgroundImage:
                      'radial-gradient(ellipse at center, transparent 34%, rgba(255,255,255,0.96) 35%), url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 200 200%27 fill=%27none%27 stroke=%27%2394a3b8%27 stroke-width=%271.4%27%3E%3Cpath d=%27M18 40c22-26 70-30 92-4 20 24-4 56-34 60-18 2-34-8-40-22-8-18 8-40 32-42 22-2 40 14 40 34 0 20-16 34-38 38-26 4-52-8-62-28-12-24 4-54 32-66 32-14 72-4 92 24%27/%3E%3C/svg%3E")',
                    backgroundSize: '100% 100%, 220px 220px',
                    backgroundPosition: 'center, center',
                  }}
                />

                <div className="absolute inset-x-0 top-[5.25rem] bottom-[5.75rem] z-10 px-5 sm:top-[6.8rem] sm:bottom-[6.8rem] sm:px-8">
                  <div className="relative h-full">
                    {homepageToolPreview.map((tool, index) => {
                      const placements = [
                        'left-[10%] top-[2%]',
                        'left-[58%] top-[0%]',
                        'left-[22%] top-[26%]',
                        'left-[63%] top-[24%]',
                        'left-[43%] top-[46%]',
                        'left-[18%] top-[60%]',
                        'left-[62%] top-[68%]',
                        'left-[40%] top-[78%]',
                      ]

                      const rotations = ['rotate-[-10deg]', 'rotate-[12deg]', 'rotate-[8deg]', 'rotate-[-8deg]', 'rotate-[10deg]', 'rotate-[-12deg]', 'rotate-[9deg]', 'rotate-[-7deg]']

                      return (
                        <div
                          key={tool}
                          className={`absolute ${placements[index]} ${rotations[index]} scale-[0.72] transition-transform duration-300 group-hover:scale-[0.76] sm:scale-100 sm:group-hover:scale-[1.03]`}
                        >
                          <ToolLogo name={tool} size="lg" />
                        </div>
                      )
                    })}
                  </div>
                </div>

                <span className="absolute bottom-4 left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/96 text-[1.35rem] text-[var(--text)] shadow-[0_12px_28px_rgba(15,23,42,0.1)] sm:bottom-6 sm:left-6 sm:h-14 sm:w-14 sm:text-[1.75rem]">
                  {'\u2197'}
                </span>
              </Link>
            </Card>

            <Card className="p-6 md:p-8 lg:col-span-3 lg:row-span-2">
              <div className="mx-auto h-28 w-28 rounded-full bg-[linear-gradient(135deg,#ff6b00_0%,#ffd389_100%)] shadow-[0_24px_55px_rgba(255,133,42,0.26)] sm:h-36 sm:w-36" />
              <div className="mx-auto mt-6 flex w-full max-w-[228px] rounded-full bg-[var(--bg2)] p-1.5 shadow-[inset_0_2px_10px_rgba(15,23,42,0.05)] sm:mt-8">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`flex-1 rounded-full px-3 py-2.5 text-[0.92rem] font-700 transition-all sm:px-4 sm:py-3 sm:text-[1rem] ${
                    theme !== 'dark'
                      ? 'bg-white text-[#111111] shadow-[0_8px_20px_rgba(15,23,42,0.08)]'
                      : 'text-[var(--text3)]'
                  }`}
                >
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`flex-1 rounded-full px-3 py-2.5 text-[0.92rem] font-700 transition-all sm:px-4 sm:py-3 sm:text-[1rem] ${
                    theme === 'dark'
                      ? 'bg-white text-[#111111] shadow-[0_8px_20px_rgba(15,23,42,0.08)]'
                      : 'text-[var(--text3)]'
                  }`}
                >
                  Dark
                </button>
              </div>
            </Card>

            <section className="overflow-hidden rounded-[34px] bg-[#1DB954] p-6 text-white shadow-[0_24px_70px_rgba(29,185,84,0.24)] sm:p-7 md:p-8 lg:col-span-3 lg:row-span-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#1DB954] shadow-[0_14px_30px_rgba(15,23,42,0.08)] sm:h-20 sm:w-20">
                <SiSpotify className="text-[2rem] sm:text-[2.4rem]" />
              </div>
              <div className="mt-7 flex gap-2.5 sm:mt-10 sm:gap-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`h-3 w-3 rounded-full bg-white/90 sm:h-3.5 sm:w-3.5 ${
                      spotifyDisplay.isPlaying ? 'animate-[spotifyWave_0.95s_ease-in-out_infinite]' : ''
                    }`}
                    style={{
                      opacity: 1 - i * 0.12,
                      animationDelay: spotifyDisplay.isPlaying ? `${i * 120}ms` : undefined,
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 text-[0.94rem] text-white/72 sm:mt-5 sm:text-[1.02rem]">
                {spotifyDisplay.isPlaying ? 'Listening now on Spotify' : spotifyData?.title ? 'Offline. Last played' : 'Spotify not connected'}
              </div>
              <a
                href={spotifyDisplay.songUrl || 'https://open.spotify.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block max-w-[94%] break-words text-[12px] font-800 leading-[1.45] tracking-[-0.01em] transition-opacity hover:opacity-85"
              >
                {spotifyDisplay.title}
              </a>
              <div className="mt-3 max-w-[94%] break-words text-[12px] leading-[1.45] text-white/95 sm:mt-4">
                {spotifyDisplay.artist}
                {spotifyDisplay.album ? <span className="text-white/70"> · {spotifyDisplay.album}</span> : null}
              </div>
            </section>

            <Card className="lg:col-span-3 lg:row-span-4">
              <div className="relative h-full min-h-[400px] sm:min-h-[520px] lg:min-h-[660px]">
                <Image src="/pro.png" alt="Project preview" fill className="object-cover" />
                <Link
                  href="/projects"
                  className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/96 text-[1.35rem] text-[var(--text)] shadow-[0_12px_28px_rgba(15,23,42,0.1)] sm:bottom-6 sm:left-6 sm:h-14 sm:w-14 sm:text-[1.75rem]"
                >
                  {'\u2197'}
                </Link>
              </div>
            </Card>

            <Card className="overflow-hidden lg:col-span-6 lg:row-span-2">
              <div className="relative min-h-[300px] bg-[linear-gradient(135deg,#f2f4f7_0%,#e7ebf0_46%,#dde4ea_100%)] px-5 py-6 text-[var(--text)] md:px-10 md:py-9">
                <div className="absolute inset-0 opacity-[0.62]">
                  <Lottie animationData={bacAnimation} loop autoplay className="h-full w-full scale-[1.22]" />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,246,248,0.88)_0%,rgba(242,244,247,0.68)_48%,rgba(238,242,246,0.44)_100%)]" />
                <div className="pointer-events-none absolute left-5 top-4 h-5 w-5 rounded-full bg-[var(--gold)]/45 blur-[1px] sm:left-12 sm:top-5 sm:h-7 sm:w-7" />
                <div className="pointer-events-none absolute left-8 top-6 h-10 w-10 rounded-full border border-[var(--gold)]/38 sm:left-[4.35rem] sm:top-8 sm:h-14 sm:w-14" />

                <div className="relative z-10 flex min-h-[245px] flex-col justify-between">
                  <div className="max-w-[620px]">
                    <h2
                      className="max-w-[500px] text-[1.7rem] font-800 leading-[1.16] tracking-[-0.04em] text-[#0f77c3] sm:text-[2.1rem] md:text-[2.6rem]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      From Hello World to real-world impact! <span aria-hidden>🚀</span>
                    </h2>
                    <p className="mt-4 max-w-[510px] text-[0.9rem] leading-[1.75] text-[var(--text2)] sm:mt-6 sm:text-[0.96rem] md:text-[1rem]">
                      A brief overview of my personal background in relation to learning and development, as well as how I have valued the intersection of the two disciplines.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-end justify-between gap-3 sm:mt-8 sm:gap-4">
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/76 px-5 py-2.5 text-[0.9rem] font-700 text-[var(--text)] transition-all hover:border-[var(--gold)]/40 hover:bg-white/92 sm:px-6 sm:py-3 sm:text-[0.98rem]"
                    >
                      {'\u2197'} Read More
                    </Link>
                    <span className="text-[0.86rem] text-[var(--text3)] sm:text-[0.95rem]">July 16th 2018</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-3 lg:col-span-3 lg:row-span-2">
              <a
                href={activeSocial.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex min-h-[220px] items-center justify-center rounded-[28px] text-white sm:min-h-[260px]"
                style={{ background: activeSocial.color }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    setSocialIndex((current) => (current - 1 + socials.length) % socials.length)
                  }}
                  className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/18 text-[1.5rem] sm:left-6 sm:h-12 sm:w-12 sm:text-[2.1rem]"
                >
                  ‹
                </button>
                <SocialIcon className="text-[3.8rem] sm:text-[4.8rem]" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    setSocialIndex((current) => (current + 1) % socials.length)
                  }}
                  className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/18 text-[1.5rem] sm:right-6 sm:h-12 sm:w-12 sm:text-[2.1rem]"
                >
                  ›
                </button>
              </a>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12">
            <Card className="lg:col-span-6">
              <div className="relative h-[240px] sm:h-[315px]">
                <Image src="/lan.png" alt="Learning and project collage" fill className="object-cover" />
                <Link
                  href="/about"
                  className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/96 text-[1.35rem] text-[var(--text)] shadow-[0_12px_28px_rgba(15,23,42,0.1)] sm:bottom-6 sm:left-6 sm:h-14 sm:w-14 sm:text-[1.75rem]"
                >
                  {'>'}
                </Link>
              </div>
            </Card>

            <Card className="lg:col-span-6">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=buggavenkatamanikantasai@gmail.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Send an email to buggavenkatamanikantasai@gmail.com"
                className="relative block h-[260px] bg-white sm:h-[315px]"
              >
                <Image src="/connect.png" alt="Let's connect" fill className="object-cover" />
                <div className="absolute bottom-4 left-3 right-3 flex items-center gap-2 sm:bottom-5 sm:left-4 sm:right-4 sm:gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/96 text-[1.05rem] text-[var(--text)] shadow-[0_12px_28px_rgba(15,23,42,0.1)] sm:h-12 sm:w-12 sm:text-[1.25rem]">
                    {'\u2197'}
                  </span>
                  <div className="flex min-w-0 flex-1 items-center justify-between rounded-full bg-white/92 px-4 py-2.5 text-[0.82rem] text-[var(--text3)] shadow-[0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:px-6 sm:py-3 sm:text-[0.98rem]">
                    <span className="truncate">Contact: buggavenkatamanikantasai@gmail.com</span>
                    <span aria-hidden className="ml-3 text-[0.92rem] text-[var(--text)] sm:ml-4 sm:text-[1.05rem]">
                      {'\u25a1'}
                    </span>
                  </div>
                </div>
              </a>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
