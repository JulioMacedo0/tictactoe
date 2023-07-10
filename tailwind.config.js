/** @type {import('tailwindcss').Config} */
//import colors from "../../themes/colors";

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffc53c",
        lightPrimary: "#fbd376",
        secundary: "#fa2c5d",
        lightSecundary: "#f85577",
        gold: "#fcb345",
        background: "#fee4ea",
      },
    },
  },
  plugins: [],
};
