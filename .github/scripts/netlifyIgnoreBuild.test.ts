import { describe, expect, test } from 'vitest'
import { shouldSkipNetlifyBuild } from './netlifyIgnoreBuild.mjs'

describe('shouldSkipNetlifyBuild', () => {
  test('skips non deploy-preview contexts', () => {
    expect(shouldSkipNetlifyBuild({ CONTEXT: 'production' })).toBe(true)
    expect(shouldSkipNetlifyBuild({ CONTEXT: 'branch-deploy' })).toBe(true)
  })

  test('builds human pull request deploy previews', () => {
    expect(
      shouldSkipNetlifyBuild({
        CONTEXT: 'deploy-preview',
        HEAD: 'cursor/ci-lockfile-and-checks-43d5',
      }),
    ).toBe(false)
  })

  test('skips dependabot bun group pull requests', () => {
    expect(
      shouldSkipNetlifyBuild({
        CONTEXT: 'deploy-preview',
        HEAD: 'dependabot/bun/app-dev-minor-patch-412de2ab1d',
      }),
    ).toBe(true)
  })

  test('skips dependabot github_actions pull requests', () => {
    expect(
      shouldSkipNetlifyBuild({
        CONTEXT: 'deploy-preview',
        HEAD: 'dependabot/github_actions/actions/upload-pages-artifact-5',
      }),
    ).toBe(true)
  })

  test('skips when BRANCH carries the dependabot prefix', () => {
    expect(
      shouldSkipNetlifyBuild({
        CONTEXT: 'deploy-preview',
        BRANCH: 'dependabot/npm_and_yarn/vite-8.1.2',
      }),
    ).toBe(true)
  })

  test('skips when latest commit author is dependabot', () => {
    expect(
      shouldSkipNetlifyBuild({ CONTEXT: 'deploy-preview', HEAD: 'feature/foo' }, 'dependabot[bot]'),
    ).toBe(true)
  })
})
