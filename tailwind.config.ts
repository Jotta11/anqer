import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        black: "var(--color-black)",
        "almost-black": "var(--color-almost-black)",
        "almost-black-2": "var(--color-almost-black-2)",
        "black-gray": "var(--color-black-gray)",
        "dark-gray": "var(--color-dark-gray)",
        gray: "var(--color-gray)",
        "light-gray": "var(--color-light-gray)",
        whitesmoke: "var(--color-whitesmoke)",
        white: "var(--color-white)",
        blue: "var(--color-blue)",
        "dark-blue": "var(--color-dark-blue)",
        red: "var(--color-red)",
        "red-secondary": "var(--color-red-secondary)",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      fontSize: {
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.15em", fontWeight: "500" }],
      },
      letterSpacing: {
        tight: "-0.02em",
        wide: "0.15em",
      },
      spacing: {
        "main-button-x": "var(--main-button-x)",
        "main-button-y": "var(--main-button-y)",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "power3-out": "cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
