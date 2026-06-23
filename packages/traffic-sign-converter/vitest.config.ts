/// <reference types="vitest" />
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const packageRoot = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    exclude: ['dist/**', 'node_modules/**'],
  },
  resolve: {
    alias: {
      // pretest only runs transfer-svgs (src/), while package exports point at dist/
      '@osm-traffic-signs/converter/data-svgs': path.join(packageRoot, 'src/data-svgs'),
    },
  },
})
