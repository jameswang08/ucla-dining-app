/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.{html,jsx}", "./src/*/*.{html,jsx}", "./*.{html,jsx}"],
  theme: {
    extend: {},
    colors: {
      blue: "#2563eb",
      "dark-yellow": "#fcd34d",
      black: "#020617",
      white: "#fafafa",
      "light-yellow": "#fde68a",
      "medium-grey": "#3f3f46",
      "light-grey": "#71717a",
      gray: "#6b7280",
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    base: false,
  },
};

