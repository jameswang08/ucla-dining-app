/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.{html,jsx}", "./*.{html,jsx}"],
  theme: {
    extend: {},
    colors: {
      'dark-yellow': '#fcd34d',
      'black': '#020617',
      'white': '#fafafa',
      'light-yellow': '#fde68a'
    }
  },
  plugins: [
    require('@tailwindcss/typography'),require("daisyui")],

  daisyui: {
    base:false
  }
  
}
