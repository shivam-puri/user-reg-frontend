/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        foreground: "rgba(var(--foreground))",
        secondary: "rgba(var(--secondary))",
        primary: "rgba(var(--primary))",
        input: "rgba(var(--input))",
        link: "rgba(var(--link))",
        bd: "rgba(var(--border))"
      },
      borderRadius: {
        'custom': '50px',
      },
      boxShadow: {
        'custom': '0px 8px 40px rgba(0,0,0,0.3)'
      },
      fontSize: {
        xs: '12px',
        '4xl': '60px',
        '3xl': '40px'
      },
      fontFamily: {
        dynapuff: ['"Borel"', 'cursive'],
        outfit: ['Outfit']
      }
    },
  },
  plugins: [],
}

