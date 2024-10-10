import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit', // Habilita o modo JIT
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'box': '0 0 20px rgba(26, 26, 26, 0.1), 0 0 40px rgba(26, 26, 26, 0.1), 0 0 80px rgba(26, 26, 26, 0.1)'
      }
    },

    keyframes: {
      move: {
        '0%, 100%': { transform: 'scale(1)' },
        '50%' : {transform: 'scale(1.03)'}
      }
    },
    animation: {
      move: 'move 0.5s linear infinite'
    }
  },
  plugins: [],
}

