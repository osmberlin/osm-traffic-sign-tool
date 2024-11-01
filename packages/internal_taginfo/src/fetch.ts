import { z } from 'zod'

const numResults = 100
const DEBUG = numResults < 10

const urlsToFetch = [
  // traffic_sign=*
  // https://taginfo.geofabrik.de/europe:germany/keys/traffic_sign#values
  `https://taginfo.geofabrik.de/europe:germany/api/4/key/values?key=traffic_sign&filter=all&lang=de&sortname=count&sortorder=desc&rp=${numResults}&page=1`,
  // traffic_sign:forward=*
  // https://taginfo.geofabrik.de/europe:germany/keys/traffic_sign:forward#values
  `https://taginfo.geofabrik.de/europe:germany/api/4/key/values?key=traffic_sign:forward&filter=all&lang=de&sortname=count&sortorder=desc&rp=${numResults}&page=1`,
  // traffic_sign:backward=*
  // https://taginfo.geofabrik.de/europe:germany/keys/traffic_sign:backward#values
  `https://taginfo.geofabrik.de/europe:germany/api/4/key/values?key=traffic_sign:backward&filter=all&lang=de&sortname=count&sortorder=desc&rp=${numResults}&page=1`,
]

const results: Map<string, number> = new Map()

const Schema = z.object({
  data: z.array(
    z.object({
      value: z.string(),
      count: z.number(),
    }),
  ),
})

for await (const url of urlsToFetch) {
  DEBUG && console.log('FETCH:', url)

  const result = await (await Bun.fetch(url)).json()
  DEBUG && console.log('DEBUG RESULT:', result)

  const { data } = Schema.parse(result)

  for (const entry of data) {
    const sum = (results.get(entry.value) || 0) + entry.count
    results.set(entry.value, sum)
  }
}

DEBUG && console.log('DEBUG RESULTS:', results)

const sorted = Array.from(results.entries()).sort((a, b) => b[1] - a[1])

DEBUG && console.log('DEBUG SORTED:', sorted)

Bun.write('./dist/data/taginfoTrafficSignData.json', JSON.stringify(sorted, undefined, 2))
