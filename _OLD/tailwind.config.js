import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Overpass', ...defaultTheme.fontFamily.sans],
				mono: ['Overpass Mono', ...defaultTheme.fontFamily.mono]
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
	// Docs https://tailwindcss.com/docs/configuration#core-plugins
	corePlugins: {
		opacity: false,
		borderOpacity: false,
		ringOpacity: false,
		textOpacity: false
	}
}
