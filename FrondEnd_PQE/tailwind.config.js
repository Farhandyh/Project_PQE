/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        66: "17.0rem",
        67: "17.50rem",
        68: "18.0rem",
        85: "21.25rem",
        93: "23.25rem", // h-93 = 23.25rem (372px)
        94: "23.5rem", // h-94 = 23.5rem (376px)
      },
      width: {
        "full-5": "calc(100% - 5rem)", // Full width dikurangi 5rem (80px)
        "full-4": "calc(100% - 4rem)", // Full width dikurangi 4rem (80px)
        "full-3": "calc(100% - 3rem)", // Full width dikurangi 3rem (80px)
        "full-2": "calc(100% - 2rem)", // Full width dikurangi 2rem (80px)
        "full-1": "calc(100% - 1rem)", // Full width dikurangi 1rem (80px)
      },
      colors: {
        red: {
          E01414: "#E01414", // Warna kustom
          CF0920: "#CF0920",
        },
        gray: { EDD7D7: "#EDD7D7" },
        container: "hsl(0, 0%, 100%)",
        containerCapsul: "hsl(0, 40%, 87%)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Menambahkan font Poppins
        rubik: ["Rubik", "sans-serif"], // Menambahkan font Rubik
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
        biggest: "1.7rem",
        normal: "0.938rem",
        smaller: "0.75rem",
        "biggest-md": "2.75rem",
        "normal-md": "1rem",
        "smaller-md": "0.813rem",
      },
      boxShadow: {
        "custom-dark": "2px 4px 15px rgba(0, 0, 0, 0.50)", // sesuaikan ukuran dan intensitas sesuai keinginan
        "custom-header": "0px 1px 15px rgba(0, 0, 0, 0.50)", // sesuaikan ukuran dan intensitas sesuai keinginan
        "custom-text": "0 4px 20px rgba(0, 0, 0, 0.5)", // Sesuaikan nilai ini sesuai kebutuhan
        "custom-3D": "0 4px 20px rgba(0, 0, 0, 0.5)", // Sesuaikan nilai ini sesuai kebutuhan
        "battery-inner":
          "inset 20px 0 48px hsl(0, 100%, 20%), inset -4px 12px 48px hsl(0, 100%, 45%)",
        liquid:
          "inset -10px 0 12px rgba(0,0,0,0.1), inset 12px 0 12px rgba(0,0,0,0.15)",
      },
      backgroundImage: {
        "gradient-red":
          "linear-gradient(90deg, hsl(7, 89%, 46%) 15%, hsl(11, 93%, 68%) 100%)",
        "gradient-orange":
          "linear-gradient(90deg, hsl(22, 89%, 46%) 15%, hsl(54, 90%, 45%) 100%)",
        "gradient-yellow":
          "linear-gradient(90deg, hsl(54, 89%, 46%) 15%, hsl(92, 90%, 45%) 100%)",
        "gradient-green":
          "linear-gradient(90deg, hsl(92, 89%, 46%) 15%, hsl(92, 90%, 68%) 100%)",
      },
      keyframes: {
        charging: {
          "0%": { textShadow: "none" },
          "100%": { textShadow: "0 0 6px hsl(92, 90%, 68%)" },
        },
        "low-battery": {
          "0%": { textShadow: "none" },
          "100%": { textShadow: "0 0 8px hsl(7, 89%, 46%)" },
        },
      },
      animation: {
        charging: "charging 1.2s infinite alternate",
        "low-battery": "low-battery 1.2s infinite alternate",
      },
      screens: {
        "custom-portrait": {
          raw: "(max-width: 810px) and (orientation: portrait)",
        },
        "custom-landscape": {
          raw: "(max-width: 1080px) and (orientation: landscape)",
        },
        "custom-lg": { raw: "(max-width: 1080px) and (min-width: 810px)" }, // Resolusi 1080x810
        "custom-lg-potrait": {
          raw: "(max-width: 810px) and (min-width: 1080px)",
        }, // Resolusi 1080x810
      },
    },
  },
  plugins: [],
};
