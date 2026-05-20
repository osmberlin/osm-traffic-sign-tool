import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { reactCompilerOxc } from 'oxc-plugin-react-compiler'
import { defineConfig } from 'vite'

const defaultBase = '/'

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? defaultBase,
  plugins: [
    TanStackRouterVite(),
    reactCompilerOxc({ compilationMode: 'annotation', target: '19' }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, '.'),
    },
  },
})
