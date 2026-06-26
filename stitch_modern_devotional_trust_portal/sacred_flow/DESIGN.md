---
name: Sacred Flow
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#534436'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#867463'
  outline-variant: '#d9c3b0'
  surface-tint: '#8a5000'
  primary: '#8a5000'
  on-primary: '#ffffff'
  primary-container: '#f49b33'
  on-primary-container: '#633800'
  inverse-primary: '#ffb870'
  secondary: '#24695c'
  on-secondary: '#ffffff'
  secondary-container: '#acf0df'
  on-secondary-container: '#2b6f62'
  tertiary: '#4d6700'
  on-tertiary: '#ffffff'
  tertiary-container: '#9abb4b'
  on-tertiary-container: '#354900'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcbe'
  primary-fixed-dim: '#ffb870'
  on-primary-fixed: '#2c1600'
  on-primary-fixed-variant: '#693c00'
  secondary-fixed: '#acf0df'
  secondary-fixed-dim: '#90d3c3'
  on-secondary-fixed: '#00201b'
  on-secondary-fixed-variant: '#005045'
  tertiary-fixed: '#ccf078'
  tertiary-fixed-dim: '#b0d360'
  on-tertiary-fixed: '#151f00'
  on-tertiary-fixed-variant: '#394d00'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
  temple-gold: '#D4AF37'
  deep-forest: '#00322B'
  ethereal-white: '#FFFFFF'
  saffron-glow: '#FFD27F'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  section-gap-lg: 120px
  section-gap-md: 80px
---

## Brand & Style

The design system is rooted in the concept of "Divine Vitality." It balances the ancient, sacred traditions of Sanatana Dharma with a crisp, modern interactive experience. The visual language is compassionate and uplifting, designed to evoke a sense of serenity, trust, and professional excellence.

Drawing from a **Corporate / Modern** framework infused with **Glassmorphism** and **Tactile** accents, the system utilizes organic, flowing lines inspired by the lotus and traditional Indian motifs. It avoids the heaviness of traditional religious sites by employing generous white space, vibrant botanical greens, and radiant saffron highlights. 

Key brand pillars:
- **Sacred Precision:** Clean layouts that respect administrative transparency.
- **Organic Flow:** Smooth transitions and parallax elements that mimic the movement of water and life.
- **Compassionate Radiance:** Subtle glows and soft elevations that make the UI feel warm and welcoming.

## Colors

The palette is derived from the core elements of spiritual practice and nature. 

- **Primary (Saffron/Gold):** Represents the fire of knowledge and service. Used for primary CTAs and critical brand highlights.
- **Secondary (Temple Green):** A deep, stabilizing green that signifies growth and traditional roots. Used for headers, footers, and grounded surface areas.
- **Tertiary (Spring Leaf):** A vibrant, lighter green used for accents, icons, and subtle interactive states.
- **Neutral (Serene White):** A warm, off-white base that prevents the interface from feeling clinical, providing a "parchment-like" softness.

**Interaction States:**
- Hover states on buttons should transition from Saffron to a "Saffron Glow" (#FFD27F).
- Secondary elements use "Deep Forest" for high-contrast text and depth.

## Typography

This design system uses a sophisticated typographic pair to bridge the gap between tradition and modernity.

- **Headlines (Playfair Display):** A high-contrast serif that brings an editorial, literary, and timeless feel to the foundation's message. It should be used for all major section titles and hero statements.
- **Body & Labels (Plus Jakarta Sans):** A friendly, contemporary sans-serif with excellent legibility. Its open apertures and soft curves complement the organic brand style.

**Hierarchy Rules:**
- Use `display-lg` for campaign titles like "Dhara Divine Awards."
- Use `label-lg` with increased letter spacing for metadata like categories (e.g., "SPIRITUALISM") and small UI labels.
- Line heights are generous to ensure a "breathable" and calm reading experience.

## Layout & Spacing

The layout follows a **Fluid Grid** system within a max-width container to maintain focus. 

- **Grid:** A 12-column grid for desktop, 8-column for tablet, and 4-column for mobile.
- **Rhythm:** An 8px base unit drives all spacing. 
- **Sectioning:** Large vertical gaps (`section-gap-lg`) are essential to create a sense of "sacred space" and prevent the UI from feeling cluttered.
- **Margins:** Wider horizontal margins on desktop (48px) create a luxurious, focused content area.

**Adaptive Reflow:**
- On mobile, grids collapse to a single column, but cards retain a 16px horizontal margin to ensure the UI feels "airy."
- Parallax-ready sections should have a minimum height of 60vh to allow for effective background movement.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Ambient Shadows** that feel natural rather than digital.

- **Surface Levels:** 
  - Level 0: Serene White (#F9F7F2) background.
  - Level 1: Ethereal White (#FFFFFF) cards with ultra-soft, diffused shadows (Blur 30px, Opacity 4%, tinted with Secondary color).
- **Interactivity:** On hover, cards should lift slightly (translateY: -8px) and the shadow should become more pronounced (Opacity 8%).
- **Glassmorphism:** Use for the navigation bar and informational overlays. Apply a `backdrop-filter: blur(12px)` with a 70% opacity Ethereal White background. This maintains the "serene" feel while allowing background textures or photography to peek through.

## Shapes

The shape language is **Rounded**, reflecting the organic and compassionate nature of the foundation.

- **Base Radius:** 0.5rem (8px) for input fields and small components.
- **Card Radius:** 1.5rem (24px) for a soft, modern container feel.
- **Organic Accents:** Use "Lotus Masks" or flowing SVG dividers between sections to break the rigidity of horizontal lines.
- **CTAs:** Buttons should use a fully rounded (pill-shaped) style to encourage interaction and feel safe/approachable.

## Components

### Buttons
- **Primary:** Pill-shaped, Primary color background, white text. High contrast. Include a subtle inner glow on hover.
- **Secondary:** Transparent with a 2px Secondary color border. 
- **Interactive State:** Buttons should expand slightly (scale 1.05) on hover with a smooth 300ms transition.

### Cards
- **Modern Cards:** Large corner radius (24px), white background, soft ambient shadow. 
- **Image Treatment:** Images within cards should have a subtle zoom-in effect on hover.
- **Metadata Tags:** Small, pill-shaped chips using Tertiary color with 10% opacity and Deep Forest text.

### Inputs & Forms
- **Style:** Minimalist. Bottom-border only or very light outlines. 
- **Focus State:** The border transitions to Primary color with a soft saffron outer glow.

### Navigation
- **Header:** Sticky, glassmorphic blur. Logo on the left, high-contrast "Donate/Join" CTA on the right.
- **Hover Effects:** Nav links use a "growing underline" effect starting from the center, using the Primary color.

### Special Interactive Elements
- **Glowing Borders:** For featured awards or urgent news, use a slow-pulsing outer glow in Saffron.
- **Parallax:** Hero backgrounds and "Call to Action" sections (like "Join your hand with us") should use slow-scroll parallax to create depth.