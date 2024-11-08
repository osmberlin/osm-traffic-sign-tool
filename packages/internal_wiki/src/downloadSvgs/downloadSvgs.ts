import fs from 'node:fs'
import path from 'node:path'
import trafficSignsWiki from '../data/trafficSignsWiki.json'
import { cleanFilename } from '../utils/cleanFilename.js'

const svgFolder = path.join(__dirname, '../data/svgs')
if (!fs.existsSync(svgFolder)) {
  fs.mkdirSync(svgFolder)
}

const downloadErrors: string[] = []

async function downloadSvg(svgId: string, svgUrl: string) {
  // const fileName = decodeURIComponent(svgUrl.split('/').pop() ?? svgUrl) // Extract the filename from the URL
  const name = `${cleanFilename(svgId)}.svg`
  const filePath = path.join(svgFolder, name)
  try {
    const response = await (await fetch(svgUrl)).text()
    Bun.write(filePath, response)
    return { svgId, filePath }
  } catch (error) {
    downloadErrors.push(svgUrl)
  }
  return undefined
}

async function downloadAllSvgs() {
  // DOWNLOAD FILES
  const downloadPromises = trafficSignsWiki.map(({ sign, imageSvg }) => {
    return downloadSvg(sign, imageSvg)
  })
  const files = await Promise.all(downloadPromises)

  if (downloadErrors.length > 0) {
    Bun.write(
      path.join(__dirname, 'tmp/downloadErrors.json'),
      JSON.stringify(downloadErrors, null, 2),
    )
  }

  // WRITE TYPES FILE – one export line per file
  const fileNames = Array.from(
    new Set(files.filter((file) => !!file).map(({ svgId }) => cleanFilename(svgId))),
  )
  const svgExportContent = fileNames
    .sort((a, b) => a.localeCompare(b))
    .map((name) => {
      const relativePath = path.join('./svgs/', name)
      return `export { default as ${name} } from './${relativePath}.svg'`
    })
    .join('\n')
  Bun.write(path.join(__dirname, '../data/svgExports.ts'), svgExportContent)

  console.log('All SVGs downloaded successfully!')
}

downloadAllSvgs().catch((error) => {
  console.error(error)
  process.exit(1)
})
