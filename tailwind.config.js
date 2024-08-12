/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'utama': '#0055bb',
        'text_utama': '#333333',
        'putih': '#f2f2f2',
        'cream': '#FEE9DE',
        'kuning': '#F2C94C',
      },
      fontFamily: {
        utama: ['Rubik'],
        hero: ['Lobster Two'],
        poppins: ['Poppins'],
      },
    },
  },
  plugins: [],
  }
  