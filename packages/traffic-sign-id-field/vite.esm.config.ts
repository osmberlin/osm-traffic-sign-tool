import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    sourcemap: true,
    target: 'es2022',
    lib: {
      entry: resolve(import.meta.dirname, 'src/fieldEntry.ts'),
      formats: ['es'],
      fileName: () => 'id-field.esm.js',
    },
    rollupOptions: {
      external: ['@osm-traffic-signs/converter'],
    },
  },
})
