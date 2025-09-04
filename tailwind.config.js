/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'hsl(200, 80%, 50%)',
        accent: 'hsl(160, 100%, 40%)',
        bg: {
          DEFAULT: 'hsl(220, 30%, 98%)',
          dark: 'hsl(220, 30%, 10%)'
        },
        surface: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          dark: 'hsl(220, 30%, 15%)'
        },
        border: {
          DEFAULT: 'hsl(220, 10%, 90%)',
          dark: 'hsl(220, 30%, 20%)'
        },
        textPrimary: {
          DEFAULT: 'hsl(220, 30%, 15%)',
          dark: 'hsl(220, 30%, 90%)'
        },
        textSecondary: {
          DEFAULT: 'hsl(220, 30%, 35%)',
          dark: 'hsl(220, 30%, 70%)'
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '24px',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(220, 30%, 15%, 0.08)',
        'card-dark': '0 4px 12px hsla(220, 30%, 5%, 0.2)',
        'modal': '0 8px 24px hsla(220, 30%, 15%, 0.12)',
        'modal-dark': '0 8px 24px hsla(220, 30%, 5%, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 250ms cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 250ms cubic-bezier(0.22,1,0.36,1)',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
