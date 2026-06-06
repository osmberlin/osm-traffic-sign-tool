import { describe, expect, test } from 'vitest'
import {
  countryCatalogueMeta,
  getCatalogueMaturity,
  getCountryCatalogueMeta,
} from './countryCatalogueMeta.js'
import { countries } from './countryDefinitions.js'
import { isVisibleMaturity } from './featureMaturities.js'

describe('countryCatalogueMeta', () => {
  test('contains DE catalogue metadata with full QA', () => {
    expect(countryCatalogueMeta.DE.maturity).toBe('alpha')
    expect(countryCatalogueMeta.DE.qaCapabilities.wikiComparison).toBe(true)
    expect(countryCatalogueMeta.DE.qaCapabilities.taginfoComparison).toBe(true)
  })

  test('all sign catalogues are alpha', () => {
    for (const prefix of countries) {
      expect(getCatalogueMaturity(prefix)).toBe('alpha')
      expect(isVisibleMaturity(getCatalogueMaturity(prefix))).toBe(true)
    }
  })

  test('non-DE countries expose package-data QA only', () => {
    for (const prefix of countries) {
      if (prefix === 'DE') continue
      expect(getCountryCatalogueMeta(prefix).qaCapabilities.wikiComparison).toBe(false)
      expect(getCountryCatalogueMeta(prefix).qaCapabilities.taginfoComparison).toBe(false)
      expect(getCountryCatalogueMeta(prefix).qaCapabilities.taggingQa).toBe(true)
    }
  })

  test('returns metadata by country prefix', () => {
    expect(getCountryCatalogueMeta('BE').catalogueName).toBe('Belgian traffic signs')
  })

  test('each catalogue has a pedestrian path iconic sign', () => {
    for (const prefix of countries) {
      expect(getCountryCatalogueMeta(prefix).iconicSignOsmValuePart.length).toBeGreaterThan(0)
    }
    expect(getCountryCatalogueMeta('DE').iconicSignOsmValuePart).toBe('239')
  })
})
