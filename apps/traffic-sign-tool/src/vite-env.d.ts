/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NETLIFY?: string
  readonly VITE_DEPLOY_CONTEXT?: string
  readonly VITE_DEPLOY_BRANCH?: string
  readonly VITE_DEPLOY_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
