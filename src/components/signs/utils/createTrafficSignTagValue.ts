// https://wiki.openstreetmap.org/wiki/DE:Key:traffic_sign#Werte
// > Mehrere Verkehrszeichen können mit unterschiedlichen Trennzeichen markiert werden. Verkehrszeichen, die nicht miteinander in Verbindung stehen (wie z. B. Zulässige Höchstgeschwindigkeit und eingeschränktes Haltverbot), werden durch ein Semikolon ; getrennt. In Verbindung stehende Verkehrszeichen (wie z. B. Verbot der Einfahrt plus Linienbusse frei) werden durch ein Komma , getrennt.

import type { TrafficSign, TrafficSignMap } from '@/data/types'

export const createTrafficSignTagValue = (signs: TrafficSignMap[]) => {
	type SignIdCat = [string, TrafficSign['category']][]
	const signIdCats: SignIdCat = signs.map(([_, { urlString, category }]) => [
		urlString.replace('DE:', ''),
		category
	])

	const string: string[] = []
	signIdCats.forEach(([cleanUrlString, category], index) => {
		if (index === 0) {
			string.push(cleanUrlString)
			return
		}

		const separator = category === 'traffic_sign' ? ';' : ','

		string.push(`${separator}${cleanUrlString}`)
		return
	})

	return `DE:${string.join('')}`
}
