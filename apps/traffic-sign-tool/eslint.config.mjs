import { FlatCompat } from '@eslint/eslintrc'
// import jsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import reactCompiler from 'eslint-plugin-react-compiler'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    // https://github.com/aridanpantoja/eslint-prettier-nextjs?tab=readme-ov-file#2-configure-eslint-and-prettier
    extends: ['next', 'next/core-web-vitals', 'next/typescript', 'plugin:jsx-a11y/recommended'],
    plugins: ['jsx-a11y'],
    // settings: {
    //   // https://nextjs.org/docs/app/api-reference/config/eslint#specifying-a-root-directory-within-a-monorepo
    //   next: {
    //     rootDir: 'apps/my-app/',
    //   },
    // },
    // WARNING: Does not work…
    ignorePatterns: ['./app/_components/catalyst/_unused/*.tsx'],
  }),
  // https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#configuration-new-eslintconfigjs
  eslintPluginPrettierRecommended,
  // https://www.npmjs.com/package/eslint-plugin-jsx-a11y
  // jsxA11y.flatConfigs.recommended,
  // https://www.npmjs.com/package/eslint-plugin-react-compiler#usage
  reactCompiler.configs.recommended,
  {
    // https://eslint.org/docs/latest/use/configure/ignore#ignoring-files
    // WARNING: Does not work…
    ignores: ['./app/_components/catalyst/_unused/*'],
  },
]
export default eslintConfig
