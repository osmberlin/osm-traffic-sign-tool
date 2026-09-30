import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    sourcemap: true,
    target: 'es2022',
    lib: {
      entry: {
        'id-field-browser': resolve(import.meta.dirname, 'src/idFieldBrowser.ts'),
        'data/DE': resolve(import.meta.dirname, 'src/data/DE.ts'),
      },
      formats: ['es'],
      fileName: (_, entryName) => `${entryName}.js`,
    },
  },
})
