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
        border: "hsl(210 16% 82%)",
        input: "hsl(210 16% 82%)",
        background: "hsl(210 33% 98%)",
        foreground: "hsl(222 47% 11%)",
        primary: "hsl(222 47% 11%)",
        "primary-foreground": "hsl(210 40% 98%)",
        muted: "hsl(210 40% 94%)",
        "muted-foreground": "hsl(215 16% 40%)",
        accent: "hsl(37 92% 50%)",
        "accent-foreground": "hsl(222 47% 11%)",
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

