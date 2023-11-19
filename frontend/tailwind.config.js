/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,jsx}","./src/*/*.{html,jsx}","./*.{html,jsx}"],
  theme: {
    extend: {},
    colors: {
      'dark-yellow': '#fcd34d',
      'black': '#020617',
      'white': '#fafafa',
<<<<<<< HEAD
      'light-yellow': '#fde68a',
      'medium-grey': '#3f3f46',
      'light-grey': '#71717a',
    }
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    base:false
  },
=======
      'light-yellow': '#fde68a'
    }
  },
  plugins: [
    require('@tailwindcss/typography'),require("daisyui")],

  daisyui: {
    base:false
  }
  
>>>>>>> a632d55 (home page without image yet implemented)
}

