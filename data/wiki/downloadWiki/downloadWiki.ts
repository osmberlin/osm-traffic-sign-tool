import path from 'node:path'

const downloadWikiPage = async () => {
  const url = 'https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland'

  const response = await fetch(url)

  const html = await response.text()

  const filePath = path.join(__dirname, 'wikipage.html')
  Bun.write(filePath, html)
}

downloadWikiPage()
  .then(() => console.log('Wiki page downloaded successfully'))
  .catch((error) => console.error('Error downloading wiki page:', error))
