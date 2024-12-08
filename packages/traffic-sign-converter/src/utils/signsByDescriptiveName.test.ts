import { describe, expect, test } from 'vitest'
import { countryDefinitions } from '../data-definitions/countryDefinitions.js'
import { signsByDescriptiveName } from './signsByDescriptiveName.js'

describe('signsByDescriptiveName()', () => {
  const data = countryDefinitions.DE

  test('Check one exact match', () => {
    const signs = signsByDescriptiveName(data, ['Fahrradstraße'])
    expect(signs.length).toBe(1)
  })

  test('Check two exact matches', () => {
    const signs = signsByDescriptiveName(data, ['Fahrradstraße', 'Anlieger frei'])
    expect(signs.length).toBe(2)
  })

  test('Check one "startsWith" match', () => {
    const signs = signsByDescriptiveName(data, ['Fahrradstr'])
    expect(signs.length).toBe(1)
  })

  test('Check one "startsWith" match', () => {
    const signs = signsByDescriptiveName(data, ['Fahrradstr', 'Anlieger fr'])
    expect(signs.length).toBe(2)
  })

  test('Real case', () => {
    const signs = signsByDescriptiveName(data, [
      'Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas',
      'Krafträder auch mit Beiwagen, Krafträder und Mofas frei',
    ])
    expect(signs.length).toBe(2)
  })
})
