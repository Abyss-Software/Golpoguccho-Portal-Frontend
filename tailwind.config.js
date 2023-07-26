/** @type {import('tailwindcss').Config} */

const themeColors = {
  textColor: 'var(--color-text)',

  shadowColor: 'var(--color-shadow)',

  backgroundColor: 'var(--color-background)',

  paperColor: 'var(--color-paper)',

  dividerColor: 'var(--color-divider)',

  primaryColor: 'var(--color-primary)',
  primaryDarkColor: 'var(--color-primary-dark)',
  primaryLightColor: 'var(--color-primary-light)',
  primaryLighterColor: 'var(--color-primary-lighter)',

  errorColor: 'var(--color-error)',
  errorDarkColor: 'var(--color-error-dark)',
  errorLightColor: 'var(--color-error-light)',
  errorLighterColor: 'var(--color-error-lighter)',

  topnav: 'var(--color-topnav)',
};

export default {
  mode: 'jit',
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: themeColors,
    },
  },
  plugins: [require('tailwindcss-animate')],
};
