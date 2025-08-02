// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        moveXYc1: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(14deg)' },
          '25%': { transform: 'translate(10px, -10px) rotate(12deg)' },
          '50%': { transform: 'translate(0, -10px) rotate(14deg)' },
          '75%': { transform: 'translate(-10px, -10px) rotate(12deg)' },
        },
        moveXYc2: {
          '0%, 100%': { transform: 'translate(10px, -10px) rotate(6deg)' },
          '25%': { transform: 'translate(0, 0) rotate(8deg)' },
          '50%': { transform: 'translate(-10px, -10px) rotate(6deg)' },
          '75%': { transform: 'translate(0, -10px) rotate(8deg)' },
        },
        moveXYc3: {
          '0%, 100%': { transform: 'translate(-10px, -10px) rotate(4deg)' },
          '25%': { transform: 'translate(0, -10px) rotate(2deg)' },
          '50%': { transform: 'translate(10px, -10px) rotate(2deg)' },
          '75%': { transform: 'translate(0, 0) rotate(4deg)' },
        },

        gradientMove: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
      },
      animation: {
        moveXYc1: 'moveXYc1 6s ease-in-out infinite',
        moveXYc2: 'moveXYc2 6s ease-in-out infinite',
        moveXYc3: 'moveXYc3 6s ease-in-out infinite',
        gradient: 'gradientMove 10s ease infinite',
      },



      backgroundSize: {
        '300%': '300% 300%',
      },

    },
  },
  plugins: [
  require('tailwind-scrollbar-hide'),
],
}
