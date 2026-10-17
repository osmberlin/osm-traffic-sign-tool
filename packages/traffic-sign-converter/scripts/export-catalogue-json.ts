import path from 'node:path'
import {
  countries,
  countryDefinitions,
  type CountryPrefixType,
} from '../src/data-definitions/countryDefinitions.js'
import { signRelations } from '../src/data-definitions/signRelations.js'

/** One country's catalogue for consumers without JavaScript, e.g. Python or QGIS */
export const catalogueJson = (countryPrefix: CountryPrefixType, version: string) =>
  `${JSON.stringify(
    {
      country: countryPrefix,
      version,
      signs: countryDefinitions[countryPrefix],
      relations: signRelations[countryPrefix],
    },
    null,
    2,
  )}\n`

if (import.meta.main) {
  const packageRoot = path.resolve(import.meta.dir, '..')
  const { version } = await Bun.file(path.join(packageRoot, 'package.json')).json()
  for (const countryPrefix of countries) {
    const file = path.join(packageRoot, 'dist/data', `${countryPrefix}.json`)
    await Bun.write(file, catalogueJson(countryPrefix, version))
  }
}
