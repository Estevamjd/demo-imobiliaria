import type { Config } from "tailwindcss";

// Tokens from DESIGN-SYSTEM.md §2/§8. Only these colors exist: Tailwind's default
// palette is replaced (not extended) so `blue-*`, `green-*` etc. cannot be used.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.ts"],
  safelist: ["st-novo", "st-contatado", "st-qualificado", "st-proposta", "st-ganho", "st-perdido"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      paper: "#F7F4EE",
      surface: "#FFFFFF",
      sand: "#EDE7DC",
      board: "#ECE8E0",
      canvas: "#F3F0EA",
      chat: "#F6F3EC",
      line: { DEFAULT: "#E2DBCE", strong: "#D6CEBF" },
      ink: { DEFAULT: "#1C1A17", 2: "#4A453E", muted: "#6E675D" },
      pine: { DEFAULT: "#1F5E4A", 700: "#174A3A", 50: "#E3ECE6", onDark: "#9CC3B1" },
      graphite: { DEFAULT: "#22211F", 2: "#2C2B28", fg: "#F3EFE7", muted: "#A9A296" },
      stage: {
        novo: "#5A544B",
        "novo-bg": "#EFEBE4",
        cont: "#7A5C24",
        "cont-bg": "#F4EDDF",
        qual: "#1F5E4A",
        "qual-bg": "#E3ECE6",
        prop: "#9A4F2E",
        "prop-bg": "#F6E9E1",
        perd: "#7A3B3B",
        "perd-bg": "#F3E6E4",
      },
    },
    extend: {
      fontFamily: {
        serif: ["var(--font-instrument)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      borderRadius: { sm: "6px", md: "10px", lg: "16px" },
      boxShadow: {
        soft: "0 1px 0 rgba(28,26,23,.04),0 8px 24px -12px rgba(28,26,23,.12)",
        halo: "0 0 0 3px rgba(31,94,74,.12)",
      },
      transitionTimingFunction: { calm: "cubic-bezier(.2,.7,.2,1)" },
      maxWidth: { wrap: "1280px" },
    },
  },
  plugins: [],
};

export default config;
