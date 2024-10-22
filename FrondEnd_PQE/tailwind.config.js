/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: {
          E01414: "#E01414", // Warna kustom
          CF0920: "#CF0920",
        },
      },
    },
  },
  plugins: [],
};
