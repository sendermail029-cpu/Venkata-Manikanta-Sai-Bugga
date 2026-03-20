'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { personal } from '@/data'
import { fadeUp, staggerContainer } from '@/lib/motion'
import Footer from '@/components/layout/Footer'

export default function ContactPage() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Wire to your email service (Resend, Formspree, etc.)
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('sent')
  }

  return (
    <>
      <main className="pt-32 pb-24 min-h-screen bg-[var(--bg)]">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 max-w-[1100px]">

            {/* LEFT */}
            <motion.div
              ref={ref}
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <motion.div variants={fadeUp} className="section-eyebrow mb-5">
                Get in Touch
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="display-headline mb-8"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Let's make
                <br />
                something
                <br />
                <span className="serif-accent">great together.</span>
              </motion.h1>

              <motion.div variants={fadeUp} className="w-12 h-px bg-[var(--gold)] mb-8" />

              <motion.p variants={fadeUp} className="text-[var(--text2)] text-base leading-[1.8] font-light mb-10 max-w-[420px]">
                I'm currently open to <strong className="text-[var(--text)] font-medium">senior frontend roles</strong>, freelance projects, and creative collaborations.
                If you're building something ambitious, I'd love to hear about it.
              </motion.p>

              <motion.div variants={fadeUp} className="space-y-6">
                <div>
                  <div className="text-[0.6rem] font-700 tracking-[0.2em] uppercase text-[var(--gold)] mb-1"
                       style={{ fontFamily: 'var(--font-display)' }}>
                    Email
                  </div>
                  <a href={`mailto:${personal.email}`}
                     className="text-sm text-[var(--text2)] hover:text-[var(--gold)] transition-colors duration-300 nav-link-underline">
                    {personal.email}
                  </a>
                </div>

                <div>
                  <div className="text-[0.6rem] font-700 tracking-[0.2em] uppercase text-[var(--gold)] mb-1"
                       style={{ fontFamily: 'var(--font-display)' }}>
                    Location
                  </div>
                  <p className="text-sm text-[var(--text2)]">Austin, TX — open to remote worldwide</p>
                </div>

                <div>
                  <div className="text-[0.6rem] font-700 tracking-[0.2em] uppercase text-[var(--gold)] mb-3"
                       style={{ fontFamily: 'var(--font-display)' }}>
                    Socials
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(personal.social).map(([name, url]) => (
                      <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                         className="tag-chip hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-300 capitalize">
                        {name}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-10 pt-8 border-t border-[var(--border)]"
              >
                <div className="flex items-center gap-2 text-xs text-[var(--text3)] italic">
                  <span className="gold-dot" />
                  Often replying from The Patio — Austin, Texas.
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT — Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <div className="border border-[var(--border)] bg-[var(--surface)] p-8 xl:p-10 relative overflow-hidden">
                {/* Gold top border */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
                {/* Corner accents */}
                <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--gold)]" />
                <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--gold)]" />

                {status === 'sent' ? (
                  <div className="py-12 text-center">
                    <div className="text-4xl mb-4">✦</div>
                    <h3 className="text-xl font-800 text-[var(--text)] mb-2"
                        style={{ fontFamily: 'var(--font-display)' }}>
                      Message received.
                    </h3>
                    <p className="text-sm text-[var(--text2)]">
                      I'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-xl font-800 text-[var(--text)] mb-8 tracking-[-0.02em]"
                        style={{ fontFamily: 'var(--font-display)' }}>
                      Send a message
                    </h2>

                    {[
                      { id: 'name',    label: 'Your Name',    type: 'text',  placeholder: 'Jane Smith' },
                      { id: 'email',   label: 'Email Address', type: 'email', placeholder: 'jane@company.com' },
                    ].map(({ id, label, type, placeholder }) => (
                      <div key={id}>
                        <label className="block text-[0.65rem] font-700 tracking-[0.15em] uppercase text-[var(--gold)] mb-2"
                               style={{ fontFamily: 'var(--font-display)' }}>
                          {label}
                        </label>
                        <input
                          type={type}
                          id={id}
                          required
                          placeholder={placeholder}
                          value={form[id as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                          className="w-full bg-[var(--bg)] border border-[var(--border)] px-4 py-3 text-sm text-[var(--text)]
                                     placeholder:text-[var(--text3)] focus:outline-none focus:border-[var(--gold)]
                                     transition-colors duration-300"
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-[0.65rem] font-700 tracking-[0.15em] uppercase text-[var(--gold)] mb-2"
                             style={{ fontFamily: 'var(--font-display)' }}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        placeholder="Tell me about your project, role, or idea..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-[var(--bg)] border border-[var(--border)] px-4 py-3 text-sm text-[var(--text)]
                                   placeholder:text-[var(--text3)] focus:outline-none focus:border-[var(--gold)]
                                   transition-colors duration-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-gold w-full justify-center py-4 text-sm disabled:opacity-60"
                    >
                      {status === 'sending' ? 'Sending...' : 'Send Message →'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
