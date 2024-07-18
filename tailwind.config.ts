import { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import tailwindcssAnimate from "tailwindcss-animate";
const plugin = require("tailwindcss/plugin");

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "selector",
  theme: {
    container: {
      center: true,
      screens: {
        xl: "1328px",
      },
      padding: {
        DEFAULT: "18px",
        sm: "18px",
        md: "24px",
        lg: "24px",
        xl: "24px",
      },
    },
    extend: {
      animation: {
        flow: "flow 10s reverse linear forwards infinite",
        scaleIn: "scaleIn 200ms ease",
        scaleOut: "scaleOut 200ms ease",
        fadeIn: "fadeIn 200ms ease",
        fadeOut: "fadeOut 200ms ease",
        enterFromLeft: "enterFromLeft 250ms ease",
        enterFromRight: "enterFromRight 250ms ease",
        exitToLeft: "exitToLeft 250ms ease",
        exitToRight: "exitToRight 250ms ease",
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(101.65% 92.54% at 50% 0%, var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        button: "0 1px 3px 0 rgba(0, 0, 0, 0.07)",
        card: "0px 2px 6px 0 rgba(0, 0, 0, 0.05), 0px 6px 24px 0 rgba(0, 0, 0, 0.05)",
      },
      colors: {
        brand: {
          50: "oklch(var(--brand-50) / <alpha-value>)",
          200: "oklch(var(--brand-200) / <alpha-value>)",
          300: "oklch(var(--brand-300) / <alpha-value>)",
          600: colors.blue[600],
          700: colors.blue[700],
        },
        foreground: {
          DEFAULT: "oklch(var(--black-900) / <alpha-value>)",
          primary: "oklch(var(--brand-700) / <alpha-value>)",
          success: colors.green[700],
          danger: colors.red[600],
        },
        background: {
          DEFAULT: "oklch(var(--base-white) / <alpha-value>)",
          50: "oklch(var(--background-50) / <alpha-value>)",
        },
        washed: {
          100: "oklch(var(--washed-100) / <alpha-value>)",
        },
        outline: {
          200: "oklch(var(--outline-200) / <alpha-value>)",
          300: "oklch(var(--outline-300) / <alpha-value>)",
          400: "oklch(var(--outline-400) / <alpha-value>)",
        },
        dim: {
          500: "oklch(var(--dim-500) / <alpha-value>)",
        },
        black: {
          700: "oklch(var(--black-700) / <alpha-value>)",
          800: "oklch(var(--black-800) / <alpha-value>)",
          900: "oklch(var(--black-900) / <alpha-value>)",
        },
        success: {
          50: "oklch(var(--success-50) / <alpha-value>)",
          200: "oklch(var(--success-200) / <alpha-value>)",
          300: "oklch(var(--success-300) / <alpha-value>)",
          600: colors.green[600],
          700: colors.green[700],
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      fontSize: {
        xs: ["12px", "18px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "26px"],
        xl: ["20px", "30px"],
        hxs: ["24px", "32px"],
        hsm: ["30px", "38px"],
        hmd: ["36px", "44px"],
        hlg: ["48px", "60px"],
        hxl: ["60px", "72px"],
      },
      keyframes: {
        flow: {
          to: {
            "stroke-dashoffset": "100",
          },
        },
        enterFromRight: {
          from: { opacity: "0", transform: "translateX(200px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        enterFromLeft: {
          from: { opacity: "0", transform: "translateX(-200px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        exitToRight: {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(200px)" },
        },
        exitToLeft: {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(-200px)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "rotateX(-10deg) scale(0.9)" },
          to: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
        },
        scaleOut: {
          from: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
          to: { opacity: "0", transform: "rotateX(-10deg) scale(0.95)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
      },
      spacing: {
        4.5: "18px",
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities }: any) => {
      matchUtilities({
        perspective: (value: any) => ({
          perspective: value,
        }),
      });
    }),
    tailwindcssAnimate,
  ],
};
export default config;
