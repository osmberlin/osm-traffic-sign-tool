import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import reactCompiler from 'eslint-plugin-react-compiler'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintPluginPrettierRecommended,
  reactCompiler.configs.recommended,
  // Override default ignores of eslint-config-next
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Custom ignores:
    './app/_components/catalyst/_unused/*',
  ]),
])

export default eslintConfig
