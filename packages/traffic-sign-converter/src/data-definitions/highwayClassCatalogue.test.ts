import { describe, expect, test } from 'vitest'
import { countries, countryDefinitions } from './countryDefinitions.js'
import type { SignType } from './TrafficSignDataTypes.js'

const catalogueHighwayValues = (sign: SignType) => {
  if (sign.tagRecommendationsByGeometry === 'none') {
    return []
  }

  return (
    sign.tagRecommendationsByGeometry.find((recommendation) =>
      recommendation.geometries.includes('way'),
    )?.highwayValues ?? []
  )
}

describe('highwayClass catalogue guard', () => {
  test('signs with highwayClass question must not also define catalogue highwayValues', () => {
    for (const country of countries) {
      for (const sign of countryDefinitions[country]) {
        const hasHighwayQuestion = sign.questions?.some((question) => question.affectsHighway)
        const highwayValues = catalogueHighwayValues(sign)

        if (hasHighwayQuestion && highwayValues.length > 0) {
          expect.fail(
            `${country}:${sign.osmValuePart}: remove highwayValues ${JSON.stringify(highwayValues)} from tagRecommendationsByGeometry — highway type is chosen via the highwayClass question`,
          )
        }
      }
    }
  })

  test('bidirectional modifiers 1000-30/31 only add oneway=no, not highway type', () => {
    for (const osmValuePart of ['1000-30', '1000-31'] as const) {
      const sign = countryDefinitions.DE.find((entry) => entry.osmValuePart === osmValuePart)
      expect(sign, `missing DE:${osmValuePart}`).toBeDefined()
      expect(
        catalogueHighwayValues(sign!),
        `DE:${osmValuePart}: remove highwayValues — use highwayClass on the main sign instead`,
      ).toEqual([])
    }
  })
})
