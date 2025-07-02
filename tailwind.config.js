/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        war: {
          dark: '#0a0a0a',
          darker: '#050505',
          gray: '#1a1a1a',
          light: '#2a2a2a',
          accent: '#1a4d3a',
          blue: '#1e3a5f',
          red: '#4d1a1a',
          gold: '#d4af37',
          green: '#00ff41',
          amber: '#fbbf24',
        },
        tactical: {
          primary: '#1a4d3a',
          secondary: '#1e3a5f',
          danger: '#dc2626',
          warning: '#f59e0b',
          success: '#10b981',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        tactical: ['Orbitron', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'radar-sweep': 'radar-sweep 3s linear infinite',
        'tactical-fade': 'tactical-fade 0.5s ease-out',
        'matrix-rain': 'matrix-rain 20s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%': { boxShadow: '0 0 5px rgba(26, 77, 58, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(26, 77, 58, 0.8)' },
        },
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'tactical-fade': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
};