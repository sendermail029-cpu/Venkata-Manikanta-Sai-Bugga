import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--bg)] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[var(--gold-dim)] blur-[100px] pointer-events-none" />

      <div className="text-center relative z-10 px-8">
        <div
          className="text-[10rem] font-900 text-[var(--gold)] leading-none opacity-10 select-none mb-0"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          404
        </div>

        <div
          className="text-[2rem] font-800 text-[var(--text)] leading-tight mb-4 -mt-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Page not found.
        </div>

        <p className="text-[var(--text2)] text-sm font-light mb-10 max-w-[360px] mx-auto leading-relaxed">
          Looks like this page took a detour. Let's get you back somewhere meaningful.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-gold">
            Back Home →
          </Link>
          <Link href="/projects" className="btn-outline">
            View Work
          </Link>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-[var(--text3)] italic">
          <span className="gold-dot" />
          Still in Austin, though.
        </div>
      </div>
    </main>
  )
}
