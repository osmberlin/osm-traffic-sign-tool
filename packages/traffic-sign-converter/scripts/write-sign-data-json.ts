import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const packageRoot = path.resolve(import.meta.dir, '..')
const dist = path.join(packageRoot, 'dist')
const outDir = path.join(dist, 'sign-data')

const toFileUrl = (relativePath: string) => pathToFileURL(path.join(dist, relativePath)).href

const writeJson = async (filename: string, data: unknown) => {
  await Bun.write(path.join(outDir, filename), `${JSON.stringify(data, null, 2)}\n`)
}

const { countryDefinitions } = await import(toFileUrl('data-definitions/countryDefinitions.js'))
const { countryCatalogueMeta } = await import(toFileUrl('data-definitions/countryCatalogueMeta.js'))
const { generalRedirects } = await import(toFileUrl('data-definitions/generalRedirects.js'))

await mkdir(outDir, { recursive: true })

await writeJson('general-redirects.json', generalRedirects)
await writeJson('catalogue-meta.json', countryCatalogueMeta)

for (const [countryCode, signs] of Object.entries(countryDefinitions)) {
  await writeJson(`${countryCode}.json`, signs)
}

const manifest = {
  version: 1,
  schemaNote:
    'Each {CC}.json is SignType[]; fields match TrafficSignDataTypes (tagRecommendationsByGeometry, image, questions, …).',
  countries: Object.keys(countryDefinitions).sort(),
  files: {
    countries: Object.fromEntries(
      Object.keys(countryDefinitions).map((countryCode) => [countryCode, `./${countryCode}.json`]),
    ),
    catalogueMeta: './catalogue-meta.json',
    generalRedirects: './general-redirects.json',
  },
  relatedAssets: {
    bundledSvgs: '@osm-traffic-signs/converter/data-svgs/{CC}/svgs/{signId}.svg',
  },
}

await writeJson('manifest.json', manifest)
