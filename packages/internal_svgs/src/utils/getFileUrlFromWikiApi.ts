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
  const response = await fetch(apiUrl.toString(), {
    headers: {
      'User-Agent':
        'osm-traffic-sign-tools (https://github.com/FixMyBerlin/osm-traffic-sign-tools)',
    },
  })
  const data = (await response.json()) as any
  const pages = data.query.pages
  const page = Object.values(pages)[0] as any
  const imageInfo = page?.imageinfo?.[0]

  if (!imageInfo) {
    return {
      success: false,
      error: {
        message: 'Could not extract imageinfo from API response',
        detail: JSON.stringify(data, undefined, 2),
        createdAt: new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' }),
      },
      data: { response },
    } as const
  }

  return { success: true, url: imageInfo.url as string } as const
}
