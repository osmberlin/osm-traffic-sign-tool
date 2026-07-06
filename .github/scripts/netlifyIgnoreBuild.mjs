/**
 * Netlify `ignore` command logic.
 *
 * Exit semantics for Netlify: 0 = skip build, 1 = proceed.
 * We only want deploy previews for human/feature PRs — production is GitHub Pages.
 */
import { fileURLToPath } from 'node:url'

export function shouldSkipNetlifyBuild(env, latestCommitAuthor = null) {
  const context = env.CONTEXT ?? ''

  if (context !== 'deploy-preview') {
    return true
  }

  const head = env.HEAD ?? ''
  const branch = env.BRANCH ?? ''

  if (head.startsWith('dependabot/') || branch.startsWith('dependabot/')) {
    return true
  }

  if (latestCommitAuthor && /dependabot/i.test(latestCommitAuthor)) {
    return true
  }

  return false
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  process.exit(shouldSkipNetlifyBuild(process.env) ? 0 : 1)
}
