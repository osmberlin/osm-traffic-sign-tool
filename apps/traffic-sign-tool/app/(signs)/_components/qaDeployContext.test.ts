import { afterEach, describe, expect, test, vi } from 'vitest'
import { getQaDeployContext } from './qaDeployContext'

describe('getQaDeployContext', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  test('uses Netlify build-time env vars when set', () => {
    vi.stubEnv('NETLIFY', 'true')
    vi.stubEnv('CONTEXT', 'deploy-preview')
    vi.stubEnv('BRANCH', 'feat/qa-preview')
    vi.stubEnv('DEPLOY_PRIME_URL', 'https://deploy-preview-42--site.netlify.app')

    expect(getQaDeployContext()).toEqual({
      branch: 'feat/qa-preview',
      pageOrigin: 'https://deploy-preview-42--site.netlify.app',
      isNetlify: true,
      deployContext: 'deploy-preview',
    })
  })

  test('defaults to local context when env vars are unset', () => {
    expect(getQaDeployContext()).toEqual({
      branch: 'main',
      pageOrigin: expect.stringMatching(/^https?:\/\//),
      isNetlify: false,
      deployContext: 'local',
    })
  })
})
