/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#144A6C",
        disabled: "#e4c96b",
        secondary: "#FF7D7D",
        ebony_black: "#202020",
        neutral: "#6F6F6F",
        accent: "#8BCF9A",
        red: "#FF3B30",
      },
      boxShadow: {
        "card-shadow":
          "0px 2.33px 6.22px -0.78px #3232470D, 0px 0px 0.78px 0px #0C1A4B3D",
      },
      borderRadius: {
        "card-radius": "14px",
      },
      borderColor: {
        "card-border": "#E2E2E2",
      },
    },
  },
  plugins: [],
};