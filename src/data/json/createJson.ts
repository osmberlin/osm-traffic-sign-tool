import fs from 'fs'
import path from 'path'
import { trafficSigns } from '../trafficSigns'

const trafficSignsJSON = JSON.stringify(trafficSigns)

const fileName = 'trafficSigns.json'
const filePath = path.join(__dirname, fileName)

fs.writeFile(filePath, trafficSignsJSON, (err) => {
	if (err) {
		console.error(err)
		return
	}
	console.log('File saved successfully!')
})
