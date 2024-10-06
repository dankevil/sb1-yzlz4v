/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        cyan: {
          400: '#22d3ee',
          300: '#67e8f9',
        },
        pink: {
          400: '#f472b6',
          300: '#f9a8d4',
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        'nunito-sans': ['Nunito Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}