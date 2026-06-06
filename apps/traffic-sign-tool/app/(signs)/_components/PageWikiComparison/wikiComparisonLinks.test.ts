import { describe, expect, test } from 'vitest'
import { buildWikiComparisonRowHref, buildWikiComparisonRowId } from './wikiComparisonLinks'

describe('wikiComparisonLinks', () => {
  test('buildWikiComparisonRowId', () => {
    expect(buildWikiComparisonRowId('BR:A-49a')).toBe('wiki-qa-BR-A-49a')
  })

  test('buildWikiComparisonRowHref', () => {
    expect(buildWikiComparisonRowHref('BR', 'A-49a')).toBe('/BR/wiki#wiki-qa-BR-A-49a')
  })
})
