/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '7.5': '1.875rem', // 30 px
        '9.5': '2.375erm', // 38 px
      },
    },
  },
  plugins: [],
}
