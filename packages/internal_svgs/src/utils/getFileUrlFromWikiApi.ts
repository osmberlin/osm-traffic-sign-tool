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

  const apiUrl = `${sourceOrigin}/w/api.php`
  // @ts-expect-error TODO why does this fail out of the blue? It follows https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#using_urlsearchparams
  const params = new URLSearchParams({
    action: 'query',
    titles: filePage,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
  })

  // Get imageInfo.url
  const response = await fetch(`${apiUrl}?${params.toString()}`)
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
