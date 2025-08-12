/**** Tailwind CSS v3-compatible config ****/
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E88E5',
      },
    },
  },
  plugins: [],
};