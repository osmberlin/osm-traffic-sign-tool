import { describe, expect, test } from 'vitest'
import { countryDefinitions } from '../src/data-definitions/countryDefinitions.js'
import { signRelations } from '../src/data-definitions/signRelations.js'
import { catalogueJson } from './export-catalogue-json.js'

describe('catalogueJson()', () => {
  test('round-trips the DE catalogue and its relations', () => {
    const parsed = JSON.parse(catalogueJson('DE', '1.2.3'))
    expect(parsed.country).toBe('DE')
    expect(parsed.version).toBe('1.2.3')
    expect(parsed.signs).toEqual(countryDefinitions.DE)
    expect(parsed.relations).toEqual(signRelations.DE)
  })
})
