import { vitePreprocess } from '@sveltejs/kit/vite'
import adapter from '@sveltejs/adapter-static'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'

const file = fileURLToPath(new URL('package.json', import.meta.url))
const json = readFileSync(file, 'utf8')
const pkg = JSON.parse(json)

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// https://kit.svelte.dev/docs/integrations#preprocessors
	preprocess: vitePreprocess(),
	// https://github.com/sveltejs/language-tools/issues/1556#issuecomment-1294882549
	'enable-ts-plugin': true,
	kit: {
		// https://kit.svelte.dev/docs/single-page-apps#usage
		adapter: adapter({
			// https://javascript.plainenglish.io/sveltekit-github-pages-4fe2844773de
			fallback: undefined
		}),
		// https://kit.svelte.dev/docs/configuration#alias
		alias: {
			'@/data': './src/data',
			'@/components': './src/components',
			'@/stores': './src/stores'
		},
		version: {
			name: pkg.version
		}
	}
}

export default config
