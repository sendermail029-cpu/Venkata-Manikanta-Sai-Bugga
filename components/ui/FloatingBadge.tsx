'use client'

interface Props {
  label?: string
  className?: string
}

export default function FloatingBadge({
  label = 'Available for work',
  className = '',
}: Props) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 border border-[var(--gold)]/30
                  bg-[var(--gold-dim)] backdrop-blur-sm ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
      <span
        className="text-[0.6rem] font-700 tracking-[0.15em] uppercase text-[var(--gold)]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {label}
      </span>
    </div>
  )
}
