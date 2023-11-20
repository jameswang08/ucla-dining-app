/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,jsx}', './index.html'],
  theme: {
    extend: {},
    colors: {
      'dark-yellow': '#fcd34d',
      'black': '#020617',
      'white': '#fafafa',
      'light-yellow': '#fde68a'
    }
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    base:false
  },
}

