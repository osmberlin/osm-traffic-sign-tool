import type { CountryPrefixType } from '@osm-traffic-signs/converter'
import atMeta from './data/wikiSnapshotMeta_AT.json' with { type: 'json' }
import auMeta from './data/wikiSnapshotMeta_AU.json' with { type: 'json' }
import beMeta from './data/wikiSnapshotMeta_BE.json' with { type: 'json' }
import brMeta from './data/wikiSnapshotMeta_BR.json' with { type: 'json' }
import caMeta from './data/wikiSnapshotMeta_CA.json' with { type: 'json' }
import deMeta from './data/wikiSnapshotMeta_DE.json' with { type: 'json' }
import frMeta from './data/wikiSnapshotMeta_FR.json' with { type: 'json' }
import plMeta from './data/wikiSnapshotMeta_PL.json' with { type: 'json' }

export type WikiSnapshotMeta = {
  parsedAt: string
}

const metaByCountry: Partial<Record<CountryPrefixType, WikiSnapshotMeta>> = {
  AT: atMeta,
  AU: auMeta,
  BE: beMeta,
  BR: brMeta,
  CA: caMeta,
  DE: deMeta,
  FR: frMeta,
  PL: plMeta,
}

export const getWikiSnapshotMeta = (
  countryPrefix: CountryPrefixType,
): WikiSnapshotMeta | undefined => metaByCountry[countryPrefix]
