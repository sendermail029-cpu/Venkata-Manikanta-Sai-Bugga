'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { certifications } from '@/data'

const featured = certifications.slice(0, 6)
const archive = certifications.slice(6)

function CertificationCard({
  title,
  issuer,
  date,
  category,
  href,
  index,
}: {
  title: string
  issuer: string
  date: string
  category: string
  href: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, rotateX: 5, rotateY: index % 2 === 0 ? -5 : 5 }}
      style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
      className="group relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,246,241,0.9))] p-7 text-[#161616] shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-70" />
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-60 blur-3xl"
        style={{ background: 'rgba(185,146,90,0.16)', transform: 'translateZ(30px)' }}
      />

      <div className="mb-10 flex items-start justify-between gap-4" style={{ transform: 'translateZ(24px)' }}>
        <div>
          <div
            className="mb-3 text-[0.62rem] font-800 uppercase tracking-[0.22em] text-[var(--gold)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {category}
          </div>
          <h3
            className="max-w-[18ch] text-[1.45rem] font-800 leading-[1.05] tracking-[-0.03em] text-[#161616]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h3>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/8 bg-white text-[0.72rem] font-800 tracking-[0.08em] text-[#161616]">
          VIEW
        </div>
      </div>

      <div
        className="flex items-end justify-between gap-4 border-t border-black/6 pt-5"
        style={{ transform: 'translateZ(18px)' }}
      >
        <div>
          <div className="text-sm font-medium text-[#5F5F5F]">{issuer}</div>
          <div className="mt-1 text-sm text-[#8A8A8A]">{date}</div>
        </div>

        <Link
          href={href}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#161616] px-4 py-2 text-[0.63rem] font-800 uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[var(--gold)] hover:text-black"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Open
        </Link>
      </div>
    </motion.div>
  )
}

export default function CertificationsSection() {
  return (
    <section className="section-pad border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="container-main">
        <div className="mb-14 max-w-[820px]">
          <div className="section-eyebrow mb-6">Certifications</div>
          <h2
            className="display-section mb-6 text-[var(--text)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Verified learning,
            <br />
            <span className="serif-accent">presented like proof.</span>
          </h2>
          <p className="max-w-[640px] text-base font-light leading-[1.9] text-[var(--text2)]">
            For a high-end portfolio, certifications work best as a dedicated proof section inside About.
            It keeps navigation clean while giving your cloud, AI, security, and programming depth a premium showcase.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {featured.map((item, index) => (
            <CertificationCard key={item.id} {...item} index={index} />
          ))}
        </div>

        <div className="mt-16 rounded-[2rem] border border-[var(--border)] bg-[var(--bg2)]/75 p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div
                className="mb-2 text-[0.62rem] font-800 uppercase tracking-[0.22em] text-[var(--gold)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Archive
              </div>
              <h3
                className="text-2xl font-800 tracking-[-0.02em] text-[var(--text)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Additional credentials
              </h3>
            </div>
            <div className="text-sm text-[var(--text3)]">Replace each `#` with your certificate URL.</div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {archive.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-[1.4rem] border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)]/40"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div
                    className="text-[0.6rem] font-800 uppercase tracking-[0.18em] text-[var(--gold)]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {String(index + 7).padStart(2, '0')}
                  </div>
                  <div className="text-[0.67rem] uppercase tracking-[0.16em] text-[var(--text3)]">
                    {item.category}
                  </div>
                </div>
                <h4
                  className="mb-2 text-lg font-800 leading-[1.15] text-[var(--text)]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {item.title}
                </h4>
                <div className="text-sm text-[var(--text2)]">{item.issuer}</div>
                <div className="mt-1 text-sm text-[var(--text3)]">{item.date}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
