/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        'acrylic-bg': 'rgba(255,255,255,0.15)',
        'acrylic-bg-dark': 'rgba(36,36,36,0.6)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.acrylic': {
          'background-color': 'rgba(255,255,255,0.15)',
          'backdrop-filter': 'blur(12px)',
          '-webkit-backdrop-filter': 'blur(12px)',
          'border-radius': '16px',
          'box-shadow': '0 4px 32px 0 rgba(0,0,0,0.12)',
        },
        '.acrylic-light': {
          'background-color': 'rgba(255,255,255,0.15)',
          'backdrop-filter': 'blur(12px)',
          '-webkit-backdrop-filter': 'blur(12px)',
          'border-radius': '16px',
          'box-shadow': '0 4px 32px 0 rgba(0,0,0,0.12)',
        },
        '.acrylic-dark': {
          'background-color': 'rgba(36,36,36,0.6)',
          'backdrop-filter': 'blur(12px)',
          '-webkit-backdrop-filter': 'blur(12px)',
          'border-radius': '16px',
          'box-shadow': '0 4px 32px 0 rgba(0,0,0,0.24)',
        },
      });
    },
  ],
}; 