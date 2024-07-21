import type { TrafficSign } from '@/data/types'
import { describe, expect, test } from 'vitest'
import { addRestrictionTags } from './addRestrictionTags'
import type { AggregatedTags } from './aggregateTags'

describe('addRestrictionTags()', () => {
  test('does nothing when no conditional tags given', () => {
    const collector: AggregatedTags = []
    const input = [] as TrafficSign[]
    addRestrictionTags(collector, input)

    expect(collector).toMatchObject([])
  })

  test('adds restrictionKey with default "no"', () => {
    const collector: AggregatedTags = []
    const input = [{ restrictionKeys: ['bicycle'] }] as TrafficSign[]
    addRestrictionTags(collector, input)

    expect(collector).toMatchObject([['bicycle', 'no']])
  })

  test('adds conditional restriction', () => {
    const collector: AggregatedTags = []
    const input = [
      { restrictionKeys: ['hgv'] },
      { value: 'wet', conditional: true },
    ] as TrafficSign[]
    addRestrictionTags(collector, input)

    expect(collector).toMatchObject([['hgv:conditional', 'no @ (wet)']])
  })

  test('adds multiple conditional restrictions', () => {
    const collector: AggregatedTags = []
    const input = [
      { restrictionKeys: ['hgv'] },
      { value: 'wet', conditional: true },
      { value: 'Sa,Su', conditional: true },
      { restrictionKeys: ['foo'] },
    ] as TrafficSign[]
    addRestrictionTags(collector, input)

    expect(collector).toMatchObject([
      ['hgv:conditional', 'no @ (wet AND Sa,Su)'],
      ['foo:conditional', 'no @ (wet AND Sa,Su)'],
    ])
  })
})
