import type { CountryPrefixType } from '@osm-traffic-signs/converter'
import atMeta from './data/taginfoSnapshotMeta_AT.json' with { type: 'json' }
import auMeta from './data/taginfoSnapshotMeta_AU.json' with { type: 'json' }
import beMeta from './data/taginfoSnapshotMeta_BE.json' with { type: 'json' }
import brMeta from './data/taginfoSnapshotMeta_BR.json' with { type: 'json' }
import caMeta from './data/taginfoSnapshotMeta_CA.json' with { type: 'json' }
import deMeta from './data/taginfoSnapshotMeta_DE.json' with { type: 'json' }
import frMeta from './data/taginfoSnapshotMeta_FR.json' with { type: 'json' }
import plMeta from './data/taginfoSnapshotMeta_PL.json' with { type: 'json' }

export type TaginfoSnapshotMeta = {
  parsedAt: string
}

const metaByCountry: Partial<Record<CountryPrefixType, TaginfoSnapshotMeta>> = {
  AT: atMeta,
  AU: auMeta,
  BE: beMeta,
  BR: brMeta,
  CA: caMeta,
  DE: deMeta,
  FR: frMeta,
  PL: plMeta,
}

export const getTaginfoSnapshotMeta = (
  countryPrefix: CountryPrefixType,
): TaginfoSnapshotMeta | undefined => metaByCountry[countryPrefix]
