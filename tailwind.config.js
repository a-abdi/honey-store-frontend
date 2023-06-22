// tailwind.config.js
module.exports = {
  content: [
    // Example content paths...
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    fontFamily: {
      'sans': ['iranyekan', 'Helvetica', 'Arial', 'sans-serif'],
    },
    minWidth: {
      '1/2': '50%',
      '20': '5rem',
      '36': '9rem',
      '68': '17rem',
      '100': '25rem',
      '144': '36rem',
      'lg': '32rem'
    },
    maxWidth: {
      '1/2': '50%',
      '8': '2rem',
      '20': '5rem',
      '68': '17rem',
      '100': '25rem',
      '144': '36rem',
      'lg': '32rem'
    },
    maxHeight: {
      '68': '17rem',
      'lg': '32rem'
    },
    extend: {
      spacing: {
        '68': '17rem',
        '76': '19rem',
        '100': '25rem',
        '128': '32rem',
        '132': '33rem',
        '144': '36rem',
      },
      height: {
        '11/12': '91%',
      },
      scale: {
        '300': '3',
      },
      fontSize: {
        vsl: '0.7rem',
        vs: '0.6rem',
      }
    },
  },

  plugins: [],
}