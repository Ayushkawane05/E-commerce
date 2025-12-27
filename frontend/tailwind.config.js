/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // You can name these whatever you like (e.g., 'primary', 'brand', 'olive')
        primary: '#ffffffff',   // Your dark olive color
        sub: '#cfcecb', // Your light beige/grey color
      },
    },
  },
  plugins: [],
}