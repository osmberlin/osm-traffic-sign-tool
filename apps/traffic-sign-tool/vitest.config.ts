/// <reference types="vitest" />
import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, '.'),
    },
  },
  test: {
    include: ['app/**/*.test.ts', 'app/**/*.test.tsx', 'src/**/*.test.ts', 'src/**/*.test.tsx'],
    environment: 'jsdom',
  },
})
