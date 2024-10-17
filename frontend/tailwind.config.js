/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./presets/**/*.{js,vue,ts}",
  ],
  darkMode: ['class', '.app-dark'],
  theme: {
    extend: {
      options: {
        cssLayer: {
          name: 'primevue', //any name you want. will be referenced on app.css
          order: 'tailwind-base, primeui, tailwind-utilities'
        }
      },
      borderRadius: {
        DEFAULT: 'var(--p-content-border-radius)',
      },
    },
  },
  plugins: [require('tailwindcss-primeui')]
}

