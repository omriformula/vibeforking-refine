module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-100": "var(--black-100)",
        "black-80": "var(--black-80)",
        "colors-background-bg1": "var(--colors-background-bg1)",
        "colors-background-bg2": "var(--colors-background-bg2)",
        "colors-background-bg3": "var(--colors-background-bg3)",
        "colors-background-bg4": "var(--colors-background-bg4)",
        "colors-black-10": "var(--colors-black-10)",
        "colors-black-100": "var(--colors-black-100)",
        "colors-black-20": "var(--colors-black-20)",
        "colors-black-4": "var(--colors-black-4)",
        "colors-black-40": "var(--colors-black-40)",
        "colors-primary-brand": "var(--colors-primary-brand)",
        "colors-secondary-cyan": "var(--colors-secondary-cyan)",
        "colors-secondary-green": "var(--colors-secondary-green)",
        "colors-secondary-indigo": "var(--colors-secondary-indigo)",
        "colors-secondary-mint": "var(--colors-secondary-mint)",
        "colors-white-100": "var(--colors-white-100)",
        "colors-white-20": "var(--colors-white-20)",
        "themes-black-100-duplicate": "var(--themes-black-100-duplicate)",
        "white-100": "var(--white-100)",
        "white-40": "var(--white-40)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "12-regular": "var(--12-regular-font-family)",
        "14-regular": "var(--14-regular-font-family)",
        "14-semibold": "var(--14-semibold-font-family)",
        "24-semibold": "var(--24-semibold-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
