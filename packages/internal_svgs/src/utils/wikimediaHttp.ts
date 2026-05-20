const DEFAULT_DELAY_MS = Number(process.env.WIKIMEDIA_REQUEST_DELAY_MS ?? '500')
const DEFAULT_MAX_RETRIES = Number(process.env.WIKIMEDIA_MAX_RETRIES ?? '5')

const USER_AGENT =
  'osm-traffic-sign-tools-bot/1.0 (https://github.com/FixMyBerlin/osm-traffic-sign-tools; t@tobiasjordans.de)'
type HeadersInput = ConstructorParameters<typeof Headers>[0]

let queue = Promise.resolve()
let lastRequestTimestamp = 0

const now = () => Date.now()

const sleep = (delayMs: number) =>
  new Promise((resolve) => setTimeout(resolve, Math.max(0, delayMs)))

const normalizeRetryAfterMs = (retryAfter: string | null, fallbackMs: number) => {
  if (!retryAfter) {
    return fallbackMs
  }

  const retryAfterSeconds = Number(retryAfter)
  if (!Number.isNaN(retryAfterSeconds) && retryAfterSeconds >= 0) {
    return retryAfterSeconds * 1000
  }

  const retryAfterDate = new Date(retryAfter).getTime()
  if (Number.isNaN(retryAfterDate)) {
    return fallbackMs
  }

  const retryAfterMs = retryAfterDate - now()
  if (retryAfterMs >= 0) {
    return retryAfterMs
  }

  return fallbackMs
}

const enqueue = async <T>(task: () => Promise<T>) => {
  const run = queue.then(task, task)
  queue = run.then(
    () => undefined,
    () => undefined,
  )
  return run
}

const withWikimediaHeaders = (headers?: HeadersInput) => {
  const resolvedHeaders = new Headers(headers)
  resolvedHeaders.set('User-Agent', USER_AGENT)
  resolvedHeaders.set('Accept-Encoding', 'gzip')
  return resolvedHeaders
}

const waitForRateLimitWindow = async () => {
  const elapsedMs = now() - lastRequestTimestamp
  if (elapsedMs < DEFAULT_DELAY_MS) {
    await sleep(DEFAULT_DELAY_MS - elapsedMs)
  }
}

export const getWikimediaUserAgent = () => USER_AGENT

export const fetchWithWikimediaPolicy = async (url: string, init?: RequestInit) =>
  enqueue(async () => {
    let attempt = 0

    while (attempt < DEFAULT_MAX_RETRIES) {
      attempt += 1
      await waitForRateLimitWindow()

      let response: Response
      try {
        response = await fetch(url, {
          ...init,
          headers: withWikimediaHeaders(init?.headers),
        })
      } catch (error) {
        if (attempt >= DEFAULT_MAX_RETRIES) {
          throw error
        }
        await sleep(Math.min(5000, 500 * 2 ** attempt))
        continue
      } finally {
        lastRequestTimestamp = now()
      }

      if (response.status !== 429 && response.status !== 503) {
        return response
      }

      if (attempt >= DEFAULT_MAX_RETRIES) {
        return response
      }

      const fallbackDelayMs = Math.min(10000, 5000 * 2 ** (attempt - 1))
      const retryDelayMs = normalizeRetryAfterMs(
        response.headers.get('retry-after'),
        fallbackDelayMs,
      )
      await sleep(retryDelayMs)
    }

    throw new Error('Unexpected Wikimedia retry state')
  })
