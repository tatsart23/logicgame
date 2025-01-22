/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Sisältö, jota Tailwind käyttää
  theme: {
    extend: {
      fontFamily: {
        lobster: ["Lobster", "serif"], // Mukautettu fontti "Lobster"
      },
      keyframes: {
        // Mukautetut keyframes
        "border-spin": {
          "100%": {
            transform: "rotate(-360deg)", // Animaatio pyörittämiseen
          },
        },
      },
      animation: {
        // Mukautetut animaatiot
        "border-spin": "border-spin 7s linear infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-motion"), // Lisää liike- ja animaatiotuki
  ],
};
