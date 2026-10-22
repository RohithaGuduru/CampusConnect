/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F5FE',
          100: '#ECECFD',
          200: '#DDDDFC',
          300: '#C2C1FA',
          400: '#9C98F6',
          500: '#6C63EE',
          600: '#3E32E8',
          700: '#2E25D2', // Deep purple/indigo from screenshot
          800: '#241DB3',
          900: '#1C1688',
        },
        lavender: {
          50: '#FAFAFF',
          100: '#F4F5FD',
          200: '#ECEEFB',
          300: '#E1E4F9',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
