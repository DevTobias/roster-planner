module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    colors: {
      neutral: {
        900: '#212134',
        800: '#32324D',
        700: '#4A4A6A',
        600: '#666687',
        500: '#8E8EA9',
        400: '#A5A5BA',
        300: '#C0C0CF',
        200: '#DCDCE4',
        150: '#EAEAEF',
        100: '#F6F6F9',
        0: '#FFFFFF',
      },
      primary: {
        700: '#5927E5',
        600: '#7A52EA',
        500: '#9B7DEF',
        200: '#BDA9F5',
        100: '#DED4FA',
      },
    },
    fontSize: {
      header1: ['60px', { lineHeight: '72px', letterSpacing: '0.01em' }],
      header1m: ['45px', { lineHeight: '56px', letterSpacing: '0.01em' }],

      header2: ['50px', { lineHeight: '64px', letterSpacing: '0.01em' }],
      header2m: ['31px', { lineHeight: '48px', letterSpacing: '0.01em' }],

      header3: ['40px', { lineHeight: '56px', letterSpacing: '0.01em' }],
      header3m: ['25px', { lineHeight: '40px', letterSpacing: '0.01em' }],

      header4: ['33px', { lineHeight: '40px', letterSpacing: '0.01em' }],
      header4m: ['21px', { lineHeight: '34px', letterSpacing: '0.01em' }],

      header5: ['24px', { lineHeight: '32px', letterSpacing: '0.01em' }],
      header5m: ['17px', { lineHeight: '32px', letterSpacing: '0.01em' }],

      body1: ['24px', { lineHeight: '38px', letterSpacing: '0.01em' }],
      body2: ['20px', { lineHeight: '34px', letterSpacing: '0.01em' }],
      body3: ['17px', { lineHeight: '28px', letterSpacing: '0.01em' }],
      body4: ['15px', { lineHeight: '24px', letterSpacing: '0.01em' }],
      body5: ['13px', { lineHeight: '22px', letterSpacing: '0.01em' }],
    },
    height: {
      screen: 'calc(var(--innerVh, 1vh) * 100)',
    },
    minHeight: {
      screen: 'calc(var(--innerVh, 1vh) * 100)',
    },
  },
  plugins: [],
};
