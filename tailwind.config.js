/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '15%': {
            transform: 'translate(3px, 0)',
          },
          '70%': {
            transform: 'translate(-3px, 0)',
          },
          '100%': {
            transform: 'translate(0, 0)',
          },
        },
      },
      animation: {
        shake: 'shake 180ms 2 linear',
      },
      backgroundImage: {
        'bgimage': "url('/img/bg.jpg')",
      }
    }
  }
};