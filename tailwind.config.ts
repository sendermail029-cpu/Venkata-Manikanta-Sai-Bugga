import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme
        'dark-bg':      '#0A0A0A',
        'dark-bg2':     '#111111',
        'dark-surface': '#1A1A1A',
        'dark-border':  '#2A2A2A',
        // Light theme
        'light-bg':      '#F8F6F1',
        'light-bg2':     '#F1EEE8',
        'light-surface': '#FFFFFF',
        'light-border':  '#E5E0D8',
        // Accent
        'gold':       '#C6A972',
        'gold-light': '#B9925A',
        'gold-pale':  '#E8D5A3',
        // Text
        'text-primary-dark':   '#FFFFFF',
        'text-secondary-dark': '#A1A1AA',
        'text-primary-light':  '#161616',
        'text-secondary-light':'#5F5F5F',
      },
      fontFamily: {
        display: ['var(--font-cabinet)', 'var(--font-satoshi)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        serif:   ['var(--font-playfair)', 'Georgia', 'serif'],
        mono:    ['var(--font-geist-mono)', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(4rem, 9vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-xl':  ['clamp(3rem, 7vw, 7rem)',  { lineHeight: '1.0',  letterSpacing: '-0.025em' }],
        'display-lg':  ['clamp(2.2rem, 5vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md':  ['clamp(1.8rem, 3.5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-sm':  ['clamp(1.4rem, 2.5vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      spacing: {
        'section':     '8rem',
        'section-sm':  '5rem',
        'container':   '3rem',
        'container-sm':'1.5rem',
      },
      borderRadius: {
        'xl':  '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'gold-sm':  '0 4px 20px rgba(198,169,114,0.15)',
        'gold-md':  '0 8px 40px rgba(198,169,114,0.25)',
        'gold-lg':  '0 16px 60px rgba(198,169,114,0.30)',
        'dark-sm':  '0 4px 20px rgba(0,0,0,0.4)',
        'dark-md':  '0 8px 40px rgba(0,0,0,0.6)',
        'dark-lg':  '0 20px 80px rgba(0,0,0,0.8)',
        'glass':    '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      backgroundImage: {
        'gold-gradient':    'linear-gradient(135deg, #C6A972 0%, #8B6914 100%)',
        'gold-gradient-r':  'linear-gradient(135deg, #E8D5A3 0%, #C6A972 50%, #8B6914 100%)',
        'dark-gradient':    'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
        'glass-gradient':   'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        'radial-gold':      'radial-gradient(ellipse at center, rgba(198,169,114,0.15) 0%, transparent 70%)',
        'radial-gold-sm':   'radial-gradient(ellipse at center, rgba(198,169,114,0.08) 0%, transparent 60%)',
        'noise':            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-14px) rotate(0.6deg)' },
          '66%':      { transform: 'translateY(-7px) rotate(-0.4deg)' },
        },
        'spin-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        'eq': {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%':      { transform: 'scaleY(1)' },
        },
        'marquee': {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'loader-bar': {
          '0%':   { width: '0%' },
          '100%': { width: '100%' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in':    'fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-in':   'scale-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'float':      'float 7s ease-in-out infinite',
        'spin-slow':  'spin-slow 12s linear infinite',
        'pulse-ring': 'pulse-ring 1.5s ease-out infinite',
        'eq':         'eq 0.7s ease-in-out infinite alternate',
        'marquee':    'marquee 25s linear infinite',
        'shimmer':    'shimmer 2.5s linear infinite',
      },
      transitionTimingFunction: {
        'premium':     'cubic-bezier(0.22, 1, 0.36, 1)',
        'spring':      'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth':      'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
      zIndex: {
        'loader':  '1000',
        'cursor':  '999',
        'nav':     '100',
        'modal':   '200',
        'overlay': '150',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}

export default config
