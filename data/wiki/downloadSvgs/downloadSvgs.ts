import fs from 'node:fs'
import path from 'node:path'
import trafficSignsWiki from '../parseWiki/trafficSignsWiki.json'

const svgFolder = path.join(__dirname, '../../../apps/traffic-sign-tool/public/trafficSignsSvgs')
if (!fs.existsSync(svgFolder)) {
  fs.mkdirSync(svgFolder)
}

const downloadErrors: string[] = []

async function downloadSvg(svgUrl: string) {
  try {
    const fileName = decodeURIComponent(svgUrl.split('/').pop() ?? svgUrl) // Extract the filename from the URL
    const filePath = path.join(svgFolder, fileName)

    const response = await (await fetch(svgUrl)).text()
    Bun.write(filePath, response)
  } catch (error) {
    downloadErrors.push(svgUrl)
  }
}

async function downloadAllSvgs() {
  const downloadPromises = trafficSignsWiki.map(
    ({ imageSvg }: { imageSvg: string | undefined }) => imageSvg && downloadSvg(imageSvg),
  )
  await Promise.all(downloadPromises)

  if (downloadErrors.length > 0) {
    Bun.write(path.join(__dirname, 'downloadErrors.json'), JSON.stringify(downloadErrors, null, 2))
  }

  console.log('All SVGs downloaded successfully!')
}

downloadAllSvgs().catch((error) => {
  console.error(error)
  process.exit(1)
})
