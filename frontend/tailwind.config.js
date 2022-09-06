/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  // tailwindcss + antd config
  corePlugins: {
    preflight: false,
  },
}
