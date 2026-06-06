import { fetchWithWikimediaPolicy } from './wikimediaHttp.js'

const errorDate = () => new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const extractFirstPage = (value: unknown) => {
  if (!isRecord(value)) {
    return undefined
  }

  const query = value.query
  if (!isRecord(query)) {
    return undefined
  }

  const pages = query.pages
  if (!isRecord(pages)) {
    return undefined
  }

  const firstPage = Object.values(pages)[0]
  return isRecord(firstPage) ? firstPage : undefined
}

export const getFileUrlFromWikiApi = async (sourceUrl: string) => {
  // Extract the File:* or Datei:* part from the URL
  const filePageMatch = decodeURIComponent(sourceUrl).match(/(?:File|Datei):[^/]+$/)
  if (!filePageMatch) {
    return {
      success: false,
      error: {
        message: 'Could not extract file string from URL',
        detail: sourceUrl,
        createdAt: new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' }),
      },
      data: { sourceUrl },
    } as const
  }
  const filePage = filePageMatch[0]

  // MediaWiki API endpoint
  const validOrigin = [
    'https://wiki.openstreetmap.org',
    'https://de.wikipedia.org',
    'https://upload.wikimedia.org',
    'https://commons.wikimedia.org',
  ]
  const sourceOrigin = new URL(sourceUrl).origin
  if (!validOrigin.includes(sourceOrigin)) {
    return {
      success: false,
      error: {
        message: 'Unknown Wikimedia host',
        detail: `Origin: ${sourceOrigin}, Valid origins: ${validOrigin.join(', ')}`,
        createdAt: new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' }),
      },
      data: { sourceOrigin, validOrigin },
    } as const
  }

  const apiUrl = new URL(`${sourceOrigin}/w/api.php`)
  apiUrl.searchParams.append('action', 'query')
  apiUrl.searchParams.append('titles', filePage)
  apiUrl.searchParams.append('prop', 'imageinfo')
  apiUrl.searchParams.append('iiprop', 'url')
  apiUrl.searchParams.append('format', 'json')

  // Get imageInfo.url
  let response: Response
  try {
    response = await fetchWithWikimediaPolicy(apiUrl.toString())
  } catch (error) {
    return {
      success: false,
      error: {
        message: 'Wikimedia API request failed',
        detail: error instanceof Error ? error.message : String(error),
        createdAt: errorDate(),
      },
      data: { sourceUrl },
    } as const
  }

  if (!response.ok) {
    const detail = await response.text()
    return {
      success: false,
      error: {
        message: `Wikimedia API returned ${response.status}`,
        detail,
        createdAt: errorDate(),
      },
      data: { apiUrl: apiUrl.toString() },
    } as const
  }

  let data: unknown
  try {
    data = await response.json()
  } catch (error) {
    return {
      success: false,
      error: {
        message: 'Could not parse Wikimedia API response as JSON',
        detail: error instanceof Error ? error.message : String(error),
        createdAt: errorDate(),
      },
      data: { apiUrl: apiUrl.toString() },
    } as const
  }

  if (isRecord(data) && isRecord(data.error)) {
    return {
      success: false,
      error: {
        message: 'Wikimedia API returned an error payload',
        detail: JSON.stringify(data.error, undefined, 2),
        createdAt: errorDate(),
      },
      data: { apiUrl: apiUrl.toString() },
    } as const
  }

  const page = extractFirstPage(data)
  if (page?.missing !== undefined) {
    return {
      success: false,
      error: {
        message: 'Wiki file does not exist',
        reason: 'wiki_file_missing' as const,
        detail: JSON.stringify(data, undefined, 2),
        createdAt: errorDate(),
      },
      data: { apiUrl: apiUrl.toString(), sourceUrl },
    } as const
  }

  const imageInfo = Array.isArray(page?.imageinfo) ? page.imageinfo[0] : undefined

  if (!isRecord(imageInfo) || typeof imageInfo.url !== 'string') {
    return {
      success: false,
      error: {
        message: 'Could not extract imageinfo from API response',
        detail: JSON.stringify(data, undefined, 2),
        createdAt: errorDate(),
      },
      data: { apiUrl: apiUrl.toString() },
    } as const
  }

  return { success: true, url: imageInfo.url } as const
}
