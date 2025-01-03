// @ts-check
/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  root: true,
  // https://react.dev/learn/react-compiler#installing-eslint-plugin-react-compiler
  // plugins: ['react-compiler'],
  // rules: {
  //   'react-compiler/react-compiler': 'error',
  // },

  // Following https://nextjs.org/docs/app/building-your-application/configuring/eslint
  extends: ['next/core-web-vitals', 'prettier'],
  parserOptions: {
    project: true,
  },
}

module.exports = eslintConfig
