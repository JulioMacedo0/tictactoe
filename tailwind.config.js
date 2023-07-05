/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fed168",
        secundary: "#fa2c5d",
        gold: "#fcb345",
        background: "#fee4ea",
      },
    },
  },
  plugins: [],
};
