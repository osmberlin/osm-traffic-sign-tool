import type * as cheerio from 'cheerio'
import type { WikiSign } from '../wikiSignTypes.js'

export type ParsedWikiRow = {
  signId: string
  name: string
  imageUrl?: string
  imageSvg?: string
  tagsText: string
  isNa: boolean
}

export const parseWikiTags = (tagsText: string): { key: string; value: string }[] => {
  if (!tagsText || /^(n\/a|na|–|-|\*|= \*)$/i.test(tagsText.trim())) return []
  const tags: { key: string; value: string }[] = []
  const normalized = tagsText.replace(/\s+/g, ' ')
  const tagPatterns = [
    ...normalized.matchAll(/([a-z0-9:_-]+)\s*=\s*([^`\s,;]+(?:\[[^\]]+\])?)/gi),
    ...normalized.matchAll(/([a-z0-9:_-]+)\s+([a-z0-9:_*-]+)\s*`=`/gi),
  ]
  for (const match of tagPatterns) {
    const key = match[1]!
    const value = match[2]!.replace(/`/g, '')
    if (key === 'traffic_sign' || value === '*' || value === '=*') continue
    if (!tags.some((t) => t.key === key && t.value === value)) {
      tags.push({ key, value })
    }
  }
  return tags
}

export const extractTrafficSignId = (rowText: string, prefix: string): string | null => {
  const explicit =
    rowText.match(new RegExp(`traffic_sign\\s*=\\s*${prefix}:([^\\s,;]+)`, 'i')) ??
    rowText.match(new RegExp(`traffic_sign\\s*=\\s*([A-Z]{2}(?:-[A-Z]{2})?):([^\\s,;]+)`, 'i'))
  if (explicit) {
    const id = explicit[2] ?? explicit[1]
    return id!.replace(/`/g, '').trim()
  }
  const codeMatch = rowText.match(
    /\b([A-Z]-\d+[a-z]?|[A-Z]\d+[a-z]?|[A-Z]{1,2}\d+[a-z.-]*|\d+[a-z](?:\.\d+)?(?:-\d+[a-z]?)?)\b/,
  )
  if (codeMatch) return codeMatch[1]!
  const numbered = rowText.match(/^(\d+[a-z]?(?:\.\d+)?(?:-\d+)?)\s*:/)
  if (numbered) return numbered[1]!
  return null
}

const wikiImageUrl = (href: string | undefined) => {
  if (!href) return undefined
  return href.startsWith('http') ? href : `https://wiki.openstreetmap.org${href}`
}

const imageSvgFromThumbSrc = (src: string | undefined) => {
  if (!src?.includes('.svg')) return undefined
  return `${src.split('.svg')[0]?.replace('thumb/', '')}.svg`
}

const wikiSignCodeOnly = (text: string) => /^[A-Z]{1,2}\d[\w.+-]*$/i.test(text.trim())

/** Strip OSM wiki cross-references and notes that get flattened into name cells. */
export const cleanWikiSignName = (rawName: string): string => {
  let name = rawName.replace(/\s+/g, ' ').trim()
  name = name.replace(/^\|\s*/, '')
  name = name.replace(/^Remarques\s*:\s*/i, '')
  const cutPatterns = [
    /\s+Siehe:.*/i,
    /\s+Notiz:.*/i,
    /\s+Anmerkungen:.*/i,
    /\s+Hinweis:.*/i,
    /\s+Ab hier\b.*/i,
    /\s+Wikipedia:.*/i,
    /\s+Höchstgeschwindigkeit:.*/i,
    /\s+Voir aussi.*/i,
    /\s+Note\s*:.*/i,
    /\s+Même remarque.*/i,
    /\s+\|\s*rowspan.*/i,
    /\s+\d+px.*/i,
    /\s+\*.*/,
  ]
  for (const pattern of cutPatterns) {
    name = name.replace(pattern, '')
  }
  return name.trim()
}

const looksLikeWikiInstructionName = (name: string): boolean => {
  const trimmed = cleanWikiSignName(name)
  return /on utilise un attibut|voir la page|ajouter un\b/i.test(trimmed)
}

const looksLikeWikiTagOnlyCell = (text: string): boolean => {
  const trimmed = text.trim()
  if (/^destination:/i.test(trimmed) && /=/.test(trimmed)) return true
  return /^[a-z][a-z0-9:_-]*=[^=]+$/i.test(trimmed) && !trimmed.includes(' ')
}

export const isWikiTaggingCell = (text: string): boolean => {
  const trimmed = text.trim()
  return (
    /^Als\s/i.test(trimmed) ||
    /^Sur un (node|way|le)\b/i.test(trimmed) ||
    /^Sur une\b/i.test(trimmed) ||
    /^Ajouter un\b/i.test(trimmed) ||
    /^Na (linii|węźle|obszarze)\b/i.test(trimmed) ||
    /^Remarques\s*:\s*$/i.test(trimmed) ||
    /^\d+px$/i.test(trimmed) ||
    wikiSignCodeOnly(trimmed) ||
    looksLikeWikiTagOnlyCell(trimmed) ||
    trimmed.includes('traffic_sign=') ||
    trimmed.includes('traffic_sign =') ||
    /:hazard=/i.test(trimmed)
  )
}

export const looksLikeWikiSignNameCell = (text: string): boolean => {
  const trimmed = text.trim().replace(/^\|\s*/, '')
  if (!trimmed || isWikiTaggingCell(trimmed) || /^fixme:/i.test(trimmed)) return false
  if (
    /^(?:\d+[a-z]?(?:[./][a-z]+)*(?:\[[^\]]*\])?|\d+\.\d+[a-z]?(?:\[[^\]]*\])?|[A-Za-z]{1,3}_[\w.]+|[a-z])(?:\s+groß)?:\s/.test(
      trimmed,
    )
  ) {
    return true
  }
  return /^[A-Z]{1,2}\d[\w.+-]*\s*:\s/.test(trimmed)
}

export const finalizeWikiSignName = (rawName: string, signId: string): string => {
  if (looksLikeWikiInstructionName(rawName)) return signId
  const cleaned = cleanWikiSignName(rawName).slice(0, 200)
  if (!cleaned || /^(Remarques|Remarque|\?)$/i.test(cleaned)) return signId
  return cleaned
}

const wikiSignNameQuality = (name: string, signId: string): number => {
  const finalized = finalizeWikiSignName(name, signId)
  if (finalized === signId) return 0
  if (looksLikeWikiInstructionName(finalized)) return 1
  if (finalized.length > 80) return 2
  return 3
}

const extractNameFromCell = (
  $: cheerio.CheerioAPI,
  cell: Parameters<cheerio.CheerioAPI>[0],
): string => {
  const $cell = $(cell)
  const bold = $cell.find('b').first().text().replace(/\s+/g, ' ').trim()
  return cleanWikiSignName((bold || $cell.text()).replace(/\s+/g, ' ').trim())
}

const pickWikiRowName = (
  $: cheerio.CheerioAPI,
  cells: ReturnType<cheerio.CheerioAPI>,
  rowTexts: string[],
  signId: string,
): string => {
  const nameCellIndex = [...rowTexts]
    .map((text, index) => ({ text, index }))
    .reverse()
    .find(({ text }) => looksLikeWikiSignNameCell(text))?.index

  if (nameCellIndex !== undefined) {
    const cell = cells.get(nameCellIndex)
    if (cell) return finalizeWikiSignName(extractNameFromCell($, cell), signId)
  }

  const fallbackCandidates = rowTexts.filter(
    (text) =>
      text.length > 3 &&
      text !== signId &&
      !isWikiTaggingCell(text) &&
      !text.includes('traffic_sign'),
  )
  const fallback = fallbackCandidates[fallbackCandidates.length - 1] ?? signId

  return finalizeWikiSignName(fallback, signId)
}

const pickWikiRowTagsText = (rowTexts: string[]): string => {
  const taggingCell = rowTexts.find((text) => isWikiTaggingCell(text))
  return taggingCell ?? rowTexts[rowTexts.length - 1] ?? ''
}

export const parseBelgiumTable = ($: cheerio.CheerioAPI): ParsedWikiRow[] => {
  const signs: ParsedWikiRow[] = []
  $('table.wikitable tbody tr').each((_, row) => {
    const cells = $(row).find('td')
    if (cells.length < 3) return
    const signId = $(cells[0]).text().trim()
    if (!signId || signId.toLowerCase() === 'sign') return
    const imgHref = $(cells[1]).find('a').first().attr('href')
    const imgSrc = $(cells[1]).find('img').attr('src')
    const imageUrl = wikiImageUrl(imgHref)
    const tagsText = $(cells[3] ?? cells[2])
      .text()
      .trim()
    const name =
      $(cells[2] ?? cells[1])
        .text()
        .trim() || signId
    const isNa = /^(n\/a|na)$/i.test(tagsText)
    signs.push({
      signId,
      name,
      imageUrl,
      imageSvg: imageSvgFromThumbSrc(imgSrc),
      tagsText,
      isNa,
    })
  })
  return signs
}

export const parseUniversalTable = ($: cheerio.CheerioAPI, prefix: string): ParsedWikiRow[] => {
  const signMap = new Map<string, ParsedWikiRow>()
  $('table.wikitable tbody tr').each((_, row) => {
    const cells = $(row).find('td')
    if (cells.length < 2) return
    const rowTexts = cells.map((_, cell) => $(cell).text().replace(/\s+/g, ' ').trim()).get()
    const rowText = rowTexts.join(' ')
    if (!rowText || /^(sign|znak|placa|image|bild)/i.test(rowTexts[0] ?? '')) return

    const signId = extractTrafficSignId(rowText, prefix)
    if (!signId || signId.length > 40 || /^(image|sign|panneau)$/i.test(signId)) return

    const imgHref = $(cells[0]).find('a').attr('href') ?? $(cells[1]).find('a').attr('href')
    const imgSrc = $(cells[0]).find('img').attr('src') ?? $(cells[1]).find('img').attr('src')
    const imageUrl = wikiImageUrl(imgHref)
    const tagsText = pickWikiRowTagsText(rowTexts)
    const name = pickWikiRowName($, cells, rowTexts, signId)
    const isNa = /^(n\/a|na|n\/a\.?)$/i.test(tagsText) || /N\/A/i.test(tagsText)

    const entry: ParsedWikiRow = {
      signId,
      name,
      imageUrl,
      imageSvg: imageSvgFromThumbSrc(imgSrc),
      tagsText,
      isNa,
    }
    const existing = signMap.get(signId)
    if (
      !existing ||
      wikiSignNameQuality(name, signId) > wikiSignNameQuality(existing.name, signId)
    ) {
      signMap.set(signId, entry)
    }
  })
  return [...signMap.values()]
}

export type ParsedDeWikiRow = ParsedWikiRow & {
  deOsmTags: string[]
  deComments: string
}

type DeWikiTableRow = {
  find: (selector: string) => {
    first: () => { text: () => string }
    text: () => string
    attr: (name: string) => string | undefined
    map: <T>(fn: (index: number, element: unknown) => T) => { get: () => T[] }
  }
}

/** OSM Wiki switched German sign keys from `<tt>` to `<code>`; support both. */
export const extractDeTrafficSignValue = ($row: DeWikiTableRow): string | undefined => {
  const monoText = $row.find('td:nth-child(1) tt, td:nth-child(1) code').first().text().trim()
  if (monoText.includes('=')) {
    return monoText.split('=').at(1)?.trim()
  }

  const cellText = $row.find('td:nth-child(1)').text().replace(/\s+/g, ' ').trim()
  const match = cellText.match(/traffic_sign\s*=\s*(\S+)/i)
  return match?.[1]
}

export const parseDeRowIdTable = ($: cheerio.CheerioAPI): ParsedDeWikiRow[] => {
  const parsedObjects: ParsedDeWikiRow[] = []
  const selector = 'tr[id^="Zeichen_"], tr[id^="Zusatzzeichen_"]'
  $(selector).each((_, row) => {
    const $row = $(row)
    const signRaw = extractDeTrafficSignValue($row)
    if (!signRaw) return

    const signId = signRaw.replace(/^traffic_sign/i, '').trim()
    const imgSrc = $row.find('td:nth-child(1) a img').attr('src')
    const imagePath = $row.find('td:nth-child(1) a').attr('href')
    const imageUrl = imagePath ? `https://wiki.openstreetmap.org${imagePath}` : undefined
    const name = $row.find('td:nth-child(3) big').text()
    const deOsmTags = $row
      .find('td:nth-child(2) li')
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(Boolean)
    const deComments = $row
      .find('td:nth-child(3)')
      .text()
      .replace(name, '')
      .replace('Anmerkungen:', '')
      .replace(/[\n\t]+/g, ' ')
      .replace('  ', ' ')
      .trim()

    parsedObjects.push({
      signId,
      name,
      imageUrl,
      imageSvg: imageSvgFromThumbSrc(imgSrc),
      tagsText: deOsmTags.join(' '),
      isNa: false,
      deOsmTags,
      deComments,
    })
  })

  return parsedObjects
}

export const toWikiSign = (
  countryPrefix: string,
  row: ParsedWikiRow | ParsedDeWikiRow,
): WikiSign | null => {
  if (!row.signId) return null

  const sign = row.signId.includes(':') ? row.signId : `${countryPrefix}:${row.signId}`
  const osmTags =
    'deOsmTags' in row && row.deOsmTags.length > 0
      ? row.deOsmTags
      : parseWikiTags(row.tagsText).map((tag) => `${tag.key}=${tag.value}`)

  return {
    sign,
    imageSvg: row.imageSvg,
    imageUrl: row.imageUrl,
    name: row.name,
    osmTags,
    comments: 'deComments' in row ? row.deComments : row.isNa ? 'N/A' : '',
  }
}

export const dedupeWikiSigns = (signs: WikiSign[]): WikiSign[] => {
  const signMap = new Map<string, WikiSign>()
  for (const sign of signs) {
    if (!signMap.has(sign.sign)) {
      signMap.set(sign.sign, sign)
    }
  }
  return [...signMap.values()]
}
