import { WriteableTrafficSign } from '@/data/types'
import fs from 'node:fs'
import path from 'node:path'
import { trafficSigns } from '../../trafficSigns'
import trafficSignsWiki from './trafficSignsWiki.json'

const svgDirPath = path.join(__dirname, '../../../public/trafficSignsSvgs')
const localTrafficSigns = structuredClone(trafficSigns) as unknown as WriteableTrafficSign[]

const matchedWikiDataKeys: string[] = []

// Add local file path to trafficSigns
fs.readdir(svgDirPath, async (err, files) => {
  if (err) throw err

  for (const svgFileName of files) {
    const wikiSign = trafficSignsWiki.find((values) =>
      decodeURIComponent(values.imageSvg).includes(svgFileName),
    )
    const signKey = Object.entries(localTrafficSigns)
      .find(([key, values]) => {
        return wikiSign && (wikiSign.sign === key || wikiSign.sign === values.signKey)
      })
      ?.at(0)
    const sign = signKey && localTrafficSigns.find((sign) => sign.signKey === signKey)

    if (wikiSign && sign) {
      const file = path.join('/trafficSignsSvgs/', svgFileName)
      sign.image = {
        svgPath: file,
        sourceUrl: wikiSign.imageUrl,
        licence: 'Public Domain',
      }
      matchedWikiDataKeys.push(wikiSign.sign)
      console.log(sign, matchedWikiDataKeys)
    }
  }

  Bun.write(
    path.join(__dirname, 'tempTrafficSignsWithSvg.json'),
    JSON.stringify(localTrafficSigns, null, 2),
  )

  // This part needs to be inside the `readdir` due to async JS
  const unmatchedWikiData = trafficSignsWiki.filter(
    (entry) => !matchedWikiDataKeys.includes(entry.sign),
  )
  Bun.write(
    path.join(__dirname, 'unmatchedWikiData.json'),
    JSON.stringify(unmatchedWikiData, null, 2),
  )
})
