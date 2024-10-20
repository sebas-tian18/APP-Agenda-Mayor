/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx}',
    './pages/**/*.{html,js,jsx}',
    './components/**/*.{html,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4CAF50',
        'secondary': '#45a049',
        'background': '#e8f5e9',
      }
    },
  },
  plugins: [],
}