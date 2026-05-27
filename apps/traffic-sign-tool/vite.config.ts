import path from 'node:path'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const defaultBase = '/'

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? defaultBase,
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    babel({ presets: [reactCompilerPreset({ target: '19' })] }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, '.'),
    },
  },
})
