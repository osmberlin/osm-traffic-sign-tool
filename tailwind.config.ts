import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-overpass)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-overpass-mono)', ...defaultTheme.fontFamily.mono],
      },
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
