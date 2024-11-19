/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        lightBackground: '#fafafa',
        darkBackground: '#161622',
        containerLightBackground: '#fefefe',
        containerDarkBackground: '#201f2f',
        primary: '#111111',
        secondary: '#1d1918',
        green: '#245501',
        red: '#cb310b',
        gray: {
          DEFAULT: '#212529',
          100: '#CDCDE0',
          200: '#343a40',
          300: '#495057',
        },
        custom: {
          DEFAULT: '#ffffff',
          100: '',
          200: '',
        },
      },

      fontFamily: {
        //Poppins
        pthin: ['Poppins-Thin', 'sans-serif'],
        pextralight: ['Poppins-ExtraLight', 'sans-serif'],
        plight: ['Poppins-Light', 'sans-serif'],
        pregular: ['Poppins-Regular', 'sans-serif'],
        pmedium: ['Poppins-Medium', 'sans-serif'],
        psemibold: ['Poppins-SemiBold', 'sans-serif'],
        pbold: ['Poppins-Bold', 'sans-serif'],
        pextrabold: ['Poppins-ExtraBold', 'sans-serif'],
        pblack: ['Poppins-Black', 'sans-serif'],

        //Roboto
        robotoBoldItalic: ['RobotoMono-BoldItalic', 'monospace'],
        robotoBold: ['RobotoMono-Bold', 'monospace'],
        robotoExtraLightItalic: ['RobotoMono-ExtraLightItalic', 'monospace'],
        robotoExtraLight: ['RobotoMono-ExtraLight', 'monospace'],
        robotoItalic: ['RobotoMono-Italic', 'monospace'],
        robotoItalicVariable: ['RobotoMono-ItalicVariable', 'monospace'],
        robotoLightItalic: ['RobotoMono-LightItalic', 'monospace'],
        robotoLight: ['RobotoMono-Light', 'monospace'],
        robotoMediumItalic: ['RobotoMono-MediumItalic', 'monospace'],
        robotoMedium: ['RobotoMono-Medium', 'monospace'],
        robotoRegular: ['RobotoMono-Regular', 'monospace'],
        robotoSemiBoldItalic: ['RobotoMono-SemiBoldItalic', 'monospace'],
        robotoSemiBold: ['RobotoMono-SemiBold', 'monospace'],
        robotoThinItalic: ['RobotoMono-ThinItalic', 'monospace'],
        robotoThin: ['RobotoMono-Thin', 'monospace'],
        robotoVariable: ['RobotoMono-Variable', 'monospace'],
      },
    },
  },
  plugins: [],
};
