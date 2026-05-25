import { describe, expect, test } from 'bun:test'
import {
  activeCatalogueFocusView,
  filterSignsByFocus,
  focusLevel,
  isAlleOnlySign,
  isHighlightedInView,
  isInCatalogueView,
  matchesFocusFilter,
} from './catalogueFocus.js'
import type { SignType } from './TrafficSignDataTypes.js'

const sign = (focus?: SignType['catalogue']['focus']): SignType =>
  ({
    osmValuePart: 'test',
    signId: 'test',
    name: 'test',
    descriptiveName: 'test',
    description: null,
    kind: 'traffic_sign',
    tagRecommendations: {},
    catalogue: { signCategory: 'traffic_sign', focus },
    image: { kind: 'local', sourceLocalPath: 'x.svg', licence: 'Public Domain' },
  }) as SignType

describe('catalogue focus', () => {
  test('implicit Standard membership when focus omitted', () => {
    const s = sign()
    expect(focusLevel(s, 'default')).toBe(true)
    expect(focusLevel(s, 'highway')).toBeUndefined()
    expect(matchesFocusFilter(s, ['default'])).toBe(true)
    expect(matchesFocusFilter(s, ['highway'])).toBe(false)
  })

  test('default highlight', () => {
    const s = sign({ default: 'highlight' })
    expect(isHighlightedInView(s, 'default')).toBe(true)
    expect(isInCatalogueView(s, 'default')).toBe(true)
  })

  test('thematic highway only', () => {
    const s = sign({ highway: true })
    expect(matchesFocusFilter(s, ['default'])).toBe(false)
    expect(matchesFocusFilter(s, ['highway'])).toBe(true)
    expect(matchesFocusFilter(s, ['all'])).toBe(true)
  })

  test('thematic highlight in highway tab', () => {
    const s = sign({ highway: 'highlight' })
    expect(isHighlightedInView(s, 'highway')).toBe(true)
    expect(activeCatalogueFocusView(['highway'])).toBe('highway')
  })

  test('alle only sign', () => {
    const s = sign({ all: true })
    expect(isAlleOnlySign(s)).toBe(true)
    expect(matchesFocusFilter(s, ['default'])).toBe(false)
    expect(matchesFocusFilter(s, ['all'])).toBe(true)
  })

  test('filterSignsByFocus', () => {
    const signs = [
      sign(),
      sign({ highway: true }),
      sign({ all: true }),
      sign({ parking: 'highlight' }),
    ]
    expect(filterSignsByFocus(signs, ['default']).map((s) => s.osmValuePart)).toEqual(['test'])
    expect(filterSignsByFocus(signs, ['highway']).length).toBe(1)
    expect(filterSignsByFocus(signs, ['all']).length).toBe(4)
  })

  test('no featured strip on Alle', () => {
    expect(activeCatalogueFocusView(['all'])).toBeNull()
  })
})
