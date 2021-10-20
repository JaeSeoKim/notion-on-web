module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,jsx,ts,tsx,scss}",
    "./components/**/*.{js,jsx,ts,tsx,scss}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
