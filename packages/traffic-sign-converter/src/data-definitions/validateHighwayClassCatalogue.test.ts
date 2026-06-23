import { describe, expect, test } from 'vitest'
import { countries, countryDefinitions } from './countryDefinitions.js'
import {
  findHighwayClassCatalogueViolations,
  formatHighwayClassCatalogueViolations,
} from './validateHighwayClassCatalogue.js'

describe('validateHighwayClassCatalogue', () => {
  test('catalogue has no highwayClass vs catalogue highwayValues conflicts', () => {
    const violations = countries.flatMap((country) =>
      findHighwayClassCatalogueViolations(country, countryDefinitions[country]),
    )

    expect(violations, formatHighwayClassCatalogueViolations(violations)).toEqual([])
  })
})
