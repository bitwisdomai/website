/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#00ecff',   // Cyan - main brand color
        'brand-secondary': '#0080fa', // Blue - secondary brand color
      },
    },
  },
  plugins: [],
}
