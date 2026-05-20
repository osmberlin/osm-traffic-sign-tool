import { defineConfig } from 'oxfmt'

export default defineConfig({
  printWidth: 100,
  semi: false,
  singleQuote: true,
  sortImports: {
    newlinesBetween: false,
  },
  sortPackageJson: {
    sortScripts: true,
  },
  sortTailwindcss: {
    attributes: ['class', 'className'],
    functions: ['clsx'],
    preserveWhitespace: true,
  },
  ignorePatterns: [
    '**/node_modules/**',
    '**/.next/**',
    '**/.turbo/**',
    '**/dist/**',
    '**/out/**',
    '**/build/**',
    '**/coverage/**',
  ],
})
