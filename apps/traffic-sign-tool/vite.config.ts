import os from 'node:os'
import path from 'node:path'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig, searchForWorkspaceRoot } from 'vite'

const defaultBase = '/'

// Embed Netlify build env vars into the client bundle (build-time only).
// https://docs.netlify.com/build/configure-builds/environment-variables/
const netlifyBuildEnv = {
  'import.meta.env.NETLIFY': JSON.stringify(process.env.NETLIFY ?? ''),
  'import.meta.env.CONTEXT': JSON.stringify(process.env.CONTEXT ?? 'local'),
  'import.meta.env.BRANCH': JSON.stringify(process.env.BRANCH ?? ''),
  'import.meta.env.DEPLOY_PRIME_URL': JSON.stringify(process.env.DEPLOY_PRIME_URL ?? ''),
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? defaultBase,
  define: netlifyBuildEnv,
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
  server: {
    fs: {
      // Bun global store: assets of dependencies (e.g. @fontsource fonts) realpath into
      // ~/.bun/install/cache/links, outside the default allow list (workspace root).
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        path.join(os.homedir(), '.bun/install/cache/links'),
      ],
    },
  },
})
