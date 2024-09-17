// @ts-check
/** @type {import("prettier").Config} */
const prettierConfig = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  printWidth: 100,
  plugins: ['prettier-plugin-organize-imports'],
}

export default prettierConfig
