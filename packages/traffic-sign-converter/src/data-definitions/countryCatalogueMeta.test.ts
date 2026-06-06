import { describe, expect, test } from 'vitest'
import {
  SvgLoadersAT,
  SvgLoadersAU,
  SvgLoadersBE,
  SvgLoadersBR,
  SvgLoadersCA,
  SvgLoadersDE,
  SvgLoadersFR,
  SvgLoadersPL,
} from '../data-svgs/index.js'
import { createSvgImportname } from '../utils/createSvgImportname.js'
import {
  countryCatalogueMeta,
  getCatalogueMaturity,
  getCountryCatalogueMeta,
} from './countryCatalogueMeta.js'
import { countries, type CountryPrefixType } from './countryDefinitions.js'
import { isVisibleMaturity } from './featureMaturities.js'

const iconicSignLoaderMaps = {
  AT: SvgLoadersAT,
  AU: SvgLoadersAU,
  BE: SvgLoadersBE,
  BR: SvgLoadersBR,
  CA: SvgLoadersCA,
  DE: SvgLoadersDE,
  FR: SvgLoadersFR,
  PL: SvgLoadersPL,
} satisfies Record<CountryPrefixType, Record<string, unknown>>

describe('countryCatalogueMeta', () => {
  test('contains DE catalogue metadata with full QA', () => {
    expect(countryCatalogueMeta.DE.maturity).toBe('stable')
    expect(countryCatalogueMeta.DE.qaCapabilities.wikiComparison).toBe(true)
    expect(countryCatalogueMeta.DE.qaCapabilities.taginfoComparison).toBe(true)
  })

  test('non-DE sign catalogues are alpha', () => {
    for (const prefix of countries) {
      if (prefix === 'DE') continue
      expect(getCatalogueMaturity(prefix)).toBe('alpha')
      expect(isVisibleMaturity(getCatalogueMaturity(prefix))).toBe(true)
    }
  })

  test('all countries expose full maintainer QA including wiki and taginfo', () => {
    for (const prefix of countries) {
      expect(getCountryCatalogueMeta(prefix).qaCapabilities.wikiComparison).toBe(true)
      expect(getCountryCatalogueMeta(prefix).qaCapabilities.taginfoComparison).toBe(true)
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

  test('each iconic sign resolves to an existing SVG loader', () => {
    for (const prefix of countries) {
      const svgName = createSvgImportname(
        prefix,
        getCountryCatalogueMeta(prefix).iconicSignOsmValuePart,
      )
      expect(iconicSignLoaderMaps[prefix]).toHaveProperty(svgName)
    }
  })
})
