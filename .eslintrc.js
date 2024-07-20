// @ts-check
/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  // Following https://nextjs.org/docs/app/building-your-application/configuring/eslint
  // https://react.dev/learn/react-compiler#installing-eslint-plugin-react-compiler
  plugins: ['eslint-plugin-react-compiler'],
  rules: {
    'react-compiler/react-compiler': 'error',
  },
  extends: ['next/core-web-vitals', 'prettier'],
}

module.exports = eslintConfig
