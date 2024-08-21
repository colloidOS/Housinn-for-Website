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
        "primary-2": "#7EC2FF",
        secondary: "#0D66B7",
        white: "#FFFFFF",
        "white-200": "#FBFBFB",
        gray: "#4E4E4E",
        background: "#EEF7FF",
        "background-2": "#F5F5F5",
        black: "#000000",
        "gray-100": "#131B22",
        "gray-200": "#E8E8E8",
        "gray-300": "#DDDDDD",
        "gray-500": "#909090",
        "gray-600": "#4E4E4E",
        "gray-700": "#1E1E1E",
        active: "#E5F3FF",
      },
      fontFamily: {
        sans: [' "Open Sans" ', "sans-serif"],
      },
      boxShadow: {
        "custom-shadow": "3px 3px 31px -9px rgba(0, 0, 0, 0.15)",

        "custom-blue-shadow": "0px 4px 20px 0px rgba(18, 129, 229, 0.2)",
        "custom-negative-shadow": "0px 2px 20px 0px rgba(0, 0, 0, 0.5)",
        "custom-shadow-review": "3px 3px 31px -9px #00000040",
      },
    },
  },
  plugins: [],
};
export default config;
