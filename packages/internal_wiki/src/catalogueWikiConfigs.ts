import { countryWikiConfigs, type WikiPageConfig } from './countryWikiConfigs.js'

export type CataloguePageConfig = WikiPageConfig & {
  exportName: string
  fileName: string
  defaultCategory: string
}

export type CatalogueCountryConfig = {
  prefix: string
  overviewUrl: string
  catalogueName: string
  catalogueLocale: string
  defaultCommentLang: string
  hashPrefixMain: string
  hashPrefixModifier: string
  pages: CataloguePageConfig[]
}

const withCataloguePage = (
  wikiPage: WikiPageConfig,
  catalogue: Pick<CataloguePageConfig, 'exportName' | 'fileName' | 'defaultCategory'>,
): CataloguePageConfig => ({ ...wikiPage, ...catalogue })

const beWiki = countryWikiConfigs.BE!

export const catalogueWikiConfigs: Record<string, CatalogueCountryConfig> = {
  BE: {
    prefix: beWiki.prefix,
    overviewUrl: beWiki.overviewUrl,
    catalogueName: 'Belgian traffic signs',
    catalogueLocale: 'en',
    defaultCommentLang: 'en',
    hashPrefixMain: '',
    hashPrefixModifier: 'M',
    pages: [
      withCataloguePage(beWiki.pages[0]!, {
        exportName: '_warning',
        fileName: 'warning.ts',
        defaultCategory: 'hazard_sign',
      }),
      withCataloguePage(beWiki.pages[1]!, {
        exportName: '_priority',
        fileName: 'priority.ts',
        defaultCategory: 'traffic_sign',
      }),
      withCataloguePage(beWiki.pages[2]!, {
        exportName: '_prohibitory',
        fileName: 'prohibitory.ts',
        defaultCategory: 'traffic_sign',
      }),
      withCataloguePage(beWiki.pages[3]!, {
        exportName: '_mandatory',
        fileName: 'mandatory.ts',
        defaultCategory: 'traffic_sign',
      }),
      withCataloguePage(beWiki.pages[4]!, {
        exportName: '_parking',
        fileName: 'parking.ts',
        defaultCategory: 'traffic_sign',
      }),
      withCataloguePage(beWiki.pages[5]!, {
        exportName: '_direction',
        fileName: 'direction.ts',
        defaultCategory: 'signpost',
      }),
      withCataloguePage(beWiki.pages[6]!, {
        exportName: '_extra',
        fileName: 'extra.ts',
        defaultCategory: 'exception_modifier',
      }),
    ],
  },
  PL: {
    prefix: countryWikiConfigs.PL!.prefix,
    overviewUrl: countryWikiConfigs.PL!.overviewUrl,
    catalogueName: 'Polish traffic signs',
    catalogueLocale: 'pl',
    defaultCommentLang: 'pl',
    hashPrefixMain: '',
    hashPrefixModifier: 'T',
    pages: [
      withCataloguePage(countryWikiConfigs.PL!.pages[0]!, {
        exportName: '_all',
        fileName: 'all.ts',
        defaultCategory: 'traffic_sign',
      }),
    ],
  },
  AU: {
    prefix: countryWikiConfigs.AU!.prefix,
    overviewUrl: countryWikiConfigs.AU!.overviewUrl,
    catalogueName: 'Australian traffic signs',
    catalogueLocale: 'en',
    defaultCommentLang: 'en',
    hashPrefixMain: '',
    hashPrefixModifier: '',
    pages: [
      withCataloguePage(countryWikiConfigs.AU!.pages[0]!, {
        exportName: '_all',
        fileName: 'all.ts',
        defaultCategory: 'traffic_sign',
      }),
    ],
  },
  AT: {
    prefix: countryWikiConfigs.AT!.prefix,
    overviewUrl: countryWikiConfigs.AT!.overviewUrl,
    catalogueName: 'Austrian traffic signs',
    catalogueLocale: 'de',
    defaultCommentLang: 'de',
    hashPrefixMain: '',
    hashPrefixModifier: '',
    pages: [
      withCataloguePage(countryWikiConfigs.AT!.pages[0]!, {
        exportName: '_all',
        fileName: 'all.ts',
        defaultCategory: 'traffic_sign',
      }),
    ],
  },
  FR: {
    prefix: countryWikiConfigs.FR!.prefix,
    overviewUrl: countryWikiConfigs.FR!.overviewUrl,
    catalogueName: 'French traffic signs',
    catalogueLocale: 'fr',
    defaultCommentLang: 'fr',
    hashPrefixMain: '',
    hashPrefixModifier: 'M',
    pages: [
      withCataloguePage(countryWikiConfigs.FR!.pages[0]!, {
        exportName: '_all',
        fileName: 'all.ts',
        defaultCategory: 'traffic_sign',
      }),
    ],
  },
  BR: {
    prefix: countryWikiConfigs.BR!.prefix,
    overviewUrl: countryWikiConfigs.BR!.overviewUrl,
    catalogueName: 'Brazilian traffic signs',
    catalogueLocale: 'pt',
    defaultCommentLang: 'pt',
    hashPrefixMain: '',
    hashPrefixModifier: '',
    pages: [
      withCataloguePage(countryWikiConfigs.BR!.pages[0]!, {
        exportName: '_all',
        fileName: 'all.ts',
        defaultCategory: 'traffic_sign',
      }),
    ],
  },
  CA: {
    prefix: countryWikiConfigs.CA!.prefix,
    overviewUrl: countryWikiConfigs.CA!.overviewUrl,
    catalogueName: 'Canadian traffic signs',
    catalogueLocale: 'en',
    defaultCommentLang: 'en',
    hashPrefixMain: '',
    hashPrefixModifier: '',
    pages: [
      withCataloguePage(countryWikiConfigs.CA!.pages[0]!, {
        exportName: '_ontario',
        fileName: 'ontario.ts',
        defaultCategory: 'traffic_sign',
      }),
    ],
  },
}

export const catalogueWikiCountryPrefixes = Object.keys(catalogueWikiConfigs)
