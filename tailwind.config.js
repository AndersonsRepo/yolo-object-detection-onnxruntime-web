/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'robovision-black': '#0a0a0a',
        'robovision-dark': '#1a1a1a',
        'robovision-darker': '#0f0f0f',
        'robovision-cyan': '#00ffff',
        'robovision-blue': '#0080ff',
        'robovision-accent': '#ff0080',
        'robovision-purple': '#8000ff',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'scanning-line': 'scanning-line 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'text-loading': 'textLoading 1.5s ease-in-out infinite',
        'details-show': 'details-show 300ms ease-in-out',
      },
      keyframes: {
        'scanning-line': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 255, 255, 0.8)' },
        },
        'textLoading': {
          '0%, 100%': { 
            transform: 'scale(1)', 
            opacity: '0.5',
            textShadow: '0 0 10px #00ffff'
          },
          '50%': { 
            transform: 'scale(1.1)', 
            opacity: '1',
            textShadow: '0 0 20px #00ffff'
          },
        },
        'details-show': {
          'from': { opacity: '0', transform: 'translateY(-8px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
