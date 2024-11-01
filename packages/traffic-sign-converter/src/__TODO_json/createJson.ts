import fs from 'fs'
import path from 'path'
import { trafficSignData } from '../data/trafficSignData.js'

const trafficSignsJSON = JSON.stringify(trafficSignData)

const fileName = 'trafficSigns.json'
const filePath = path.join(__dirname, fileName)

fs.writeFile(filePath, trafficSignsJSON, (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('File saved successfully!')
})
