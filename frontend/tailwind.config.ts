import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f6fb',
          100: '#e7eef7',
          200: '#c3d4eb',
          300: '#9eb9df',
          400: '#5583c8',
          500: '#1e5aa7',
          600: '#184a8a',
          700: '#123a6e',
          800: '#0d2a51',
          900: '#081c39'
        }
      }
    }
  },
  plugins: []
};

export default config;



