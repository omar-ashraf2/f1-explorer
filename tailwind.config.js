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
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "fade-out": "fadeOut 0.3s ease-in",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        fadeOut: {
          "0%": { opacity: 1, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(0.95)" },
        },
      },
    },
  },
  plugins: [],
};
