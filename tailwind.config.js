/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Essential for that Web3 dark-mode aesthetic
  theme: {
    extend: {
      colors: {
        // Custom Stacks Brand Palette
        stacks: {
          purple: "#a855f7",
          indigo: "#818cf8",
          dark: "#030712",
          card: "rgba(17, 24, 39, 0.4)", // Perfect for glassmorphism
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'stacks-gradient': 'linear-gradient(to bottom right, #a855f7, #818cf8)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};
