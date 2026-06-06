import { describe, expect, test } from 'vitest'
import {
  countWikiRowsByFocus,
  countWikiRowsByStatus,
  filterWikiRowsByFocus,
  filterWikiRowsByStatus,
  isWikiRowMissingInCatalogue,
  type WikiComparisonRow,
} from './wikiComparisonFilters'

const sampleRows: WikiComparisonRow[] = [
  {
    sign: 'DE:100',
    name: 'Matched',
    osmTags: [],
    comments: '',
    toolSign: { osmValuePart: '100', recodgnizedSign: true } as never,
  },
  {
    sign: 'DE:999',
    name: 'Missing',
    osmTags: [],
    comments: '',
  },
]

describe('wikiComparisonFilters', () => {
  test('isWikiRowMissingInCatalogue', () => {
    expect(isWikiRowMissingInCatalogue(sampleRows[0])).toBe(false)
    expect(isWikiRowMissingInCatalogue(sampleRows[1])).toBe(true)
  })

  test('countWikiRowsByStatus', () => {
    expect(countWikiRowsByStatus(sampleRows)).toEqual({
      all: 2,
      missing: 1,
      matched: 1,
    })
  })

  test('filterWikiRowsByStatus', () => {
    expect(filterWikiRowsByStatus(sampleRows, 'missing').map((row) => row.sign)).toEqual(['DE:999'])
    expect(filterWikiRowsByStatus(sampleRows, 'matched').map((row) => row.sign)).toEqual(['DE:100'])
  })

  test('filterWikiRowsByFocus keeps all rows on Alle focus', () => {
    expect(filterWikiRowsByFocus(sampleRows, [], ['all'])).toHaveLength(2)
  })

  test('filterWikiRowsByFocus matches catalogue focus', () => {
    const trafficSignData = [
      { osmValuePart: '100', catalogue: { focus: { default: true } } },
      { osmValuePart: '200', catalogue: { focus: { highway: true } } },
    ] as never

    const filtered = filterWikiRowsByFocus(sampleRows, trafficSignData, ['default'])
    expect(filtered.map((row) => row.sign)).toEqual(['DE:100'])
  })

  test('countWikiRowsByFocus', () => {
    const trafficSignData = [
      { osmValuePart: '100', catalogue: { focus: { default: true } } },
      { osmValuePart: '200', catalogue: { focus: { highway: true } } },
    ] as never

    const counts = countWikiRowsByFocus(sampleRows, trafficSignData)

    expect(counts.default).toBe(1)
    expect(counts.highway).toBe(0)
    expect(counts.all).toBe(2)
  })
})
