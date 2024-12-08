import type { CountryPrefixType } from '@osm-traffic-signs/converter'
import fs from 'node:fs'
import path from 'node:path'

/** @description Create `data/DE` */
export const prepareDirectoryCountry = (countryPrefix: CountryPrefixType) => {
  const countryDirectory = path.join(__dirname, '../data-svgs', countryPrefix)

  // Create folders
  if (!fs.existsSync(countryDirectory)) {
    fs.mkdirSync(countryDirectory, { recursive: true })
  }

  return countryDirectory
}
