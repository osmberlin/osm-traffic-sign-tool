import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-fira-code)', ...defaultTheme.fontFamily.mono],
        sans: ['var(--font-fira-sans)', ...defaultTheme.fontFamily.sans],
        condensed: ['var(--font-fira-condensed)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-noto-serif)', ...defaultTheme.fontFamily.serif],
      },
    },
    fontWeight: {
      // We only support some weights, see `app/_components/layout/fonts/fonts.ts`
      // Docs https://tailwindcss.com/docs/font-weight
      // thin: '100',
      // extralight: '200',
      light: '300',
      normal: '400',
      // medium: '500',
      semibold: '600',
      bold: '700',
      // extrabold: '800',
      // black: '900',
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
  // Docs https://tailwindcss.com/docs/configuration#core-plugins
  corePlugins: {
    opacity: false,
    borderOpacity: false,
    ringOpacity: false,
    textOpacity: false,
  },
}

export default config
