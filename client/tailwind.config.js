/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          bg: '#12131a',
          card: '#1e1f26',
          surface: '#282a31',
          hover: '#33343c',
          border: '#464554',
          subtle: '#908fa0',
          text: '#e2e1eb',
          heading: '#ffffff'
        },
        indigo: {
          primary: '#6366f1',
          accent: '#8083ff',
          light: '#c0c1ff',
          dim: '#2f2ebe'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Geist', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.35)'
      }
    },
  },
  plugins: [],
}
