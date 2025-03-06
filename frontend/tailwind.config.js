/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "synthwave",
      "retro",
      "cyberpunk",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "luxury",
      "business",
      "garden",
      "sunset",
      "wireframe",
      "coffee"
    ]
  }
}