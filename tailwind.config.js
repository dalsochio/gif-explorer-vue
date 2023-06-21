/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
      },
    },
    fontFamily: {
      hanken: ['Hanken Grotesk', 'sans-serif']
    },
  },

  plugins: [],
};
