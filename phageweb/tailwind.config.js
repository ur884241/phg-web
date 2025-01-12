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
          'bg': '#030303',        // Almost black background
          'surface': '#040404',   // Slightly lighter for elements
          'line': '#070707',      // Very subtle lines
          'text': '#444444',      // Darker text for better contrast
          'highlight': '#222222', // Highlight color
          'active': '#333333'     // Active state color
        }
      },
      backgroundColor: {
        'overlay': 'rgba(3, 3, 3, 0.85)' // Very dark overlay
      }
    },
  },
  plugins: [],
}
