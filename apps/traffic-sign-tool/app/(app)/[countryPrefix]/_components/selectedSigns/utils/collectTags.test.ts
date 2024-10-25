import { TrafficSignState } from '@osm-traffic-signs/converter'
import { describe, expect, test } from 'vitest'
import { collectTags } from './collectTags'

describe('collectTags()', () => {
  const baseInput = {
    osmValuePart: 'todo',
    signId: 'todo',
    signValue: null,
    name: 'name',
    descriptiveName: null,
    description: null,
    category: 'traffic_sign',
    image: { svgPath: undefined, sourceUrl: undefined, licence: undefined },
  } satisfies TrafficSignState

  test('does nothing when no input given', () => {
    const input = [
      { ...baseInput, osmValuePart: 'DE:333' },
      { ...baseInput, osmValuePart: 'DE:444' },
    ] satisfies TrafficSignState[]
    const result = collectTags(input)

    expect(result).toMatchObject([])
  })

  test('handles osmTags', () => {
    const input = [
      { ...baseInput, osmValuePart: 'DE:333', osmTags: { foo: 'bar', lorem: ['a', 'b'] } },
    ] satisfies TrafficSignState[]
    const result = collectTags(input)

    expect(result).toMatchObject([
      ['foo', 'bar'],
      ['lorem', ['a', 'b']],
    ])
  })

  test('handles key, value', () => {
    const input = [
      {
        ...baseInput,
        osmValuePart: 'DE:333',
        osmTags: { foo: 'bar' },
        key: 'highway',
        value: 'bridleway',
      },
    ] satisfies TrafficSignState[]
    const result = collectTags(input)

    expect(result).toMatchObject([
      ['foo', 'bar'],
      ['highway', 'bridleway'],
    ])
  })

  test('handles key, value', () => {
    const input = [
      {
        ...baseInput,
        osmValuePart: 'DE:333',
        key: 'maxweight',
        valuePrompt: {
          prompt: 'Gewicht in Tonnen ohne Einheit',
          defaultValue: '5.5',
          format: 'float',
        },
      },
    ] satisfies TrafficSignState[]
    const result = collectTags(input)

    expect(result).toMatchObject([['maxweight', '5.5']])
  })
})
