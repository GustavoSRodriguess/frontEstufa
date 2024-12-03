/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        temperature: {
          cold: "#3b82f6",
          ideal: "#22c55e",
          hot: "#ef4444",
        },
      },
    },
  },
  plugins: [],
}