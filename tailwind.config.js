/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"  // ← Thêm dòng này
  ],
  important: true,
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,  // Tắt để tương thích NG-ZORRO
  }
}
