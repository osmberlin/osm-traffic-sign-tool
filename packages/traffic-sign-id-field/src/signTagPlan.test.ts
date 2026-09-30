import { signsToTags, trafficSignTagToSigns } from '@osm-traffic-signs/converter'
import { describe, expect, it } from 'vitest'
import {
  createSignRecommend,
  signTagPlan,
  signTagPlanChanges,
  signTarget,
  type Recommend,
  type SignTags,
} from './signTagPlan.js'

// `signsToTags` results as the converter returns them (see the converter test below)
const RECOMMENDATIONS: Record<string, SignTags> = {
  'DE:237': { bicycle: 'designated', highway: ['cycleway'], traffic_sign: 'DE:237' },
  'DE:240': {
    bicycle: 'designated',
    foot: 'designated',
    highway: ['path'],
    segregated: 'no',
    traffic_sign: 'DE:240',
  },
  'DE:241': {
    bicycle: 'designated',
    foot: 'designated',
    highway: ['path'],
    segregated: 'yes',
    traffic_sign: 'DE:241-30',
  },
  'DE:245,1022-10': {
    bicycle: 'yes',
    bus: 'designated',
    highway: ['footway', 'service'],
    traffic_sign: 'DE:245,1022-10',
    vehicle: 'no',
  },
  'DE:274[30]': { maxspeed: '30', 'source:maxspeed': 'sign', traffic_sign: 'DE:274-30' },
}
const recommend: Recommend = (value) => RECOMMENDATIONS[value] ?? {}

describe('signTarget', () => {
  it('knows the way itself and road sides', () => {
    expect(signTarget('traffic_sign')).toEqual({ kind: 'self' })
    expect(signTarget('cycleway:right:traffic_sign')).toEqual({
      kind: 'side',
      prefix: 'cycleway',
      side: 'right',
    })
    expect(signTarget('traffic_sign:forward')).toBeUndefined()
  })
})

