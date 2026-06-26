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
        "error": "#ba1a1a",
        "secondary-fixed-dim": "#90d3c3",
        "on-surface-variant": "#534436",
        "secondary-fixed": "#acf0df",
        "inverse-primary": "#ffb870",
        "surface-container-lowest": "#ffffff",
        "surface-bright": "#fbf9f4",
        "primary-container": "#f49b33",
        "inverse-on-surface": "#f2f1ec",
        "on-secondary-fixed": "#00201b",
        "secondary": "#24695c",
        "on-background": "#1b1c19",
        "tertiary-fixed-dim": "#b0d360",
        "surface-variant": "#e4e2dd",
        "on-primary": "#ffffff",
        "deep-forest": "#00322B",
        "on-secondary-fixed-variant": "#005045",
        "ethereal-white": "#FFFFFF",
        "tertiary-fixed": "#ccf078",
        "surface-dim": "#dbdad5",
        "temple-gold": "#D4AF37",
        "on-tertiary-fixed-variant": "#394d00",
        "on-error": "#ffffff",
        "saffron-glow": "#FFD27F",
        "outline-variant": "#d9c3b0",
        "surface-container-highest": "#e4e2dd",
        "surface-container-high": "#eae8e3",
        "on-secondary": "#ffffff",
        "primary-fixed": "#ffdcbe",
        "on-primary-container": "#633800",
        "surface": "#fbf9f4",
        "on-tertiary": "#ffffff",
        "outline": "#867463",
        "inverse-surface": "#30312e",
        "surface-container-low": "#f5f3ee",
        "on-error-container": "#93000a",
        "surface-tint": "#8a5000",
        "primary": "#8a5000",
        "on-secondary-container": "#2b6f62",
        "primary-fixed-dim": "#ffb870",
        "tertiary-container": "#9abb4b",
        "error-container": "#ffdad6",
        "on-primary-fixed-variant": "#693c00",
        "surface-container": "#f0eee9",
        "tertiary": "#4d6700",
        "on-tertiary-fixed": "#151f00",
        "on-surface": "#1b1c19",
        "on-primary-fixed": "#2c1600",
        "on-tertiary-container": "#354900",
        "background": "#fbf9f4",
        "secondary-container": "#acf0df"
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
        "display-lg": ["var(--font-playfair)", "serif"],
        "body-md": ["var(--font-jakarta)", "sans-serif"],
        "label-lg": ["var(--font-jakarta)", "sans-serif"],
        "display-lg-mobile": ["var(--font-playfair)", "serif"],
        "body-lg": ["var(--font-jakarta)", "sans-serif"],
        "caption": ["var(--font-jakarta)", "sans-serif"],
        "headline-sm": ["var(--font-playfair)", "serif"],
        "headline-md": ["var(--font-playfair)", "serif"]
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
