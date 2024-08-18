import { Open_Sans } from "next/font/google";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#002A50",
        secondary: "#0D66B7",
        white: "#FFFFFF",
        gray: "#4E4E4E",
        background: "#EEF7FF",
        black: "#000000",
        "gray-100": "#131B22",
        "gray-500": "#909090",
      },
      fontFamily: {
        sans: [' "Open Sans" ', "sans-serif"],
      },
      boxShadow: {
        "custom-shadow": "3px 3px 31px -9px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
