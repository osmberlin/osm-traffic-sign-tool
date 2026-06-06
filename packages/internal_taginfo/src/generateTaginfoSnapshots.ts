import { z } from 'zod'
import {
  countryTaginfoConfigs,
  taginfoSnapshotCountryPrefixes,
  type CountryTaginfoConfig,
} from './countryTaginfoConfigs.js'
import { taginfoSnapshotMetaPath, taginfoSnapshotPath } from './taginfoSnapshotPaths.js'

const numResults = 100

const ValueSchema = z.object({
  data: z.array(
    z.object({
      value: z.string(),
      count: z.number(),
    }),
  ),
})

import type { TaginfoEntry } from './taginfoTypes.js'
export type { TaginfoEntry } from './taginfoTypes.js'

const buildUrls = (config: CountryTaginfoConfig) => {
  const base = `https://taginfo.geofabrik.de/${config.geofabrikRegion}/api/4/key/values`
  const keys = ['traffic_sign', 'traffic_sign:forward', 'traffic_sign:backward'] as const
  return keys.map(
    (key) =>
      `${base}?key=${encodeURIComponent(key)}&filter=all&lang=${config.apiLang}&sortname=count&sortorder=desc&rp=${numResults}&page=1`,
  )
}

export const fetchTaginfoSnapshotForCountry = async (
  countryPrefix: keyof typeof countryTaginfoConfigs,
): Promise<TaginfoEntry[]> => {
  const config = countryTaginfoConfigs[countryPrefix]
  const results = new Map<string, number>()

  for (const url of buildUrls(config)) {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`)
    }
    const { data } = ValueSchema.parse(await response.json())
    for (const entry of data) {
      results.set(entry.value, (results.get(entry.value) ?? 0) + entry.count)
    }
  }

  return [...results.entries()].sort((a, b) => b[1] - a[1])
}

export const writeTaginfoSnapshot = async (
  countryPrefix: keyof typeof countryTaginfoConfigs,
  entries: TaginfoEntry[],
) => {
  const outputPath = taginfoSnapshotPath(countryPrefix)
  await Bun.write(outputPath, JSON.stringify(entries, undefined, 2))
  console.log(`Wrote ${entries.length} values to ${outputPath}`)

  const metaPath = taginfoSnapshotMetaPath(countryPrefix)
  const meta = { parsedAt: new Date().toISOString() }
  await Bun.write(metaPath, `${JSON.stringify(meta, null, 2)}\n`)
  console.log(`Wrote snapshot meta to ${metaPath}`)
}

const main = async () => {
  const countryArg = process.argv[2] ?? 'ALL'
  const targets =
    countryArg === 'ALL'
      ? taginfoSnapshotCountryPrefixes
      : (countryArg
          .split(',')
          .map((value) => value.trim()) as (keyof typeof countryTaginfoConfigs)[])

  for (const countryPrefix of targets) {
    if (!countryTaginfoConfigs[countryPrefix]) {
      console.error(`No taginfo config for ${countryPrefix}`)
      process.exit(1)
    }
    console.log(`[${countryPrefix}] Fetching taginfo...`)
    const entries = await fetchTaginfoSnapshotForCountry(countryPrefix)
    await writeTaginfoSnapshot(countryPrefix, entries)
  }
}

if (import.meta.main) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
