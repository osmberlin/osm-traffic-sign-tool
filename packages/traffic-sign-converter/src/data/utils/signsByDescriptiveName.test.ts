import { describe, expect, test } from 'vitest'
import { signsByDescriptiveName } from './signsByDescriptiveName.js'

describe('signsByDescriptiveName()', () => {
  test('Check one exact match', () => {
    const signs = signsByDescriptiveName(['Fahrradstraße'])
    expect(signs.length).toBe(1)
  })

  test('Check two exact matches', () => {
    const signs = signsByDescriptiveName(['Fahrradstraße', 'Anlieger frei'])
    expect(signs.length).toBe(2)
  })

  test('Check one "startsWith" match', () => {
    const signs = signsByDescriptiveName(['Fahrradstr'])
    expect(signs.length).toBe(1)
  })

  test('Check one "startsWith" match', () => {
    const signs = signsByDescriptiveName(['Fahrradstr', 'Anlieger fr'])
    expect(signs.length).toBe(2)
  })

  test('Real case', () => {
    const signs = signsByDescriptiveName([
      'Verbot für Krafträder, auch mit Beiwagen, Kleinkrafträder und Mofas',
      'Krafträder auch mit Beiwagen, Krafträder und Mofas frei',
    ])
    expect(signs.length).toBe(2)
  })
})
