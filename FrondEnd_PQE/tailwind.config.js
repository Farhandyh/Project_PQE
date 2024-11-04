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
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Menambahkan font Poppins
      },
      fontSize: {
        "10px": "10px",
        "13px": "13px",
        "16px": "16px",
        "17px": "17px",
        "18px": "18px",
        "20px": "20px",
        "64px": "64px",
        "88px": "88px",
        "96px": "96px",
      },
      boxShadow: {
        "custom-dark": "2px 4px 15px rgba(0, 0, 0, 0.50)", // sesuaikan ukuran dan intensitas sesuai keinginan
        "custom-header": "0px 1px 15px rgba(0, 0, 0, 0.50)", // sesuaikan ukuran dan intensitas sesuai keinginan
        "custom-text": "0 4px 20px rgba(0, 0, 0, 0.5)", // Sesuaikan nilai ini sesuai kebutuhan
      },
    },
  },
  plugins: [],
};
