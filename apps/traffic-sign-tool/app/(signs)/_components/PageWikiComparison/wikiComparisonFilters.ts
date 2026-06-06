import type { WikiSign } from '@internal/wiki'
import {
  filterSignsByFocus,
  focusAreas,
  isAllFocus,
  isSignSvgMissing,
  isSignSvgUnavailable,
  trafficSignTagToSigns,
  type CountryPrefixType,
  type FocusArea,
  type FocusFilterCounts,
  type SignStateType,
  type SignType,
} from '@osm-traffic-signs/converter'

export type WikiComparisonRow = WikiSign & { toolSign?: SignStateType }

export type WikiComparisonStatusFilter = 'all' | 'missing' | 'matched' | 'missing_svg'

export const wikiComparisonStatusFilters = [
  'all',
  'missing',
  'matched',
  'missing_svg',
] as const satisfies readonly WikiComparisonStatusFilter[]

export const isWikiSignImageMissing = (row: WikiComparisonRow): boolean =>
  !row.imageSvg || (row.imageUrl?.includes('Special:Upload') ?? false)

/** Minimal sign shape for wiki-column missing-SVG placeholder. */
export const getWikiRowPlaceholderSign = (
  row: WikiComparisonRow,
): Pick<SignType, 'osmValuePart' | 'name'> => {
  if (row.toolSign?.recodgnizedSign) {
    return row.toolSign
  }

  const colonIndex = row.sign.indexOf(':')
  const osmValuePart = colonIndex === -1 ? row.sign : row.sign.slice(colonIndex + 1)

  return { osmValuePart, name: row.name }
}

export const isWikiRowMissingSvg = (
  row: WikiComparisonRow,
  countryPrefix: CountryPrefixType,
): boolean => {
  if (!row.toolSign?.recodgnizedSign) return false
  return isSignSvgUnavailable(countryPrefix, row.toolSign) || isWikiSignImageMissing(row)
}

export const isWikiRowWikiSvgMissing = (row: WikiComparisonRow): boolean => {
  if (!row.toolSign?.recodgnizedSign) return false
  return isSignSvgMissing(row.toolSign) || isWikiSignImageMissing(row)
}

export const enrichWikiSigns = (
  wikiSigns: WikiSign[],
  countryPrefix: CountryPrefixType,
): WikiComparisonRow[] => {
  const rows: WikiComparisonRow[] = structuredClone(wikiSigns)

  for (const sign of rows) {
    const cleanSign = sign.sign.replace('traffic_sign', '')
    sign.toolSign = trafficSignTagToSigns(cleanSign, countryPrefix).at(0)
  }

  return rows
}

export const isWikiRowMissingInCatalogue = (row: WikiComparisonRow): boolean =>
  !row.toolSign?.recodgnizedSign

export const countWikiRowsByStatus = (
  rows: WikiComparisonRow[],
  countryPrefix: CountryPrefixType,
) => ({
  all: rows.length,
  missing: rows.filter(isWikiRowMissingInCatalogue).length,
  matched: rows.filter((row) => !isWikiRowMissingInCatalogue(row)).length,
  missing_svg: rows.filter((row) => isWikiRowMissingSvg(row, countryPrefix)).length,
})

export const filterWikiRowsByStatus = (
  rows: WikiComparisonRow[],
  statusFilter: WikiComparisonStatusFilter,
  countryPrefix: CountryPrefixType,
): WikiComparisonRow[] => {
  if (statusFilter === 'all') return rows
  if (statusFilter === 'missing') return rows.filter(isWikiRowMissingInCatalogue)
  if (statusFilter === 'missing_svg') {
    return rows.filter((row) => isWikiRowMissingSvg(row, countryPrefix))
  }
  return rows.filter((row) => !isWikiRowMissingInCatalogue(row))
}

const getRowOsmValuePart = (row: WikiComparisonRow): string | undefined =>
  row.toolSign?.recodgnizedSign ? row.toolSign.osmValuePart : undefined

export const filterWikiRowsByFocus = (
  rows: WikiComparisonRow[],
  trafficSignData: SignType[],
  focuses: FocusArea[],
): WikiComparisonRow[] => {
  if (isAllFocus(focuses)) return rows

  const allowed = new Set(
    filterSignsByFocus(trafficSignData, focuses).map((sign) => sign.osmValuePart),
  )

  return rows.filter((row) => {
    const osmValuePart = getRowOsmValuePart(row)
    return osmValuePart ? allowed.has(osmValuePart) : false
  })
}

export const countWikiRowsByFocus = (
  rows: WikiComparisonRow[],
  trafficSignData: SignType[],
): FocusFilterCounts =>
  Object.fromEntries(
    focusAreas.map((focus) => [
      focus,
      filterWikiRowsByFocus(rows, trafficSignData, [focus]).length,
    ]),
  ) as FocusFilterCounts
