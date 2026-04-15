import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: '#ff5c00',
        'orange-light': '#ff7a2b',
        black: '#0b0b0b',
        dark: '#141414',
        'gray-1': '#f4f4f2',
        'gray-2': '#e8e8e5',
        'gray-3': '#c8c8c4',
        'gray-4': '#888884',
        'gray-5': '#444440',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
