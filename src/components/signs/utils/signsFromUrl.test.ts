import { describe, expect, test } from 'vitest'
import { signsFromUrl } from './signsFromUrl'

describe('signsFromUrl()', () => {
	// const trafficSigns = trafficSignsJson as unknown as TrafficSignsWithWiki

	test('no input, no output', () => {
		const input = null
		const result = signsFromUrl(input)
		expect(result).toMatchObject([])
	})

	test('filter two, check order', () => {
		const input = ['DE:237', 'DE:1042-38']
		const result = signsFromUrl(input)
		expect(result.length).toBe(2)
		// Check order:
		const [[oneKey, oneValues], [twoKey, twoValues]] = result
		expect(oneKey).toBe(input[0])
		expect(oneValues.urlString).toBe(input[0])
		expect(twoKey).toBe(input[1])
		expect(twoValues.urlString).toBe(input[1])
	})

	test('filter only known', () => {
		const input = ['DE:237', 'DE:1042-38', 'DE:unknown']
		const result = signsFromUrl(input)
		expect(result.length).toBe(2)
	})

	test('fill in valuePrompt-values from [123]', () => {
		const input = ['DE:237[Sa,So]', 'DE:238[5.5]', 'DE:239[60]', 'DE:1042-38']
		const result = signsFromUrl(input)

		const [oneValues, twoValues, threeValues, fourValues] = result.map(([_, values]) => values)
		console.log({ oneValues, twoValues, threeValues, fourValues })
		expect(oneValues.urlString).toBe('DE:237[Sa,So]')
		expect(oneValues.urlKey).toBe('DE:237')
		expect(oneValues.urlValue).toBe('Sa,So')
		expect(twoValues.urlString).toBe('DE:238[5.5]')
		expect(twoValues.urlKey).toBe('DE:238')
		expect(twoValues.urlValue).toBe('5.5')
		expect(threeValues.urlString).toBe('DE:239[60]')
		expect(threeValues.urlKey).toBe('DE:239')
		expect(threeValues.urlValue).toBe('60')
		expect(fourValues.urlString).toBe('DE:1042-38')
		expect(fourValues.urlKey).toBe('DE:1042-38')
		expect(fourValues.urlValue).toBe(undefined)
	})
})
