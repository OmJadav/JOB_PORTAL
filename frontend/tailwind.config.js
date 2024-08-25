/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        deepNavy: {
          DEFAULT: '#1E3A8A', // Primary Color
          hover: '#1E40AF',   // Hover Color
        },
        gray: {
          700: '#334155',    // Text Color
          500: '#6B7280',    // Text Color
          400: '#9CA3AF',    // Darker Text Color
        },
        white: '#FFFFFF',    // Background and Text Color
        black: '#000000',    // Text Color
      },
    },
  },
  plugins: [],
}