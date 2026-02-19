
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#3B82F6',
        'brand-green': '#22C55E',
        'brand-orange': '#F97316',
        'brand-yellow': '#EAB308',
        'dark-bg': '#0F172A',
        'dark-card': '#1E293B',
        'dark-text': '#E2E8F0',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;