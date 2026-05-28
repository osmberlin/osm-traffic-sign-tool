import { deReferenceLinks } from '@app/app/(signs)/DE/referenceLinks.config'
import { describe, expect, test } from 'vitest'
import { buildSignReferenceLinks } from './buildSignReferenceLinks.js'

describe('buildSignReferenceLinks()', () => {
  test('builds main sign URLs for DE', () => {
    const result = buildSignReferenceLinks(
      { kind: 'traffic_sign', signId: '274.1', osmValuePart: '274.1' } as never,
      deReferenceLinks,
    )

    expect(result.osmWikiTableUrl).toBe(
      'https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland#Zeichen_274.1',
    )
    expect(result.wikipediaTableUrl).toBe(
      'https://de.wikipedia.org/wiki/Bildtafel_der_Verkehrszeichen_in_der_Bundesrepublik_Deutschland_seit_2017#:~:text=Zeichen%20274.1',
    )
  })

  test('builds modifier sign URLs for DE', () => {
    const result = buildSignReferenceLinks(
      { kind: 'exception_modifier', signId: '1022-10', osmValuePart: '1022-10' } as never,
      deReferenceLinks,
    )

    expect(result.osmWikiTableUrl).toBe(
      'https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland#Zusatzzeichen_1022-10',
    )
    expect(result.wikipediaTableUrl).toBe(
      'https://de.wikipedia.org/wiki/Bildtafel_der_Verkehrszeichen_in_der_Bundesrepublik_Deutschland_seit_2017#:~:text=Zusatzzeichen%201022-10',
    )
  })
})
