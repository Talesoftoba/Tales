
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#FF5C00",
        sand:   "#EDE5D8",
        card:   "#FFFFFF",
        ink:    "#111111",
        muted:  "#9A9A9A",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body:    ["var(--font-dm)",   "sans-serif"],
      },
      borderRadius: {
        card: "26px",
      },
      boxShadow: {
        card: "0 2px 4px rgba(0,0,0,0.04), 0 16px 56px rgba(0,0,0,0.13)",
      },
      keyframes: {
        nudge: {
          "0%,100%": { transform: "translateY(0)"  },
          "50%":     { transform: "translateY(6px)" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to:   { opacity: "1", transform: "translateY(0)"    },
        },
      },
      animation: {
        nudge: "nudge 2s ease-in-out infinite",
        rise:  "rise 0.45s ease forwards",
      },
    },
  },
  plugins: [
    ({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) => {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          "display": "none",
        },
      });
    },
  ],
};
export default config;