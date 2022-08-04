/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  theme: {
    extend: {
      fontFamily: {
        default: [ 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', 'Geneva', 'Verdana', 'sans-serif'],
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      slate: colors.slate,
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
