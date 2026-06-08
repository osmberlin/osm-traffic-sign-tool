/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NETLIFY?: string
  readonly CONTEXT?: string
  readonly BRANCH?: string
  readonly DEPLOY_PRIME_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
