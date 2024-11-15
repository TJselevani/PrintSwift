/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        light: {
          primary: "#ffffff", // Light background
          secondary: "#f0f0f0", // Light secondary color
          text: "#000000", // Light text color
          border: "#e5e5e5", // Light border color
          button: "#ff9c01", // Light button color
        },
        // Dark theme colors
        dark: {
          primary: "#111111", // Dark background
          secondary: "#1d1d1d", // Dark secondary color
          text: "#ffffff", // Dark text color
          border: "#343434", // Dark border color
          button: "#ff9c01", // Dark button color
        },
        // Additional colors (neutral, gray, etc.)
        gray: {
          DEFAULT: "#212529",
          100: "#CDCDE0",
          200: "#343a40",
          300: "#495057",
        },
        black: {
          DEFAULT: "#000000",
          100: "#1E1E2D",
          200: "#232533",
        },
        secondary: {
          DEFAULT: "#948c94",
          100: "#40473b",
          200: "#292524",
          300: "#5c545c",
        },
        maroon: "#8f080f",
        darkMaroon: "#350d0e",
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],

        //Roboto
        robotoBoldItalic: ["RobotoMono-BoldItalic", "monospace"],
        robotoBold: ["RobotoMono-Bold", "monospace"],
        robotoExtraLightItalic: ["RobotoMono-ExtraLightItalic", "monospace"],
        robotoExtraLight: ["RobotoMono-ExtraLight", "monospace"],
        robotoItalic: ["RobotoMono-Italic", "monospace"],
        robotoItalicVariable: ["RobotoMono-ItalicVariable", "monospace"],
        robotoLightItalic: ["RobotoMono-LightItalic", "monospace"],
        robotoLight: ["RobotoMono-Light", "monospace"],
        robotoMediumItalic: ["RobotoMono-MediumItalic", "monospace"],
        robotoMedium: ["RobotoMono-Medium", "monospace"],
        robotoRegular: ["RobotoMono-Regular", "monospace"],
        robotoSemiBoldItalic: ["RobotoMono-SemiBoldItalic", "monospace"],
        robotoSemiBold: ["RobotoMono-SemiBold", "monospace"],
        robotoThinItalic: ["RobotoMono-ThinItalic", "monospace"],
        robotoThin: ["RobotoMono-Thin", "monospace"],
        robotoVariable: ["RobotoMono-Variable", "monospace"],
      },
    },
  },
  plugins: [],
};
