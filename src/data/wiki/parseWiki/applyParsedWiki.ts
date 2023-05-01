import fs from 'fs'
import path from 'path'
import { trafficSigns, type TrafficSignsWithWiki } from '../../trafficSigns'
import wikiData from './trafficSignsWiki.json'

const svgDirPath = path.join(__dirname, '../../../../static/trafficSignsSvgs')
const localTrafficSigns = structuredClone(trafficSigns) as TrafficSignsWithWiki
const matchedWikiDataKeys: string[] = []

// Add wiki data to trafficSigns
Object.keys(localTrafficSigns).forEach((key) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const wikiInfo = wikiData.find((item) => item.sign === key) as any
	if (wikiInfo) {
		localTrafficSigns[key].wikiData = wikiInfo
		matchedWikiDataKeys.push(key)
	}
})

// Add local file path to trafficSigns
fs.readdir(svgDirPath, async (err, files) => {
	if (err) throw err

	for (const svgFileName of files) {
		const sign = Object.entries(localTrafficSigns).find(
			([_, values]) =>
				values.wikiData && decodeURIComponent(values.wikiData.imageSvg).includes(svgFileName)
		)

		if (sign) {
			const file = path.join('/trafficSignsSvgs/', svgFileName)
			localTrafficSigns[sign[0]].localFile = file
		}
	}

	await fs.promises.writeFile(
		path.join(__dirname, '../../trafficSignsWithWiki.json'),
		JSON.stringify(localTrafficSigns, null, 2)
	)
})

const unmatchedWikiData = wikiData.filter((e) => !matchedWikiDataKeys.includes(e.sign))
await fs.promises.writeFile(
	path.join(__dirname, '../../unmatchedWikiData.json'),
	JSON.stringify(unmatchedWikiData, null, 2)
)
