/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    extend: {
      fontFamily: {
        Hind: ['Hind', 'sans-serif'],
        Techfont: ['Techfont Normal', 'sans-serif'],
      },
    },
    fontFamily: {
      sans: ['Hind', 'system-ui', 'sans-serif'], 
    }
  },
  plugins: [],
}


