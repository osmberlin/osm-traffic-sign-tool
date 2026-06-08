const GITHUB_REPO = 'osmberlin/osm-traffic-sign-tool'

export type QaDeployContext = {
  branch: string
  pageOrigin: string
  isNetlify: boolean
  deployContext: 'production' | 'deploy-preview' | 'branch-deploy' | 'local'
}

export const getQaDeployContext = (): QaDeployContext => {
  const isNetlify = import.meta.env.NETLIFY === 'true'
  const deployContext =
    (import.meta.env.CONTEXT as QaDeployContext['deployContext'] | undefined) ?? 'local'

  return {
    branch: import.meta.env.BRANCH || 'main',
    isNetlify,
    deployContext,
    pageOrigin: import.meta.env.DEPLOY_PRIME_URL || window.location.origin,
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
