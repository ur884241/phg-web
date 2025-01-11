/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      fontSize: {
        'tiny': '0.75rem',
        'xs': '0.85rem',
        'sm': '0.95rem'
      },
      colors: {
        'editor': {
          'bg': '#050505',
          'line': '#0F0F0F',
          'text': '#666666',
          'comment': '#333333',
          'selection': '#1A1A1A',
        }
      }
    },
  },
  plugins: [],
}
