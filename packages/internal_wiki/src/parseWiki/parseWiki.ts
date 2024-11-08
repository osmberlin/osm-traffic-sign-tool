import * as cheerio from 'cheerio'
import path from 'node:path'

const html = await Bun.file(path.join(__dirname, '../downloadWiki/tmp/wikipage.html')).text()
const $ = cheerio.load(html)

const selector = 'tr[id^="Zeichen_"], tr[id^="Zusatzzeichen_"]'
const tableRows = $(selector)
const parsedObjects: {
  sign: string | undefined
  imageSvg: string
  imageUrl: string
  name: string
  osmTags: string[]
  comments: string
}[] = []

tableRows.each((index, row) => {
  if (index === 0) {
    // Skip header row
    return
  }

  const $row = $(row)

  const sign = $row.find('td:nth-child(1) tt').text().split('=').at(1)?.trim()
  const imageSvg = `${$row.find('td:nth-child(1) a img').attr('src')?.split('.svg')[0]?.replace('thumb/', '')}.svg`
  const imagePath = $row.find('td:nth-child(1) a').attr('href')
  const imageUrl = `https://wiki.openstreetmap.org${imagePath}`
  const name = $row.find('td:nth-child(3) big').text()
  const osmTags = $row
    .find('td:nth-child(2) li')
    .text()
    .split('\t')
    .map((e) => e.trim())
    .filter(Boolean)

  const comments = $row
    .find('td:nth-child(3)')
    .text()
    .replace(name, '')
    .replace('Anmerkungen:', '')
    .replace(/[\n\t]+/g, ' ')
    .replace('  ', ' ')
    .trim()

  parsedObjects.push({
    sign,
    imageSvg,
    imageUrl,
    name,
    osmTags,
    comments,
  })
})

const signMap = new Map<string, (typeof parsedObjects)[number]>()
const duplicates: (typeof parsedObjects)[number][] = []

parsedObjects
  .filter((s) => !!s.sign)
  .forEach((obj) => {
    if (signMap.has(obj.sign!)) {
      duplicates.push(obj)
    } else {
      signMap.set(obj.sign!, obj)
    }
  })

const deduplicated = Array.from(signMap.values())

console.log('Deduplicated objects:', deduplicated)
console.log('Removed duplicates:', duplicates)

const outputPath = path.resolve(__dirname, '../data/trafficSignsWiki.json')
Bun.write(outputPath, JSON.stringify(Array.from(deduplicated), null, 2))

console.log('Parsed object saved to', outputPath)
