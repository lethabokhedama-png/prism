import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Prism core palette
        prism: {
          black:   '#000000',
          white:   '#FFFFFF',
          purple:  '#8B5CF6',
          blue:    '#3B82F6',
          grey: {
            50:  '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
            950: '#030712',
          },
        },
      },
      borderRadius: {
        'prism-sm':   '12px',
        'prism':      '16px',
        'prism-md':   '20px',
        'prism-lg':   '24px',
        'prism-xl':   '32px',
        'prism-pill': '9999px',
      },
      boxShadow: {
        'prism-sm': '0 2px 8px rgba(0,0,0,0.4)',
        'prism':    '0 4px 24px rgba(0,0,0,0.5)',
        'prism-lg': '0 8px 48px rgba(0,0,0,0.6)',
        'prism-purple': '0 0 0 2px #8B5CF6',
        'prism-blue':   '0 0 0 2px #3B82F6',
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-top':    'env(safe-area-inset-top)',
        'safe-left':   'env(safe-area-inset-left)',
        'safe-right':  'env(safe-area-inset-right)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-up': {
          from: { transform: 'translateY(16px)', opacity: '0' },
          to:   { transform: 'translateY(0)',    opacity: '1' },
        },
        'slide-in-left': {
          from: { transform: 'translateX(-100%)' },
          to:   { transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to:   { transform: 'scale(1)',    opacity: '1' },
        },
        'token-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
      },
      animation: {
        'fade-in':       'fade-in 0.2s ease-out',
        'slide-up':      'slide-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-in-left': 'slide-in-left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'scale-in':      'scale-in 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'token-pulse':   'token-pulse 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config