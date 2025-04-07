/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#000", 
        secondary: "#FFF", 
        accent: "#F9FAFB", 
        background: "#F9FAFB",
        border: "#E5E7EB", 
        text: "#111827",
      },
    },
  },
  plugins: [],
}