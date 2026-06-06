export type WikiPageConfig = {
  slug: string
  /** belgium = Sign|Image|Description|Tags columns; universal = auto-detect; de-row-id = German Zeichen_ rows */
  parseMode?: 'belgium' | 'universal' | 'de-row-id'
  defaultCategory?: string
}

export type CountryWikiConfig = {
  prefix: string
  overviewUrl: string
  pages: WikiPageConfig[]
}

export const WIKI_BASE = 'https://wiki.openstreetmap.org/wiki/'

export const countryWikiConfigs: Record<string, CountryWikiConfig> = {
  DE: {
    prefix: 'DE',
    overviewUrl: 'https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland',
    pages: [
      {
        slug: 'DE:Verkehrszeichen_in_Deutschland',
        parseMode: 'de-row-id',
      },
    ],
  },
  BE: {
    prefix: 'BE',
    overviewUrl: 'https://wiki.openstreetmap.org/wiki/Road_signs_in_Belgium',
    pages: [
      { slug: 'Road_signs_in_Belgium/A_Warning_signs', parseMode: 'belgium' },
      { slug: 'Road_signs_in_Belgium/B_Priority_signs', parseMode: 'belgium' },
      { slug: 'Road_signs_in_Belgium/C_Prohibitory_signs', parseMode: 'belgium' },
      { slug: 'Road_signs_in_Belgium/D_Mandatory_signs', parseMode: 'belgium' },
      { slug: 'Road_signs_in_Belgium/E_Parking_signs', parseMode: 'belgium' },
      { slug: 'Road_signs_in_Belgium/F_Direction_and_information_signs', parseMode: 'belgium' },
      { slug: 'Road_signs_in_Belgium/M_Extra_signs', parseMode: 'belgium' },
    ],
  },
  PL: {
    prefix: 'PL',
    overviewUrl: 'https://wiki.openstreetmap.org/wiki/Pl:Znaki_drogowe_w_Polsce',
    pages: [{ slug: 'Pl:Znaki_drogowe_w_Polsce', parseMode: 'universal' }],
  },
  AU: {
    prefix: 'AU',
    overviewUrl: 'https://wiki.openstreetmap.org/wiki/Australian_Tagging_Guidelines/Road_Signage',
    pages: [{ slug: 'Australian_Tagging_Guidelines/Road_Signage', parseMode: 'universal' }],
  },
  AT: {
    prefix: 'AT',
    overviewUrl: 'https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_%C3%96sterreich',
    pages: [{ slug: 'DE:Verkehrszeichen_in_%C3%96sterreich', parseMode: 'universal' }],
  },
  FR: {
    prefix: 'FR',
    overviewUrl: 'https://wiki.openstreetmap.org/wiki/FR:Signalisation_routi%C3%A8re_en_France',
    pages: [{ slug: 'FR:Signalisation_routi%C3%A8re_en_France', parseMode: 'universal' }],
  },
  BR: {
    prefix: 'BR',
    overviewUrl: 'https://wiki.openstreetmap.org/wiki/Pt:Placas_de_sinaliza%C3%A7%C3%A3o_no_Brasil',
    pages: [{ slug: 'Pt:Placas_de_sinaliza%C3%A7%C3%A3o_no_Brasil', parseMode: 'universal' }],
  },
  CA: {
    prefix: 'CA',
    overviewUrl: 'https://wiki.openstreetmap.org/wiki/Canada/Road_signs',
    pages: [{ slug: 'Canada/Road_signs/Ontario', parseMode: 'universal' }],
  },
}

export const wikiSnapshotCountryPrefixes = Object.keys(countryWikiConfigs)
