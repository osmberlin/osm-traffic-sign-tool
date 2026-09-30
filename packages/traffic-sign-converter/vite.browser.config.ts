import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// One lazy-loadable catalogue per country (`data/DE.js`, …) for the iD field's sign search.
// They share chunks with `id-field-browser.js`, so the sign data is not duplicated.
const catalogueEntries = Object.fromEntries(
  readdirSync(resolve(import.meta.dirname, 'src/data'))
    .filter((file) => file.endsWith('.ts'))
    .map((file) => {
      const country = file.replace(/\.ts$/, '')
      return [`data/${country}`, resolve(import.meta.dirname, 'src/data', file)]
    }),
)

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    sourcemap: true,
    target: 'es2022',
    lib: {
      entry: {
        'id-field-browser': resolve(import.meta.dirname, 'src/idFieldBrowser.ts'),
        ...catalogueEntries,
      },
      formats: ['es'],
      fileName: (_, entryName) => `${entryName}.js`,
    },
    // Browser-only files loaded by iD, never re-bundled: minify fully (library mode keeps whitespace)
    rolldownOptions: { output: { minify: true } },
  },
})
