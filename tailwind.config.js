module.exports = {
  theme: {
    darkSelector: '.dark-mode'
  },
  purge: [],
  darkMode: 'media', // or 'media' or 'class'
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-dark-mode')()
  ],
}
