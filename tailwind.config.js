/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica-neue', 'sans-serif'],
      },
      fontSize: {
        xs: ['10px', '15px'],
        sm: ['12px', '18px'],
        icon: ['13px', '19px'],
        base: ['14px', '20px'],
        mid: ['18px', '25px'],
        large: ['24px', '36px'],

      },
      colors: {
        'light-gray': '#F8F9FA',
        'lighter-gray': '#A0AEC0',
        'dark-black': '#151928e0',
        'light-black': '#31386029',
      },
      dropShadow: {
        '3xl': '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
      },
      width: {
        '7.5': '29px',
        '70': '212px',
      },
      height: {
        '7.5': '29px',
        '30': '53px',

      },
    },
  },
  plugins: [

  ],
}

