/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.{html,jsx}", "./*.{html,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
