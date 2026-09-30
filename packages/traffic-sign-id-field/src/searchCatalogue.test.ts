import type { SignType } from '@osm-traffic-signs/converter'
import { describe, expect, it } from 'vitest'
import { searchCatalogue } from './searchCatalogue.js'
import { isSignExcludedByCompatibility } from './signCompatibility.js'

const sign = (overrides: Partial<SignType>): SignType =>
  ({
    osmValuePart: '240',
    signId: '240',
    name: 'Zeichen 240',
    descriptiveName: 'Gemeinsamer Geh- und Radweg',
    description: null,
    catalogue: { signCategory: 'traffic_sign' },
    ...overrides,
  }) as SignType

const catalogue = [
  sign({}),
  sign({
    osmValuePart: '244.1',
    signId: '244.1',
    name: 'Zeichen 244.1',
    descriptiveName: 'Fahrradstraße',
  }),
  sign({
    osmValuePart: '274[30]',
    signId: '274',
    name: 'Zeichen 274',
    descriptiveName: 'Zulässige Höchstgeschwindigkeit 30',
    description: 'Tempolimit auf 30 km/h',
  }),
  sign({
    osmValuePart: '274.1',
    signId: '274.1',
    name: 'Zeichen 274.1',
    descriptiveName: 'Tempo 30-Zone',
    catalogue: { signCategory: 'traffic_sign', focus: { default: 'highlight' } },
  }),
]

describe('searchCatalogue', () => {
  it('returns the full catalogue for an empty query, promoted signs first', () => {
    const results = searchCatalogue(catalogue, '')
    expect(results).toHaveLength(catalogue.length)
    expect(results[0]?.signId).toBe('274.1') // the only promoted sign
    expect(results.slice(1).map((s) => s.signId)).toEqual(['240', '244.1', '274'])
  })

  it('ranks exact sign id matches first', () => {
    const results = searchCatalogue(catalogue, '274')
    expect(results[0]?.signId).toBe('274')
    expect(results[1]?.signId).toBe('274.1')
  })

  it('finds signs by local name, ranking name-prefix above substring', () => {
    const results = searchCatalogue(catalogue, 'tempo')
    expect(results[0]?.descriptiveName).toBe('Tempo 30-Zone')
    expect(results.map((s) => s.signId)).toContain('274')
  })

  it('matches word prefixes inside names', () => {
    const results = searchCatalogue(catalogue, 'radweg')
    expect(results.map((s) => s.signId)).toContain('240')
  })

  it('is case-insensitive', () => {
    expect(searchCatalogue(catalogue, 'FAHRRAD')[0]?.signId).toBe('244.1')
  })

  it('returns nothing for non-matching queries', () => {
    expect(searchCatalogue(catalogue, 'xyz-no-match')).toEqual([])
  })

  it('hides excluded signs', () => {
    const results = searchCatalogue(catalogue, '', {
      exclude: (s) => s.signId === '274',
    })
    expect(results.map((s) => s.signId)).not.toContain('274')
    expect(results).toHaveLength(catalogue.length - 1)
  })
})

describe('isSignExcludedByCompatibility', () => {
  const existing = [
    {
      recodgnizedSign: true,
      signId: '240',
      osmValuePart: '240',
      compatibility: { incompatibleModifiers: ['1022-10'] },
    },
  ] as never[]

  it('excludes signs the existing sign declares incompatible', () => {
    expect(isSignExcludedByCompatibility(sign({ signId: '1022-10' }), existing)).toBe(true)
  })

  it('excludes candidates that declare an existing sign incompatible', () => {
    const candidate = sign({
      signId: '1012-32',
      compatibility: { incompatibleModifiers: ['240'] },
    } as Partial<SignType>)
    expect(isSignExcludedByCompatibility(candidate, existing)).toBe(true)
  })

  it('keeps compatible signs', () => {
    expect(isSignExcludedByCompatibility(sign({ signId: '274' }), existing)).toBe(false)
  })
})
