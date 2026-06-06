import { describe, expect, test } from 'vitest'
import {
  sharedAccessBanRecommendation,
  sharedSegregatedFootCyclePathRecommendation,
} from './sharedRecommendationPresets.js'

describe('sharedRecommendationPresets', () => {
  test('sharedSegregatedFootCyclePathRecommendation includes segregated=yes', () => {
    const recs = sharedSegregatedFootCyclePathRecommendation()
    expect(recs[0]?.uniqueTags).toEqual(
      expect.arrayContaining([
        { key: 'bicycle', value: 'designated' },
        { key: 'foot', value: 'designated' },
        { key: 'segregated', value: 'yes' },
      ]),
    )
  })

  test('sharedAccessBanRecommendation maps vehicle ban', () => {
    const recs = sharedAccessBanRecommendation('vehicle')
    expect(recs[0]?.accessTags).toEqual([{ key: 'vehicle', value: 'no' }])
  })
})
