/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        primary: {
          DEFAULT: '#1E4D3B',
          50: '#f2f7f4',
          100: '#e3ece6',
          200: '#c5d9cd',
          300: '#9dbfae',
          400: '#6fa08a',
          500: '#4c846e',
          600: '#1E4D3B',
          700: '#163A2C',
          800: '#102B20',
          900: '#0b1d16',
          foreground: '#FAF8F5',
          tint: '#163A2C',
          dark: '#163A2C',
        },
        forest: {
          DEFAULT: '#1E4D3B',
          hover: '#163A2C',
          active: '#102B20',
          tint: 'rgba(30, 77, 59, 0.08)',
          ring: 'rgba(30, 77, 59, 0.35)',
        },
        obsidian: {
          DEFAULT: '#181D1A',
          secondary: 'rgba(24, 29, 26, 0.68)',
          muted: 'rgba(24, 29, 26, 0.52)',
          hairline: 'rgba(24, 29, 26, 0.10)',
        },
        ivory: {
          DEFAULT: '#FAF8F5',
          white: '#FFFFFF',
        },
        terracotta: {
          DEFAULT: '#C86D51',
          tint: 'rgba(200, 109, 81, 0.14)',
          text: '#9E4B32',
        },
        sand: {
          DEFAULT: '#EFECE6',
          surface: '#EFECE6',
          border: '#DED8CE',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        DEFAULT: '0.75rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'brand': '0 4px 20px -2px rgba(30, 77, 59, 0.12)',
        'card': '0 2px 12px -1px rgba(24, 29, 26, 0.06)',
        'card-hover': '0 12px 28px -4px rgba(24, 29, 26, 0.10)',
        'arrow': '0 4px 14px rgba(24, 29, 26, 0.10)',
      }
    },
  },
  plugins: [],
}
