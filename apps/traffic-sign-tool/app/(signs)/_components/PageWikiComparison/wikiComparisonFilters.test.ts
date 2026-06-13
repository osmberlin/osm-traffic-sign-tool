import { describe, expect, test } from 'vitest'
import {
  countWikiRowsByFocus,
  countWikiRowsByStatus,
  enrichWikiSigns,
  filterWikiRowsByFocus,
  filterWikiRowsByStatus,
  getWikiRowPlaceholderSign,
  isWikiRowMissingInCatalogue,
  isWikiRowMissingSvg,
  type WikiComparisonRow,
} from './wikiComparisonFilters'

const sampleRows: WikiComparisonRow[] = [
  {
    sign: 'DE:239',
    name: 'Matched',
    imageSvg: 'https://upload.wikimedia.org/wikipedia/commons/example.svg',
    osmTags: [],
    comments: '',
    toolSign: {
      osmValuePart: '239',
      recodgnizedSign: true,
      image: { kind: 'remote', sourceUrl: 'https://example.com', licence: 'Public Domain' },
    } as never,
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

  test('getWikiRowPlaceholderSign', () => {
    expect(getWikiRowPlaceholderSign(sampleRows[0]).osmValuePart).toBe('239')
    expect(getWikiRowPlaceholderSign(sampleRows[1]).osmValuePart).toBe('999')
  })

  test('countWikiRowsByStatus', () => {
    expect(countWikiRowsByStatus(sampleRows, 'DE')).toEqual({
      all: 2,
      missing: 1,
      matched: 1,
      missing_svg: 0,
    })
  })

  test('isWikiRowMissingSvg', () => {
    const missingSvgRow: WikiComparisonRow = {
      sign: 'BR:A-49a',
      name: 'Missing SVG',
      osmTags: [],
      comments: '',
      imageUrl:
        'https://wiki.openstreetmap.org/w/index.php?title=Special:Upload&wpDestFile=Brasil_A-49a.svg',
      toolSign: {
        osmValuePart: 'A-49a',
        recodgnizedSign: true,
        image: 'missing',
      } as never,
    }

    expect(isWikiRowMissingSvg(missingSvgRow, 'BR')).toBe(true)
    expect(isWikiRowMissingSvg(sampleRows[0], 'DE')).toBe(false)
    expect(isWikiRowMissingSvg(sampleRows[1], 'DE')).toBe(false)
  })

  test('filterWikiRowsByStatus missing_svg', () => {
    const rows: WikiComparisonRow[] = [
      {
        sign: 'BR:A-49a',
        name: 'Missing SVG',
        osmTags: [],
        comments: '',
        toolSign: {
          osmValuePart: 'A-49a',
          recodgnizedSign: true,
          image: 'missing',
        } as never,
      },
      {
        sign: 'BR:A-48',
        name: 'Bundled',
        imageSvg: 'https://upload.wikimedia.org/wikipedia/commons/example.svg',
        osmTags: [],
        comments: '',
        toolSign: {
          osmValuePart: 'A-48',
          recodgnizedSign: true,
          image: { kind: 'remote', sourceUrl: 'https://example.com', licence: 'Public Domain' },
        } as never,
      },
    ]

    expect(filterWikiRowsByStatus(rows, 'missing_svg', 'BR').map((row) => row.sign)).toEqual([
      'BR:A-49a',
    ])
  })

  test('filterWikiRowsByStatus', () => {
    expect(filterWikiRowsByStatus(sampleRows, 'missing', 'DE').map((row) => row.sign)).toEqual([
      'DE:999',
    ])
    expect(filterWikiRowsByStatus(sampleRows, 'matched', 'DE').map((row) => row.sign)).toEqual([
      'DE:239',
    ])
  })

  test('filterWikiRowsByFocus keeps all rows on Alle focus', () => {
    expect(filterWikiRowsByFocus(sampleRows, [], ['all'])).toHaveLength(2)
  })

  test('filterWikiRowsByFocus matches catalogue focus', () => {
    const trafficSignData = [
      { osmValuePart: '239', catalogue: { focus: { default: true } } },
      { osmValuePart: '200', catalogue: { focus: { highway: true } } },
    ] as never

    const filtered = filterWikiRowsByFocus(sampleRows, trafficSignData, ['default'])
    expect(filtered.map((row) => row.sign)).toEqual(['DE:239'])
  })

  test('countWikiRowsByFocus', () => {
    const trafficSignData = [
      { osmValuePart: '239', catalogue: { focus: { default: true } } },
      { osmValuePart: '200', catalogue: { focus: { highway: true } } },
    ] as never

    const counts = countWikiRowsByFocus(sampleRows, trafficSignData)

    expect(counts.default).toBe(1)
    expect(counts.highway).toBe(0)
    expect(counts.all).toBe(2)
  })

  test('enrichWikiSigns falls back to wiki name when sign id is abbreviated', () => {
    const [row] = enrichWikiSigns(
      [
        {
          sign: 'AU:R1',
          name: 'R1-1',
          imageSvg: 'https://example.com/r1-1.svg',
          osmTags: ['highway=stop'],
          comments: '',
        },
      ],
      'AU',
    )

    expect(row?.toolSign?.recodgnizedSign).toBe(true)
    expect(row?.toolSign?.osmValuePart).toBe('R1-1')
    expect(isWikiRowMissingInCatalogue(row!)).toBe(false)
  })
})
