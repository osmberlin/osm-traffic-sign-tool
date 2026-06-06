import type { CountryPrefixType } from '@osm-traffic-signs/converter'
import atWiki from './data/trafficSignsWiki_AT.json' with { type: 'json' }
import auWiki from './data/trafficSignsWiki_AU.json' with { type: 'json' }
import beWiki from './data/trafficSignsWiki_BE.json' with { type: 'json' }
import brWiki from './data/trafficSignsWiki_BR.json' with { type: 'json' }
import caWiki from './data/trafficSignsWiki_CA.json' with { type: 'json' }
import deWiki from './data/trafficSignsWiki_DE.json' with { type: 'json' }
import frWiki from './data/trafficSignsWiki_FR.json' with { type: 'json' }
import plWiki from './data/trafficSignsWiki_PL.json' with { type: 'json' }
import type { WikiSign } from './wikiSignTypes.js'

const wikiByCountry = {
  DE: deWiki,
  BE: beWiki,
  AT: atWiki,
  CA: caWiki,
  PL: plWiki,
  FR: frWiki,
  AU: auWiki,
  BR: brWiki,
} as const satisfies Record<CountryPrefixType, WikiSign[]>

/** @deprecated Use getTrafficSignsWiki(countryPrefix) */
export const trafficSignsWiki = deWiki

export const getTrafficSignsWiki = (countryPrefix: CountryPrefixType): WikiSign[] =>
  wikiByCountry[countryPrefix] ?? []

export type { WikiSign } from './wikiSignTypes.js'
