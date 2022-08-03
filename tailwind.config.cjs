/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      first: colors.blue,
      second: colors.red,
      third: colors.gray,
      fourth: colors.emerald,
    },
    fontSize: {
      tiny: '.5rem',
      xs: '.625rem'
    }
  
  },
  plugins: [],
}
