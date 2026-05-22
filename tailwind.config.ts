import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exact brand tokens sampled from the MS Detailing logo.
        white: "#FFFFFF",
        black: "#000000",
        shine: {
          // Electric "shine blue" — the logo's S and DETAILING wordmark.
          DEFAULT: "#38B6FF",
          400: "#5FC4FF",
          600: "#1FA3F5",
          700: "#0E8BDB",
        },
        slate: {
          // Derived support tones for surfaces and muted text.
          surface: "#0E1318",
          card: "#141B22",
          muted: "#9AA7B2",
        },
      },
      fontFamily: {
        // Bound to the next/font CSS variable defined in app/layout.tsx.
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.2em",
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        shimmer: "shimmer 2.5s linear infinite",
      },
      backgroundImage: {
        "shine-grid":
          "linear-gradient(to right, rgba(56,182,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,182,255,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
