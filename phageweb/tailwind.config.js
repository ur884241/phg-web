/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'tiny': '0.65rem',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontSize: {
        'tiny': '0.75rem',      // Increased from 0.65rem
        'xs': '0.85rem',        // Increased from 0.75rem
        'sm': '0.95rem'         // Increased from 0.85rem
      }
    }
  }
}


