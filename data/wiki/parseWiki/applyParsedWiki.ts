import fs from 'fs'
import path from 'path'
import { trafficSigns } from '../../trafficSigns'
import trafficSignsWiki from './trafficSignsWiki.json'
import type { TrafficSign } from '@/data/types'

const svgDirPath = path.join(__dirname, '../../../../static/trafficSignsSvgs')
const localTrafficSigns = structuredClone(trafficSigns) as TrafficSign[]
const matchedWikiDataKeys: string[] = []

// Add local file path to trafficSigns
fs.readdir(svgDirPath, async (err, files) => {
	if (err) throw err

	for (const svgFileName of files) {
		const wikiSign = trafficSignsWiki.find((values) =>
			decodeURIComponent(values.imageSvg).includes(svgFileName)
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
				licence: 'Public Domain'
			}
			matchedWikiDataKeys.push(wikiSign.sign)
			console.log(sign, matchedWikiDataKeys)
		}
	}

	await fs.promises.writeFile(
		path.join(__dirname, 'tempTrafficSignsWithSvg.json'),
		JSON.stringify(localTrafficSigns, null, 2)
	)

	// This part needs to be inside the `readdir` due to async JS
	const unmatchedWikiData = trafficSignsWiki.filter(
		(entry) => !matchedWikiDataKeys.includes(entry.sign)
	)
	await fs.promises.writeFile(
		path.join(__dirname, 'unmatchedWikiData.json'),
		JSON.stringify(unmatchedWikiData, null, 2)
	)
})
