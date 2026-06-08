import { describe, expect, test } from 'vitest'
import { catalogueWikiConfigs } from './catalogueWikiConfigs.js'
import { countryWikiConfigs } from './countryWikiConfigs.js'

describe('catalogueWikiConfigs', () => {
  test('reuses wiki page slugs and parse modes from countryWikiConfigs', () => {
    for (const [prefix, catalogueConfig] of Object.entries(catalogueWikiConfigs)) {
      const wikiConfig = countryWikiConfigs[prefix]
      expect(wikiConfig, `missing wiki config for ${prefix}`).toBeDefined()

      expect(catalogueConfig.overviewUrl).toBe(wikiConfig!.overviewUrl)
      expect(catalogueConfig.prefix).toBe(wikiConfig!.prefix)
      expect(catalogueConfig.pages).toHaveLength(wikiConfig!.pages.length)

      for (const [index, cataloguePage] of catalogueConfig.pages.entries()) {
        const wikiPage = wikiConfig!.pages[index]!
        expect(cataloguePage.slug).toBe(wikiPage.slug)
        expect(cataloguePage.parseMode ?? 'universal').toBe(wikiPage.parseMode ?? 'universal')
      }
    }
  })
})
