import { afterEach, describe, expect, test, vi } from 'vitest'

const importWikimediaHttp = async () => {
  vi.resetModules()
  return import('./wikimediaHttp.js')
}

afterEach(() => {
  vi.restoreAllMocks()
  delete process.env.WIKIMEDIA_REQUEST_DELAY_MS
  delete process.env.WIKIMEDIA_MAX_RETRIES
})

describe('wikimediaHttp', () => {
  test('builds a compliant user-agent string', async () => {
    const { getWikimediaUserAgent } = await importWikimediaHttp()
    const userAgent = getWikimediaUserAgent()

    expect(userAgent).toContain('osm-traffic-sign-tools-bot')
    expect(userAgent).toContain('https://github.com/FixMyBerlin/osm-traffic-sign-tools')
    expect(userAgent).toContain('t@tobiasjordans.de')
  })

  test('retries when Wikimedia returns 429', async () => {
    process.env.WIKIMEDIA_REQUEST_DELAY_MS = '0'
    process.env.WIKIMEDIA_MAX_RETRIES = '3'
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response('slow down', { status: 429, headers: { 'retry-after': '0' } }),
      )
      .mockResolvedValueOnce(new Response('ok', { status: 200 }))

    vi.stubGlobal('fetch', fetchMock)
    const { fetchWithWikimediaPolicy } = await importWikimediaHttp()

    const response = await fetchWithWikimediaPolicy('https://commons.wikimedia.org/w/api.php')

    expect(response.status).toBe(200)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})

describe('getFileUrlFromWikiApi', () => {
  test('returns a structured error when API payload contains error', async () => {
    process.env.WIKIMEDIA_REQUEST_DELAY_MS = '0'
    process.env.WIKIMEDIA_MAX_RETRIES = '1'
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ error: { code: 'ratelimited', info: 'Too many requests' } }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    )

    vi.stubGlobal('fetch', fetchMock)
    vi.resetModules()
    const { getFileUrlFromWikiApi } = await import('./getFileUrlFromWikiApi.js')

    const result = await getFileUrlFromWikiApi(
      'https://commons.wikimedia.org/wiki/File:Zeichen_274.svg',
    )

    expect(result.success).toBe(false)
    if (result.success) {
      return
    }
    expect(result.error.message).toContain('error payload')
  })
})
