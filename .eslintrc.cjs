module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	// Docs: off=0, warn=1, error=2, see https://eslint.org/docs/user-guide/configuring/rules
	rules: {
		// https://eslint.org/docs/latest/rules/no-unused-vars#options
		// https://stackoverflow.com/a/61555310/729221
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				varsIgnorePattern: '^_',
				argsIgnorePattern: '^_',
				destructuredArrayIgnorePattern: '^_'
			}
		]
	}
}
