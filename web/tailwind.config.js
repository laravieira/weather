/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#049DD9',
          900: '#0511F2'
        },
        yellow: '#F2B705',
        white: '#F2F2F2',
        black: '#0D0D0D'
      },
      backgroundImage: {
        desktop: 'url(https://picsum.photos/1280/720?grayscale)',
        mobile: 'url(https://picsum.photos/360/800?grayscale)'
      }
    },
  },
  plugins: [],
}
