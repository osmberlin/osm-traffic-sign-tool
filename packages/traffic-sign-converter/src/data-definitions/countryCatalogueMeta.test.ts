import { describe, expect, test } from 'vitest'
import {
  countryCatalogueMeta,
  getCatalogueMaturity,
  getCountryCatalogueMeta,
} from './countryCatalogueMeta.js'
import { isVisibleMaturity } from './featureMaturities.js'

describe('countryCatalogueMeta', () => {
  test('contains DE catalogue metadata', () => {
    expect(countryCatalogueMeta.DE).toMatchInlineSnapshot(`
      {
        "catalogueLocale": "de",
        "countryPrefix": "DE",
        "defaultCommentLang": "de",
        "maturity": "alpha",
        "osmWikiOverviewUrl": "https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland",
        "referenceLinks": {
          "hashPrefixes": {
            "main": "Zeichen_",
            "modifier": "Zusatzzeichen_",
          },
          "osmWikiTableUrl": "https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland#{hashPrefix}{signId}",
          "wikipediaTableUrl": "https://de.wikipedia.org/wiki/Bildtafel_der_Verkehrszeichen_in_der_Bundesrepublik_Deutschland_seit_2017#:~:text={textFragment}",
          "wikipediaTextFragmentLabels": {
            "main": "Zeichen",
            "modifier": "Zusatzzeichen",
          },
        },
      }
    `)
  })

  test('DE catalogue is alpha', () => {
    expect(getCatalogueMaturity('DE')).toBe('alpha')
    expect(isVisibleMaturity(getCatalogueMaturity('DE'))).toBe(true)
  })

  test('returns metadata by country prefix', () => {
    expect(getCountryCatalogueMeta('DE')).toBe(countryCatalogueMeta.DE)
  })
})
