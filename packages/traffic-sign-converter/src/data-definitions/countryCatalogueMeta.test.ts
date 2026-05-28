import { describe, expect, test } from 'vitest'
import { countryCatalogueMeta, getCountryCatalogueMeta } from './countryCatalogueMeta.js'

describe('countryCatalogueMeta', () => {
  test('contains DE catalogue metadata', () => {
    expect(countryCatalogueMeta.DE).toMatchInlineSnapshot(`
      {
        "catalogueLocale": "de",
        "countryPrefix": "DE",
        "defaultCommentLang": "de",
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

  test('returns metadata by country prefix', () => {
    expect(getCountryCatalogueMeta('DE')).toBe(countryCatalogueMeta.DE)
  })
})
