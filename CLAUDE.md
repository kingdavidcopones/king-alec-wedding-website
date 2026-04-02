# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `wedding-site/`:

```bash
npm run dev      # Start Vite dev server (http://localhost:5173 or next available port)
npm run build    # Production build to dist/
npm run preview  # Preview production build
npm run lint     # ESLint across all .js/.jsx files
```

No test suite is configured.

## Architecture

A single-page React app built with Vite. The page is a linear sequence of full-section components rendered in `App.jsx` — no routing.

**Section order** (matches page scroll order):
`Navbar → Hero → Countdown → LoveStory → WeddingDetails → DressCode → FAQs → Entourage → GiftRegistry → RSVP → Footer`

Each section lives in `src/components/<Name>.jsx` with a co-located `<Name>.css`. There is no shared component library — sections are self-contained.

**Design system** is defined entirely in `src/index.css` as CSS custom properties:
- Colors: `--color-orange` (primary), `--color-charcoal`, `--color-dirty-white`, plus accent colors (pink, blue, yellow, violet, green)
- Typography: `--font-body` (Neue Haas Grotesk), `--font-accent` (Belmonte Ballpoint cursive), `--font-accent-print`
- Type scale: `--text-xs` through `--text-3xl` — all fluid via `clamp()`
- Spacing: `--space-1` through `--space-16` — all fluid via `clamp()`
- Motion: `--ease-out-expo`, `--ease-in-out-sine`, `--dur-fast` through `--dur-slow`
- Layout: `--grid-margin` (section horizontal padding), `--nav-height: 64px`

**Global utility classes** (also in `index.css`): `.btn-primary`, `.btn-secondary`, `.section-container` (max-width 1440px, centered), `.section-label` (Belmonte Ballpoint Print, uppercase, blue, used as eyebrow labels above section headings).

**Fonts** are self-hosted under `public/fonts/` and loaded via `@font-face` in `index.css`. The hero logo SVG (`/the-king-and-alec-wedding.svg`) is served from `public/`.

**Animations** follow two patterns:
1. **Hero**: manual JS animation via inline styles in a `useEffect` (mirrors CSS tokens as JS constants at the top of `Hero.jsx`)
2. **All other sections**: `IntersectionObserver` adds `.is-visible` to the section element; CSS handles the transition

**RSVP** is a hardcoded guest list (array in `RSVP.jsx`) with a searchable combobox. Submission is currently client-side only — no backend integration yet.

**Wedding date**: April 10, 2027, 4:00 PM PHT. Countdown target is `new Date('2027-04-10T16:00:00+08:00')`.