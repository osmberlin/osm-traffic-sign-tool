import type { CountryPrefixType } from '@osm-traffic-signs/converter'
import atTaginfo from './data/taginfoTrafficSignData_AT.json' with { type: 'json' }
import auTaginfo from './data/taginfoTrafficSignData_AU.json' with { type: 'json' }
import beTaginfo from './data/taginfoTrafficSignData_BE.json' with { type: 'json' }
import brTaginfo from './data/taginfoTrafficSignData_BR.json' with { type: 'json' }
import caTaginfo from './data/taginfoTrafficSignData_CA.json' with { type: 'json' }
import deTaginfo from './data/taginfoTrafficSignData_DE.json' with { type: 'json' }
import frTaginfo from './data/taginfoTrafficSignData_FR.json' with { type: 'json' }
import plTaginfo from './data/taginfoTrafficSignData_PL.json' with { type: 'json' }
import type { TaginfoEntry } from './taginfoTypes.js'

const taginfoByCountry: Record<CountryPrefixType, TaginfoEntry[]> = {
  DE: deTaginfo as TaginfoEntry[],
  BE: beTaginfo as TaginfoEntry[],
  AT: atTaginfo as TaginfoEntry[],
  CA: caTaginfo as TaginfoEntry[],
  PL: plTaginfo as TaginfoEntry[],
  FR: frTaginfo as TaginfoEntry[],
  AU: auTaginfo as TaginfoEntry[],
  BR: brTaginfo as TaginfoEntry[],
}

/** @deprecated Use getTaginfoTrafficSignData(countryPrefix) */
export const taginfoTrafficSignData = deTaginfo

export const getTaginfoTrafficSignData = (countryPrefix: CountryPrefixType): TaginfoEntry[] =>
  taginfoByCountry[countryPrefix] ?? []

export type { TaginfoEntry } from './taginfoTypes.js'
