import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({ children, className, hover = true }: Props) {
  return (
    <div
      className={cn(
        'glass-card rounded-none',
        hover && 'hover:border-[var(--border-s)] hover:bg-[var(--glass-b)] transition-all duration-500',
        className
      )}
    >
      {children}
    </div>
  )
}
