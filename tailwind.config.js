/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'intenseBlue' : '#1267FC',
        'gray' : '#2F2F33',
        'darkGray'  : '#1E1E21',
        'bluishGray' : '#4C4C56',
      }
    },
  },
  plugins: [],
}