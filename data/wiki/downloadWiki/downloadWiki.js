import axios from 'axios'
import fs from 'fs'
import path from 'path'

const downloadWikiPage = async () => {
  const url = 'https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland'
  const filePath = path.join(__dirname, 'wikipage.html')

  const writer = fs.createWriteStream(filePath)
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

downloadWikiPage()
  .then(() => console.log('Wiki page downloaded successfully'))
  .catch((error) => console.error('Error downloading wiki page:', error))
