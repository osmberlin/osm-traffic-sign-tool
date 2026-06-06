import { defineConfig } from 'oxlint'

export default defineConfig({
  plugins: ['typescript', 'react', 'import', 'jsx-a11y'],
  categories: {
    correctness: 'error',
    suspicious: 'error',
  },
  env: {
    es2024: true,
    node: true,
  },
  settings: {
    react: {
      version: '19.0.0',
    },
  },
  jsPlugins: ['oxc-plugin-react-compiler/eslint'],
  rules: {
    'eslint/no-shadow': 'off',
    'eslint/no-underscore-dangle': 'off',
    'eslint/no-unused-expressions': 'off',
    'eslint/no-useless-escape': 'off',
    'typescript/switch-exhaustiveness-check': 'error',
    'import/no-unassigned-import': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'oxc-react-compiler/no-unused-directives': 'error',
    'oxc-react-compiler/purity': 'error',
    'oxc-react-compiler/refs': 'error',
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: ['apps/traffic-sign-tool/**/*.{ts,tsx,js,jsx}'],
      env: {
        browser: true,
      },
    },
    {
      files: ['**/*.{test,spec}.{ts,tsx,js,jsx}'],
      env: {
        vitest: true,
      },
    },
  ],
  ignorePatterns: [
    '**/node_modules/**',
    '**/.turbo/**',
    '**/dist/**',
    '**/coverage/**',
    'apps/traffic-sign-tool/src/routeTree.gen.ts',
    // oxlint 1.65 react-compiler ICE (Cannot emit the same block twice)
    '**/PageQuestionsQa.tsx',
    '**/TagRecommendations.tsx',
  ],
})
