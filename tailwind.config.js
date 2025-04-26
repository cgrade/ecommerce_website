/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#333333',
        secondary: '#ffffff',
        accent: '#777777',
        background: {
          light: '#ffffff',
          dark: '#333333',
        },
        text: {
          primary: '#333333',
          secondary: '#ffffff',
          muted: '#777777',
        },
      },
    },
  },
  plugins: [],
} 