/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Archivo", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "fade-out": "fadeOut 0.3s ease-in",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0.7, transform: "scale(0.95)" },
          "50%": { opacity: 0.9, transform: "scale(1.05)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        fadeOut: {
          "0%": { opacity: 1, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(0.95)" },
        },
      },
      colors: {
        primary: {
          light: "#FF1801",
          dark: "#E53E3E",
        },
        background: {
          light: "#FFFFFF",
          dark: "#1D1D1F",
        },
        secondary: {
          light: "#E5E5E5",
          dark: "#2B2B2F",
        },
        accent: {
          light: "#F1F1F1",
          dark: "#444448",
        },
        text: {
          light: "#212121",
          dark: "#FFFFFF",
        },
        muted: {
          light: "#757575",
          dark: "#A5A5A5",
        },
        success: "#28A745",
        error: "#D32F2F",
        warning: "#FFCC01",
        link: {
          light: "#0078FF",
          dark: "#5EAFFF",
        },
      },
    },
  },
  plugins: [],
};
