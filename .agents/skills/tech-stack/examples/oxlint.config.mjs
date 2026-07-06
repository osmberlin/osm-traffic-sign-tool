import { defineConfig } from 'oxlint'
import reactHooksJs from 'oxlint-config-react-hooks-js/configs/recommended-latest.json' with { type: 'json' }

// FMC default — shared tilda-geo / trassenscout base (no app-specific jsPlugins).
// Add custom jsPlugins per app (e.g. Trassenscout auth-boundary rules — see references/oxc-config.md).
// ignorePatterns: keep in sync with oxfmt.config.mjs.
export default defineConfig({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'react'],
  options: { typeAware: true },
  ignorePatterns: [
    '.agents/**',
    '.cursor/**',
    '.output/**',
    'playwright-report/**',
    'test-results/**',
    'src/routeTree.gen.ts',
    'src/prisma/generated/**',
  ],
  rules: {
    'typescript/switch-exhaustiveness-check': 'error',
    // Type-aware rules that are noisy in FMC apps — keep off unless you tighten deliberately.
    // 'typescript/no-floating-promises': 'off',
    // 'typescript/no-duplicate-type-constituents': 'off',
    // 'typescript/no-redundant-type-constituents': 'off',
    // 'typescript/restrict-template-expressions': 'off',
    // 'typescript/no-base-to-string': 'off',
    // 'typescript/await-thenable': 'off',
    // 'typescript/unbound-method': 'off',
    // 'typescript/no-meaningless-void-operator': 'off',
    // 'typescript/no-useless-default-assignment': 'off',
    // 'typescript/no-misused-spread': 'off',
    // 'typescript/require-array-sort-compare': 'off',
    // 'typescript/no-array-delete': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      rules: {
        'typescript/no-non-null-assertion': 'off',
        'react/rules-of-hooks': 'off',
      },
    },
    {
      files: ['**/*.tsx'],
      jsPlugins: [{ name: 'react-hooks-js', specifier: 'eslint-plugin-react-hooks' }],
      rules: {
        ...reactHooksJs.rules,
        'react/react-compiler': 'error',
      },
    },
  ],
})
