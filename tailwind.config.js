/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // main gold / saffron
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        saffron: {
          DEFAULT: '#FF6F00',
          50: '#fff3e0',
          100: '#ffe0b2',
          200: '#ffb74d',
          300: '#ffa726',
          400: '#ff9800',
          500: '#fb8c00',
          600: '#f57c00',
          700: '#ef6c00',
          800: '#e65100',
          900: '#bf360c',
        },
        devotional: {
          saffron: '#FF6F00',
          gold: '#FFD700',
          orange: '#FF8F00',
          maroon: '#800000',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
