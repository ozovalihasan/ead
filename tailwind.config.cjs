/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')


const setVar = (str) => {

  return {
    50: `var(--${str}-50)`,
   100: `var(--${str}-100)`,
   200: `var(--${str}-200)`,
   300: `var(--${str}-300)`,
   400: `var(--${str}-400)`,
   500: `var(--${str}-500)`,
   600: `var(--${str}-600)`,
   700: `var(--${str}-700)`,
   800: `var(--${str}-800)`,
   900: `var(--${str}-900)`
  }
}

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
      first: setVar("first"),
      second: colors.green,
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
