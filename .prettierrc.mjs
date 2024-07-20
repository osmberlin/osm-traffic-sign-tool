// @ts-check
/** @type {import("prettier").Config} */
const prettierConfig = {
  semi: false,
  singleQuote: true,
  arrowParens: 'always',
  printWidth: 100,
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx'],
}

export default prettierConfig
