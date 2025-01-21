/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#F56565",
          dark: "#E53E3E",
        },
        background: {
          light: "#F7FAFC",
          dark: "#1A202C",
        },
        text: {
          light: "#2D3748",
          dark: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["Archivo", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
      },
      transitionProperty: {
        colors: "background-color, border-color, color, fill, stroke",
      },
    },
  },
  plugins: [],
};
