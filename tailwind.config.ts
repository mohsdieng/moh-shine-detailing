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
        // Deep navy — used for cinematic section backgrounds and hero gradient.
        // Sits between pure black and the slate surface for layered depth.
        navy: {
          950: "#04070C",
          900: "#070C14",
          800: "#0B121C",
          700: "#101A26",
        },
        // Metallic / chrome tones from the "MOH'S" logo lettering — used for
        // thin accent lines, eyebrow text and luxury button borders.
        chrome: {
          DEFAULT: "#C9D2DA",
          light: "#E8ECF0",
          dark: "#6E7A85",
          line: "rgba(201, 210, 218, 0.15)",
        },
      },
      fontFamily: {
        // Bound to the next/font CSS variable defined in app/layout.tsx.
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.32em",
        tightest: "-0.04em",
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
        // Soft expanding ring used on the service-area map pins.
        "pulse-ring": {
          "0%": { transform: "scale(0.6)", opacity: "0.9" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        // Slow vertical float for hero decorative orbs.
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        float: "float 6s ease-in-out infinite",
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
