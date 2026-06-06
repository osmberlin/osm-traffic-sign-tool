import type { WikiSign } from '@internal/wiki'
import {
  filterSignsByFocus,
  focusAreas,
  isAllFocus,
  trafficSignTagToSigns,
  type CountryPrefixType,
  type FocusArea,
  type FocusFilterCounts,
  type SignStateType,
  type SignType,
} from '@osm-traffic-signs/converter'

export type WikiComparisonRow = WikiSign & { toolSign?: SignStateType }

export type WikiComparisonStatusFilter = 'all' | 'missing' | 'matched'

export const wikiComparisonStatusFilters = [
  'all',
  'missing',
  'matched',
] as const satisfies readonly WikiComparisonStatusFilter[]

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

export const countWikiRowsByStatus = (rows: WikiComparisonRow[]) => ({
  all: rows.length,
  missing: rows.filter(isWikiRowMissingInCatalogue).length,
  matched: rows.filter((row) => !isWikiRowMissingInCatalogue(row)).length,
})

export const filterWikiRowsByStatus = (
  rows: WikiComparisonRow[],
  statusFilter: WikiComparisonStatusFilter,
): WikiComparisonRow[] => {
  if (statusFilter === 'all') return rows
  if (statusFilter === 'missing') return rows.filter(isWikiRowMissingInCatalogue)
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
