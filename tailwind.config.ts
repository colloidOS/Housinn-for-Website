import { Open_Sans } from "next/font/google";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
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
        "get-our-app":
          "linear-gradient(95.75deg, #094cb1 -12.7%, #1281e5 100%)",
      },
      colors: {
        primary: {
          DEFAULT: "#002A50",
          foreground: "hsl(var(--primary-foreground))",
        },
        "primary-1": "#CBE6FF",
        "primary-2": "#7EC2FF",
        "primary-3": "#4FA9FA",
        "primary-100": "#CBE6FF",
        "primary-main": "#002A50",
        secondary: {
          DEFAULT: "#0D66B7",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "#0b4f8e",
        },
        white: "#FFFFFF",
        "white-200": "#FBFBFB",
        "white-300": "#D9D9D9",
        gray: "#4E4E4E",
        background: "hsl(var(--background))",
        "background-2": "#F5F5F5",

        black: "#000000",
        "gray-100": "#131B22",
        "gray-200": "#E8E8E8",
        "gray-300": "#DDDDDD",
        "gray-400": "#92989B",
        "gray-500": "#909090",
        "gray-600": "#4E4E4E",
        "gray-700": "#1E1E1E",
        active: "#E5F3FF",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        sans: [' "Open Sans" ', "sans-serif"],
      },
      boxShadow: {
        "custom-shadow": "3px 3px 31px -9px rgba(0, 0, 0, 0.15)",
        "custom-property-shadow": "3px 3px 36px 2px #00000026",
        "custom-blue-shadow": "0px 4px 20px 0px rgba(18, 129, 229, 0.2)",
        "custom-negative-shadow": "0px 2px 20px 0px rgba(0, 0, 0, 0.5)",
        review: "3px 3px 31px -9px #00000040",
        "get-our-app": "2px -2px 41px -11px #00000040",
        "chart-shadow": "0px 0px 3.61px 0.61px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
