import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    sourcemap: true,
    target: 'es2022',
    lib: {
      entry: resolve(import.meta.dirname, 'src/browser.ts'),
      formats: ['iife'],
      name: 'OsmTrafficSignIdField',
      fileName: () => 'id-field.js',
    },
    rollupOptions: {
      external: ['@osm-traffic-signs/converter'],
    },
  },
})
