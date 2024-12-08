import type { CountryPrefixType } from '@osm-traffic-signs/converter'
import fs from 'node:fs'
import path from 'node:path'
import { prepareDirectoryCountry } from './prepareDirectoryCountry.js'

/** @description Create `data/DE/svgs` */
export const prepareDirectorySvgs = (countryPrefix: CountryPrefixType) => {
  const svgDirectory = path.join(prepareDirectoryCountry(countryPrefix), 'svgs')

  if (!fs.existsSync(svgDirectory)) {
    fs.mkdirSync(svgDirectory)
  }

  return svgDirectory
}
