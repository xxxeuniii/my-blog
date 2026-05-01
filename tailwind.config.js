/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './docs/**/*.{vue,md}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0c1014',
        secondary: '#585f66',
        'surface-container': '#e7eff7',
        'on-surface': '#151c22',
      },
      borderRadius: {
        'DEFAULT': '0.125rem',
        'lg': '0.25rem',
        'xl': '0.5rem',
        'full': '0.75rem',
      },
      spacing: {
        'gutter': '24px',
        'stack-sm': '12px',
        'container-max': '1200px',
        'sidebar-width': '260px',
        'stack-md': '24px',
        'base': '8px',
        'section-gap': '64px',
      },
      fontFamily: {
        headline: ['Newsreader', 'serif'],
        nav: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        display: ['Newsreader', 'serif'],
        label: ['Inter', 'sans-serif'],
        'label-caps': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'headline-md': ['32px', { lineHeight: '1.3', fontWeight: '500' }],
        'nav': ['14px', { lineHeight: '1', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.7', fontWeight: '400' }],
        'display-lg': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'headline-sm': ['24px', { lineHeight: '1.4', fontWeight: '500' }],
        'label': ['12px', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '600' }],
        'label-caps': ['12px', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
}
