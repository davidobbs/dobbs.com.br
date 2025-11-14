import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Azul petróleo escuro / grafite (primária)
        primary: {
          50: '#0B1020',
          100: '#0F172A',
          200: '#1E293B',
          300: '#334155',
          400: '#475569',
          500: '#64748B',
          600: '#94A3B8',
          700: '#CBD5E1',
          800: '#E2E8F0',
          900: '#F1F5F9',
        },
        // Ciano/teal de tecnologia (destaque)
        accent: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#14F4C9',
          600: '#06B6D4',
          700: '#0891B2',
          800: '#0E7490',
          900: '#155E75',
        },
        // Cinzas neutros
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#0A0A0A',
        },
        // Feedback/Estados
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(20, 244, 201, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 244, 201, 0.03) 1px, transparent 1px)',
        'grid-pattern-dense': 'linear-gradient(rgba(20, 244, 201, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 244, 201, 0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '40px 40px',
        'grid-dense': '20px 20px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#E5E7EB',
            a: {
              color: '#14F4C9',
              '&:hover': {
                color: '#22D3EE',
              },
            },
            code: {
              color: '#14F4C9',
              backgroundColor: '#1E293B',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            h1: {
              color: '#F9FAFB',
              fontFamily: 'var(--font-space-grotesk)',
            },
            h2: {
              color: '#F9FAFB',
              fontFamily: 'var(--font-space-grotesk)',
            },
            h3: {
              color: '#F9FAFB',
              fontFamily: 'var(--font-space-grotesk)',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;

