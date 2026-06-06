import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { CountryPrefixType } from '@osm-traffic-signs/converter'

export const taginfoSnapshotFilename = (countryPrefix: CountryPrefixType) =>
  `taginfoTrafficSignData_${countryPrefix}.json`

export const taginfoSnapshotMetaFilename = (countryPrefix: CountryPrefixType) =>
  `taginfoSnapshotMeta_${countryPrefix}.json`

export const taginfoSnapshotPath = (
  countryPrefix: CountryPrefixType,
  baseDir = path.dirname(fileURLToPath(import.meta.url)),
) => path.join(baseDir, 'data', taginfoSnapshotFilename(countryPrefix))

export const taginfoSnapshotMetaPath = (
  countryPrefix: CountryPrefixType,
  baseDir = path.dirname(fileURLToPath(import.meta.url)),
) => path.join(baseDir, 'data', taginfoSnapshotMetaFilename(countryPrefix))