describe('signTagPlan', () => {
  it('leaves unchanged signs alone', () => {
    const tags = { highway: 'cycleway', traffic_sign: 'DE:237' }
    expect(
      signTagPlan({ key: 'traffic_sign', tags, previousSign: 'DE:237', recommend }),
    ).toBeUndefined()
  })

  it('237 → 240: highway, designations and segregated; nothing to remove', () => {
    const tags = { highway: 'cycleway', traffic_sign: 'DE:240', bicycle: 'designated' }
    expect(signTagPlan({ key: 'traffic_sign', tags, previousSign: 'DE:237', recommend })).toEqual([
      { kind: 'change', key: 'highway', value: 'path', from: 'cycleway', cause: 'sign' },
      { kind: 'add', key: 'foot', value: 'designated', cause: 'sign' },
      { kind: 'add', key: 'segregated', value: 'no', cause: 'sign' },
    ])
  })

  it('240 → 237: removes what only the old sign implied', () => {
    const tags = {
      highway: 'path',
      traffic_sign: 'DE:237',
      bicycle: 'designated',
      foot: 'designated',
      segregated: 'no',
    }
    expect(signTagPlan({ key: 'traffic_sign', tags, previousSign: 'DE:240', recommend })).toEqual([
      { kind: 'change', key: 'highway', value: 'cycleway', from: 'path', cause: 'sign' },
      { kind: 'remove', key: 'foot', value: 'designated', cause: 'previous_sign' },
      { kind: 'remove', key: 'segregated', value: 'no', cause: 'previous_sign' },
    ])
  })

  it('normalizes the sign value', () => {
    const tags = {
      highway: 'path',
      traffic_sign: 'DE:241',
      bicycle: 'designated',
      foot: 'designated',
      segregated: 'yes',
    }
    expect(signTagPlan({ key: 'traffic_sign', tags, previousSign: undefined, recommend })).toEqual([
      {
        kind: 'change',
        key: 'traffic_sign',
        value: 'DE:241-30',
        from: 'DE:241',
        cause: 'normalize',
      },
    ])
  })

  it('does not apply a sign for another kind of way to a road', () => {
    const tags = { highway: 'primary', traffic_sign: 'DE:245,1022-10' }
    expect(signTagPlan({ key: 'traffic_sign', tags, previousSign: undefined, recommend })).toEqual(
      [],
    )
  })

  it('applies signs without a highway to roads', () => {
    const tags = { highway: 'residential', traffic_sign: 'DE:274[30]' }
    expect(signTagPlan({ key: 'traffic_sign', tags, previousSign: undefined, recommend })).toEqual([
      {
        kind: 'change',
        key: 'traffic_sign',
        value: 'DE:274-30',
        from: 'DE:274[30]',
        cause: 'normalize',
      },
      { kind: 'add', key: 'maxspeed', value: '30', cause: 'sign' },
      { kind: 'add', key: 'source:maxspeed', value: 'sign', cause: 'sign' },
    ])
  })

  it('road side: only access and segregated, with side keys', () => {
    const tags = {
      highway: 'secondary',
      'cycleway:right': 'track',
      'cycleway:right:traffic_sign': 'DE:240',
    }
    expect(
      signTagPlan({
        key: 'cycleway:right:traffic_sign',
        tags,
        previousSign: undefined,
        recommend,
      }),
    ).toEqual([
      { kind: 'add', key: 'cycleway:right:bicycle', value: 'designated', cause: 'sign' },
      { kind: 'add', key: 'cycleway:right:foot', value: 'designated', cause: 'sign' },
      { kind: 'add', key: 'cycleway:right:segregated', value: 'no', cause: 'sign' },
    ])
  })

  it('removed sign: removes the tags it implied', () => {
    const tags = { highway: 'path', bicycle: 'designated', foot: 'designated', segregated: 'no' }
    const plan = signTagPlan({ key: 'traffic_sign', tags, previousSign: 'DE:240', recommend })
    expect(plan?.map((row) => `${row.kind} ${row.key}`)).toEqual([
      'remove bicycle',
      'remove foot',
      'remove segregated',
    ])
  })

  it('restores the downloaded value instead of removing it', () => {
    // Downloaded with foot=no and DE:237; the mapper tried DE:240 (applied) and went back to DE:237
    const originalTags = {
      highway: 'cycleway',
      traffic_sign: 'DE:237',
      bicycle: 'designated',
      foot: 'no',
    }
    const tags = {
      highway: 'path',
      traffic_sign: 'DE:237',
      bicycle: 'designated',
      foot: 'designated',
      segregated: 'no',
    }
    expect(
      signTagPlan({ key: 'traffic_sign', tags, previousSign: 'DE:240', originalTags, recommend }),
    ).toEqual([
      { kind: 'change', key: 'highway', value: 'cycleway', from: 'path', cause: 'sign' },
      { kind: 'change', key: 'foot', value: 'no', from: 'designated', cause: 'restore' },
      { kind: 'remove', key: 'segregated', value: 'no', cause: 'previous_sign' },
    ])
  })
})

describe('signTagPlanChanges', () => {
  it('turns rows into a tag update', () => {
    expect(
      signTagPlanChanges([
        { kind: 'add', key: 'foot', value: 'designated', cause: 'sign' },
        { kind: 'change', key: 'highway', value: 'path', from: 'cycleway', cause: 'sign' },
        { kind: 'remove', key: 'segregated', value: 'no', cause: 'previous_sign' },
      ]),
    ).toEqual({ foot: 'designated', highway: 'path', segregated: undefined })
  })
})

describe('createSignRecommend', () => {
  it('matches the recommendations the tests above assume', () => {
    const converterRecommend = createSignRecommend({ trafficSignTagToSigns, signsToTags }, 'DE')
    for (const value of ['DE:237', 'DE:240', 'DE:241', 'DE:274[30]']) {
      expect(converterRecommend(value)).toEqual(RECOMMENDATIONS[value])
    }
  })
})
