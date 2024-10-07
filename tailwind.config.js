/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F2F5FF", // Màu nền (xanh nhạt pha trắng)
        primary: "#A3C4F3", // Màu chính (xanh nhạt dịu)
        secondary: "#C6D8F2", // Màu phụ (xanh nhạt hơn)
        button: "#8EACCD", // Màu nút (xanh pha xám)
        text: "#4A4A4A", // Màu chữ (xám đậm)
        accent: "#F4C7AB", // Màu nhấn (cam nhạt)
        border: "#DADADA", // Màu viền (xám nhạt)
      },
    },
  },
  plugins: [],
}

