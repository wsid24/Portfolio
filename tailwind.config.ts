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
      fontFamily: {
        heading: ["Outfit", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        background: "var(--bg)",
        foreground: "var(--fg)",
        accent: "var(--accent)",
        "accent-warm": "var(--accent-warm)",
      },
      animation: {
        "ping-slow": "ping-slow 2s cubic-bezier(0,0,0.2,1) infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "float-up": "float-up 4s ease-in-out infinite",
        "scroll-bounce": "scroll-bounce 1.8s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "shimmer-slide": "shimmer-slide 6s linear infinite",
        "blob-drift-1": "blob-drift-1 24s ease-in-out infinite",
        "blob-drift-2": "blob-drift-2 30s ease-in-out infinite",
        "blob-drift-3": "blob-drift-3 20s ease-in-out infinite",
        "marquee-left": "marquee-left 40s linear infinite",
        "marquee-right": "marquee-right 40s linear infinite",
        "progress-fill": "progress-fill linear forwards",
        "blink": "blink 1s step-end infinite",
      },
      boxShadow: {
        "glow-accent": "0 0 20px var(--glow)",
        "glow-warm": "0 0 20px var(--glow-warm)",
        "card": "0 20px 60px -20px rgba(0,0,0,0.5)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
