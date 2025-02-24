import { FlatCompat } from '@eslint/eslintrc'
// import reactCompiler from 'eslint-plugin-react-compiler'

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    // https://github.com/aridanpantoja/eslint-prettier-nextjs?tab=readme-ov-file#2-configure-eslint-and-prettier
    extends: [
      'next',
      'next/core-web-vitals',
      'next/typescript',
      'plugin:prettier/recommended',
      'plugin:jsx-a11y/recommended',
    ],
    plugins: [
      // https://react.dev/learn/react-compiler#installing-eslint-plugin-react-compiler
      // ['react-compiler': reactCompiler],
      'prettier',
      'jsx-a11y',
    ],
    rules: {
      'react-compiler/react-compiler': 'error',
    },
    // settings: {
    //   // https://nextjs.org/docs/app/api-reference/config/eslint#specifying-a-root-directory-within-a-monorepo
    //   next: {
    //     rootDir: 'apps/my-app/',
    //   },
    // },
  }),
]
export default eslintConfig
