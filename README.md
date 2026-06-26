# Dhara Foundations — Production Portal

A pixel-perfect, super-modern interactive production website built for **Dhara Foundations** (Trust / Non-Profit).

## ✨ Overview

This codebase accurately translates the complete 9-page Stitch mockup suite and `sacred_flow/DESIGN.md` design system spec into a production-grade **Next.js App Router** application. It layers in cutting-edge interactive web motion primitives (GSAP scrubbed parallax, Framer Motion viewport reveals, spring-physics custom cursor, smooth Lenis scrolling) while maintaining strict visual fidelity to the brand's aesthetic identity.

---

## 🎨 Design System & Tokens (`sacred_flow/DESIGN.md`)

The brand identity is built on the **"Modern Devotional & Trust"** design pillar:
- **Primary Color**: Deep Forest Green (`#00322b`) — Conveying solemnity, sacred trust, and stability.
- **Accent Color**: Saffron Glow (`#ffd27f`) — Symbolizing spiritual awakening, radiant warmth, and divine vitality.
- **Secondary / Earthy**: Sandstone & Warm Terracotta (`#8a5000`) — Grounding the foundation in heritage.
- **Typography**: Display & Headline Serif (`Outfit` / `Playfair Display`), Clean Body Sans (`Inter`).

All tokens are defined as CSS variables in `src/app/globals.css` and mapped into Tailwind utilities.

---

## 🚀 Technology Stack

- **Framework**: Next.js 16+ (App Router, React 19 Client/Server Components)
- **Styling**: Tailwind CSS v4 + Vanilla CSS Custom Properties
- **Motion Primitives**:
  - `lenis`: Smooth momentum scrolling across desktop & mobile.
  - `gsap`: High-performance scrub-based Parallax background headers.
  - `framer-motion`: Declarative viewport intersection entrance animations (`ScrollReveal`) & spring-physics cursor tracking.
- **Forms**: React Hook Form + Zod type-safe schema validation.
- **Icons**: Google Material Symbols Outlined + Lucide React.

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── globals.css         # Design system CSS variables & utility classes
│   ├── layout.tsx          # Root layout wrapping LenisProvider, CustomCursor, Header, Footer
│   ├── page.tsx            # Home Page (/)
│   ├── about/              # About Us Page (/about)
│   ├── vision-mission/     # Vision & Mission Page (/vision-mission)
│   ├── founder-message/    # Founder's Message Page (/founder-message)
│   ├── programs/           # Programs & Initiatives Page (/programs)
│   ├── events/             # Events & Activities Page (/events)
│   ├── news/               # News & Media Page (/news)
│   ├── gallery/            # Gallery Page (/gallery with Lightbox Modal)
│   ├── partnership/        # Corporate Partnerships Page (/partnership)
│   └── contact/            # Contact Us Page (/contact with Zod Form)
└── components/
    ├── layout/             # Header.tsx, Footer.tsx
    ├── motion/             # LenisProvider, CustomCursor, ScrollReveal, ParallaxBg
    └── ui/                 # ModernCard, PillButton, SectionDivider, LightboxModal
```

---

## 🤸 Motion & Interaction Primitives

1. **`LenisProvider.tsx`**: Wraps the document root to normalize scroll wheel physics with smooth damping (`lerp: 0.08`).
2. **`CustomCursor.tsx`**: Renders a floating spring-physics cursor dot that expands when hovering over interactive components (`a`, `button`, `.modern-card`). Dynamic cursor text labels (`data-cursor-label="VIEW"`) automatically appear on gallery cards.
3. **`ScrollReveal.tsx`**: Intersection Observer wrapper component utilizing Framer Motion variants (`fade-in-up`, stagger delays) with respect for accessibility (`prefers-reduced-motion`).
4. **`ParallaxBg.tsx`**: GSAP ScrollTrigger component that smoothly shifts background image offsets relative to window scroll progress.

---

## 🛠️ Getting Started & Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build Production Bundle
```bash
npm run build
npm run start
```

---

## ⚡ Performance & SEO

- All images use native lazy loading and remote domain optimization.
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) with proper `h1`-`h6` hierarchy.
- Zero layout shift during font hydration.
- CSS backdrop filters (`glass-card`, `glass-nav`) optimized with hardware acceleration.
