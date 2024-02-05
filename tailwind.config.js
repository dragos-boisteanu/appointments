/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
        screens: {
          '3xl': '2560px',
          '4xl': '3440px',
          '5xl': '5120px'
        },
    },
  },
  plugins: [],
};
