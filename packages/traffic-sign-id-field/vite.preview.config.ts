import { resolve } from 'node:path'
import { defineConfig } from 'vite'

/** Standalone design preview for the field: `bun run preview`. */
export default defineConfig({
  root: resolve(import.meta.dirname, 'preview'),
  // Serve the converter's sign SVGs at /<COUNTRY>/svgs/<name>.svg
  publicDir: resolve(import.meta.dirname, '../traffic-sign-converter/src/data-svgs'),
  server: {
    port: 5180,
    fs: {
      allow: [resolve(import.meta.dirname, '../..')],
    },
  },
})
