# ✦ Premium Portfolio — Next.js 14 + Tailwind CSS

A cinematic, ultra-premium personal portfolio built with Next.js 14 App Router, Tailwind CSS, Framer Motion, React Three Fiber, and Lenis smooth scrolling.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Spotify credentials

# 3. Run development server
npm run dev

# 4. Open http://localhost:3000
```

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx              # Root layout (theme, lenis, cursor, nav)
│   ├── page.tsx                # Home page (all sections composed)
│   ├── globals.css             # Full design system CSS variables
│   ├── not-found.tsx           # Premium 404 page
│   ├── contact/
│   │   └── page.tsx            # Contact form page
│   ├── projects/
│   │   ├── page.tsx            # All projects listing
│   │   └── [slug]/
│   │       ├── page.tsx        # Dynamic project page (SSG)
│   │       └── ProjectDetailClient.tsx  # Animated case study
│   └── api/
│       └── spotify/
│           └── route.ts        # Spotify API (currently playing + fallback)
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx             # Sticky nav with theme toggle
│   │   └── Footer.tsx          # Minimal footer
│   ├── sections/
│   │   ├── HeroSection.tsx     # Cinematic hero + particle canvas
│   │   ├── AboutSection.tsx    # Split layout bio + metrics
│   │   ├── SkillsSection.tsx   # 8-card grid + tech ticker
│   │   ├── ProjectsSection.tsx # Featured + 3 secondary cards
│   │   ├── JourneySection.tsx  # Animated timeline
│   │   ├── SpotifySection.tsx  # Live Spotify widget
│   │   ├── PlaygroundSection.tsx # 4 interactive canvas experiments
│   │   └── ContactSection.tsx  # Final CTA
│   ├── three/
│   │   └── HeroOrb3D.tsx       # React Three Fiber metallic orb
│   └── ui/
│       ├── CursorGlow.tsx      # Magnetic custom cursor
│       ├── LoaderScreen.tsx    # Cinematic entrance loader
│       ├── NoiseOverlay.tsx    # Film grain overlay
│       ├── PageTransition.tsx  # AnimatePresence route transitions
│       ├── ScrollProgressBar.tsx # Gold top progress bar
│       ├── MagneticButton.tsx  # Magnetic hover button
│       ├── GlassCard.tsx       # Reusable glass surface
│       ├── AnimatedHeading.tsx # Word-by-word stagger reveal
│       ├── RevealText.tsx      # Blur-up paragraph reveal
│       ├── SectionDivider.tsx  # Animated gold line
│       └── FloatingBadge.tsx   # "Available" badge
│
├── providers/
│   ├── ThemeProvider.tsx       # next-themes dark/light
│   └── LenisProvider.tsx       # Smooth scroll context
│
├── hooks/
│   ├── useReveal.ts            # IntersectionObserver reveal
│   ├── useTilt.ts              # 3D mouse tilt effect
│   ├── useParallax.ts          # Scroll-driven parallax
│   ├── useMagneticEffect.ts    # Magnetic button effect
│   └── useScrollProgress.ts    # Page scroll 0-1
│
├── lib/
│   ├── motion.ts               # All Framer Motion variants
│   └── utils.ts                # cn(), clamp(), mapRange()
│
├── data/
│   └── index.ts                # YOUR CONTENT — edit this file
│
├── tailwind.config.ts          # Full design system tokens
├── next.config.js
├── tsconfig.json
└── .env.local.example
```

---

## 🎨 Design System

### Colors
| Token | Dark | Light |
|-------|------|-------|
| `--bg` | `#0A0A0A` | `#F8F6F1` |
| `--bg2` | `#111111` | `#F1EEE8` |
| `--surface` | `#1A1A1A` | `#FFFFFF` |
| `--gold` | `#C6A972` | `#B9925A` |
| `--text` | `#FFFFFF` | `#161616` |
| `--text2` | `#A1A1AA` | `#5F5F5F` |

### Typography
- **Display/Headlines:** Cabinet Grotesk (900 weight)
- **Serif accent:** Playfair Display (italic)
- **Body:** DM Sans (300–500 weight)

### Motion Easing
```ts
cubic-bezier(0.22, 1, 0.36, 1)  // --ease-premium
cubic-bezier(0.34, 1.56, 0.64, 1) // --ease-spring
```

---

## 🎵 Spotify Setup

1. Create app at [developer.spotify.com](https://developer.spotify.com/dashboard)
2. Add `http://localhost:3000/callback` as redirect URI
3. Authorize and get your refresh token (see comments in `/app/api/spotify/route.ts`)
4. Add to `.env.local`:
```env
SPOTIFY_CLIENT_ID=xxx
SPOTIFY_CLIENT_SECRET=xxx
SPOTIFY_REFRESH_TOKEN=xxx
```

---

## ✏️ Customizing Your Content

**All your content lives in `/data/index.ts`:**

```ts
// Personal info, bio, social links
export const personal = { ... }

// 8 skill cards with icons, descriptions, tools, proficiency
export const skills = [ ... ]

// Projects with case study content
export const projects = [ ... ]

// Work experience + education
export const experience = [ ... ]
```

---

## 🚢 Deploying to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
```

Or connect your GitHub repo to Vercel for auto-deploys.

---

## 📸 Adding Your Photo

In `AboutSection.tsx`, replace the placeholder with:
```tsx
import Image from 'next/image'

// Replace the placeholder div with:
<Image
  src="/your-photo.jpg"
  alt="Your Name"
  fill
  className="object-cover object-top"
  priority
/>
```
Place your photo in `/public/your-photo.jpg`.

---

## 🎯 Replacing Resume

Place your `resume.pdf` in `/public/resume.pdf`.
The download button in ContactSection already points to `/resume.pdf`.

---

## 🔧 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 14 | Framework (App Router, SSG, API routes) |
| TypeScript | Type safety |
| Tailwind CSS | Utility styling + design tokens |
| Framer Motion | All animations + page transitions |
| React Three Fiber | 3D hero orb scene |
| @react-three/drei | Three.js helpers |
| Lenis | Premium smooth scrolling |
| next-themes | Dark/light theme management |
| react-intersection-observer | Scroll reveal triggers |
| Zustand | (Available if global state needed) |

---

Built with obsession. Designed for impact. ✦
