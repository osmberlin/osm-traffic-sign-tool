import path from 'node:path'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const defaultBase = '/'

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? defaultBase,
  plugins: [
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './paraglide',
      // UI locale only — no `url` strategy (our `/$lang` param is catalogue, not UI lang).
      strategy: ['localStorage', 'baseLocale'],
    }),
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
