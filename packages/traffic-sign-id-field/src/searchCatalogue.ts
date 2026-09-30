import type { SignType } from '@osm-traffic-signs/converter'

export type SearchCatalogueOptions = {
  /** Signs for which this returns true are hidden (e.g. incompatible combinations). */
  exclude?: (sign: SignType) => boolean
}

/** "Häufig verwendet" in the tool's catalogue: any focus view marked 'highlight'. */
export const isPromotedSign = (sign: SignType) => {
  const focus = sign.catalogue?.focus
  return focus ? Object.values(focus).includes('highlight') : false
}

/**
 * Lower score = better match. `null` = no match.
 * Exact and prefix matches on the sign ID rank above name matches so that
 * mappers who know the code get it first, while name searches still work.
 */
const scoreSign = (sign: SignType, q: string): number | null => {
  const id = (sign.signId ?? '').toLowerCase()
  const code = sign.osmValuePart.toLowerCase()
  if (id === q || code === q) return 0
  if (id.startsWith(q) || code.startsWith(q)) return 1

  const names = [sign.name, sign.descriptiveName]
    .filter((name): name is string => !!name)
    .map((name) => name.toLowerCase())
  if (names.some((name) => name.startsWith(q))) return 2
  if (names.some((name) => name.split(/\s+/).some((word) => word.startsWith(q)))) return 3
  if (names.some((name) => name.includes(q))) return 4

  if (id.includes(q) || code.includes(q)) return 5
  if (sign.description?.toLowerCase().includes(q)) return 6
  return null
}

/**
 * Empty query: the full catalogue, promoted signs first (browse mode).
 * With a query: all matches ranked by relevance; promotion breaks ties.
 * No result cap — the dropdown scrolls.
 */
export const searchCatalogue = (
  catalogue: SignType[],
  query: string,
  options?: SearchCatalogueOptions,
): SignType[] => {
  const exclude = options?.exclude
  const candidates = exclude ? catalogue.filter((sign) => !exclude(sign)) : catalogue

  const q = query.trim().toLowerCase()
  if (!q) {
    return candidates
      .map((sign, index) => ({ sign, index, promoted: isPromotedSign(sign) }))
      .sort((a, b) => Number(b.promoted) - Number(a.promoted) || a.index - b.index)
      .map((entry) => entry.sign)
  }

  const scored: Array<{ sign: SignType; score: number; promoted: boolean }> = []
  for (const sign of candidates) {
    const score = scoreSign(sign, q)
    if (score !== null) scored.push({ sign, score, promoted: isPromotedSign(sign) })
  }

  return scored
    .sort((a, b) => a.score - b.score || Number(b.promoted) - Number(a.promoted))
    .map((entry) => entry.sign)
}
