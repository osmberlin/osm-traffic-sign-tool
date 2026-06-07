const GITHUB_REPO = 'osmberlin/osm-traffic-sign-tool'
export const PRODUCTION_ORIGIN = 'https://trafficsigns.osm-verkehrswende.org'

export type QaDeployContext = {
  branch: string
  pageOrigin: string
  isNetlify: boolean
  deployContext: 'production' | 'deploy-preview' | 'branch-deploy' | 'local'
}

export const getQaDeployContext = (): QaDeployContext => {
  const isNetlify = import.meta.env.VITE_NETLIFY === 'true'
  const deployContext =
    (import.meta.env.VITE_DEPLOY_CONTEXT as QaDeployContext['deployContext'] | undefined) ?? 'local'

  return {
    branch: import.meta.env.VITE_DEPLOY_BRANCH ?? 'main',
    isNetlify,
    deployContext,
    pageOrigin: isNetlify
      ? (import.meta.env.VITE_DEPLOY_URL ?? PRODUCTION_ORIGIN)
      : typeof window !== 'undefined'
        ? window.location.origin
        : PRODUCTION_ORIGIN,
  }
}

/** Preview/non-main only — production issues default to main in the workflow. */
export const formatQaDeployContextLines = (ctx: QaDeployContext): string[] => {
  if (ctx.branch === 'main' && !ctx.isNetlify) {
    return []
  }
  return [`> **Source branch:** \`${ctx.branch}\``]
}

export const githubBlobUrl = (path: string, ctx: QaDeployContext): string =>
  `https://github.com/${GITHUB_REPO}/blob/${ctx.branch}/${path}`
