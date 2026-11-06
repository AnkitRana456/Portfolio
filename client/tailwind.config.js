/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: 'rgb(var(--accent) / <alpha-value>)',
        bg: {
          dark: '#0a0e0f',
          card: '#111719',
          elevated: '#161f22',
          border: '#1c282b'
        },
        mint: {
          DEFAULT: '#00ffc2',
          glow: 'rgba(0, 255, 194, 0.25)',
          muted: '#00b388'
        },
        amber: {
          DEFAULT: '#ffb454',
          glow: 'rgba(255, 180, 84, 0.25)',
          muted: '#d99236'
        },
        console: {
          text: '#c3d1d5',
          dim: '#62767d',
          darker: '#06090a'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        sans: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'mint-glow': '0 0 20px rgba(0, 255, 194, 0.2), 0 0 40px rgba(0, 255, 194, 0.1)',
        'amber-glow': '0 0 20px rgba(255, 180, 84, 0.2), 0 0 40px rgba(255, 180, 84, 0.1)',
        'card-3d': '0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(0, 255, 194, 0.15)',
        'btn-press': '0 2px 0 0 #00b388, 0 6px 20px rgba(0, 255, 194, 0.3)'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'terminal-cursor': 'blink 1s step-end infinite',
        'blink': 'blink 1s step-end infinite',
        'boot-in': 'boot-in 0.6s ease-out both',
        'marquee-left': 'marquee-left 40s linear infinite',
        'marquee-right': 'marquee-right 40s linear infinite',
        'sheet-in': 'sheet-in 0.3s ease-out both',
        'duck-bob': 'duck-bob 3s ease-in-out infinite',
        'duck-excited': 'duck-excited 0.45s ease-in-out infinite',
        'duck-eat': 'duck-eat 0.2s ease-in-out 3'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        'boot-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'none' }
        },
        'marquee-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'sheet-in': {
          '0%': { opacity: '0', transform: 'translateY(14px) scale(0.98)' }
        },
        'duck-bob': {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-4px) rotate(2deg)' }
        },
        'duck-excited': {
          '0%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-6px)' },
          '65%': { transform: 'translateY(-1px)' }
        },
        'duck-eat': {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)' },
          '50%': { transform: 'translateY(4px) scaleY(0.93)' }
        }
      }
    },
  },
  plugins: [],
}
