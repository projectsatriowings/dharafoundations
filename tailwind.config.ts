import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surface & Backgrounds
        "surface": "#fbf9f4",
        "surface-dim": "#dbdad5",
        "surface-bright": "#fbf9f4",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f3ee",
        "surface-container": "#f0eee9",
        "surface-container-high": "#eae8e3",
        "surface-container-highest": "#e4e2dd",
        "surface-variant": "#e4e2dd",
        "surface-tint": "#8a5000",
        "background": "#fbf9f4",
        "on-background": "#1b1c19",
        "on-surface": "#1b1c19",
        "on-surface-variant": "#534436",
        "inverse-surface": "#30312e",
        "inverse-on-surface": "#f2f1ec",
        "outline": "#867463",
        "outline-variant": "#d9c3b0",

        // Primary (Saffron/Gold)
        "primary": "#8a5000",
        "on-primary": "#ffffff",
        "primary-container": "#f49b33",
        "on-primary-container": "#633800",
        "inverse-primary": "#ffb870",
        "primary-fixed": "#ffdcbe",
        "primary-fixed-dim": "#ffb870",
        "on-primary-fixed": "#2c1600",
        "on-primary-fixed-variant": "#633800",

        // Secondary (Temple Green)
        "secondary": "#24695c",
        "on-secondary": "#ffffff",
        "secondary-container": "#acf0df",
        "on-secondary-container": "#2b6f62",
        "secondary-fixed": "#acf0df",
        "secondary-fixed-dim": "#90d3c3",
        "on-secondary-fixed": "#00201b",
        "on-secondary-fixed-variant": "#005045",

        // Tertiary (Spring Leaf)
        "tertiary": "#4d6700",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#9abb4b",
        "on-tertiary-container": "#354900",
        "tertiary-fixed": "#ccf078",
        "tertiary-fixed-dim": "#b0d360",
        "on-tertiary-fixed": "#151f00",
        "on-tertiary-fixed-variant": "#394d00",

        // Error
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",

        // Brand Accents
        "temple-gold": "#D4AF37",
        "deep-forest": "#00322B",
        "ethereal-white": "#FFFFFF",
        "saffron-glow": "#FFD27F",
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "card": "24px"
      },
      spacing: {
        "gutter": "24px",
        "margin-mobile": "16px",
        "container-max": "1280px",
        "margin-desktop": "48px",
        "section-gap-md": "80px",
        "unit": "8px",
        "section-gap-lg": "120px"
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        title: ["var(--font-title)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        "display-lg": ["var(--font-heading)", "serif"],
        "body-md": ["var(--font-body)", "sans-serif"],
        "label-lg": ["var(--font-title)", "sans-serif"],
        "display-lg-mobile": ["var(--font-heading)", "serif"],
        "body-lg": ["var(--font-body)", "sans-serif"],
        "caption": ["var(--font-title)", "sans-serif"],
        "headline-sm": ["var(--font-heading)", "serif"],
        "headline-md": ["var(--font-heading)", "serif"]
      },
      fontSize: {
        "display-lg": ["56px", { lineHeight: "64px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.05em", fontWeight: "600" }],
        "display-lg-mobile": ["36px", { lineHeight: "44px", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "caption": ["12px", { lineHeight: "16px", fontWeight: "500" }],
        "headline-sm": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "headline-md": ["32px", { lineHeight: "40px", fontWeight: "600" }]
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(36, 105, 92, 0.04)',
        'soft-hover': '0 20px 40px -10px rgba(36, 105, 92, 0.08)',
      }
    }
  }
};

export default config;
