import type { TrafficSign, TrafficSignWithWikiEntry } from '@/data/trafficSigns'

// https://wiki.openstreetmap.org/wiki/DE:Key:traffic_sign#Werte
// > Mehrere Verkehrszeichen können mit unterschiedlichen Trennzeichen markiert werden. Verkehrszeichen, die nicht miteinander in Verbindung stehen (wie z. B. Zulässige Höchstgeschwindigkeit und eingeschränktes Haltverbot), werden durch ein Semikolon ; getrennt. In Verbindung stehende Verkehrszeichen (wie z. B. Verbot der Einfahrt plus Linienbusse frei) werden durch ein Komma , getrennt.

export const createTrafficSignValue = (signs: TrafficSignWithWikiEntry[]) => {
	type SignIdCat = [string, TrafficSign['category']][]
	const signIdCats: SignIdCat = signs.map(([key, { category }]) => [
		key.replace('DE:', ''),
		category
	])

	const string: string[] = []
	signIdCats.forEach(([key, category], index) => {
		if (index === 0) {
			string.push(key)
			return
		}

		const separator = category === 'traffic_sign' ? ';' : ','

		string.push(`${separator}${key}`)
		return
	})

	return `DE:${string.join('')}`
}
