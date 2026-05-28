import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        night: {
          bg: "#06070b",
          surface: "rgba(255,255,255,0.04)",
          stroke: "rgba(255,255,255,0.08)",
          text: "#e7e9ee",
          muted: "#7a8090",
          accent: "#7dd3fc",
        },
        day: {
          bg: "#f4efe7",
          surface: "#ffffff",
          stroke: "rgba(20,18,15,0.08)",
          text: "#15130f",
          muted: "#6b6357",
          accent: "#d97757",
        },
      },
      borderRadius: {
        "2xl": "1.25rem",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fadeIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "shimmer": "shimmer 6s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
