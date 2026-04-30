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
        border: "oklch(91% 0.025 12)",
        input: "oklch(91% 0.025 12)",
        background: "oklch(98.5% 0.015 12)",
        foreground: "oklch(27.1% 0.105 12.094)",
        primary: "oklch(64.5% 0.246 16.439)",
        "primary-foreground": "oklch(98.5% 0.01 12)",
        muted: "oklch(96.5% 0.02 12)",
        "muted-foreground": "oklch(45.5% 0.188 13.697)",
        accent: "oklch(71.2% 0.194 13.428)",
        "accent-foreground": "oklch(27.1% 0.105 12.094)",
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      fontFamily: {
        sans: [
          '"Avenir Next"',
          '"Segoe UI"',
          '"Helvetica Neue"',
          '"Nimbus Sans"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
