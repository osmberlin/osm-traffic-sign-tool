import fs from 'fs'
import path from 'path'
import axios from 'axios'

const filePath = path.join(__dirname, '../parseWiki/trafficSignsWiki.json')
const fileContent = fs.readFileSync(filePath).toString()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parsedObject = JSON.parse(fileContent) as any

const svgFolder = path.join(__dirname, 'svgs')
if (!fs.existsSync(svgFolder)) {
	fs.mkdirSync(svgFolder)
}

const downloadErrors: string[] = []

async function downloadSvg(svgUrl: string) {
	try {
		const response = await axios.get(svgUrl, { responseType: 'stream' })
		const fileName = decodeURIComponent(svgUrl.split('/').pop() ?? svgUrl) // Extract the filename from the URL
		const filePath = path.join(svgFolder, fileName)
		const writer = fs.createWriteStream(filePath)
		response.data.pipe(writer)
		await new Promise((resolve, reject) => {
			writer.on('finish', resolve)
			writer.on('error', reject)
		})
	} catch (error) {
		downloadErrors.push(svgUrl)
	}
}

async function downloadAllSvgs() {
	const downloadPromises = parsedObject.map(
		({ imageSvg }: { imageSvg: string | undefined }) => imageSvg && downloadSvg(imageSvg)
	)
	await Promise.all(downloadPromises)
	if (downloadErrors.length > 0) {
		fs.writeFileSync(
			path.join(__dirname, 'downloadErrors.json'),
			JSON.stringify(downloadErrors, null, 2)
		)
	}
	console.log('All SVGs downloaded successfully!')
}

downloadAllSvgs().catch((error) => {
	console.error(error)
	process.exit(1)
})
