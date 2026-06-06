import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { CountryPrefixType } from '@osm-traffic-signs/converter'

export const wikiSnapshotFilename = (countryPrefix: CountryPrefixType) =>
  `trafficSignsWiki_${countryPrefix}.json`

export const wikiSnapshotPath = (
  countryPrefix: CountryPrefixType,
  baseDir = path.dirname(fileURLToPath(import.meta.url)),
) => path.join(baseDir, 'data', wikiSnapshotFilename(countryPrefix))
