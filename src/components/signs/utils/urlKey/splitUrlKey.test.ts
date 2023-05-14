import { describe, expect, test } from 'vitest'
import { splitUrlKey } from './splitUrlKey'

describe('splitUrlKey()', () => {
	test('Primary sign "DE:123"', () => {
		const input = 'DE:123'
		const result = splitUrlKey(input)
		expect(result).toMatchObject({ signKey: 'DE:123', signValue: undefined })
	})

	test('Primary sign with value "DE:123[4.4]"', () => {
		const input = 'DE:123[4.4]'
		const result = splitUrlKey(input)
		expect(result).toMatchObject({ signKey: 'DE:123', signValue: '4.4' })
	})

	test('Secondary sign "1234-56"', () => {
		const input = '1234-56'
		const result = splitUrlKey(input)
		expect(result).toMatchObject({ signKey: '1234-56', signValue: undefined })
	})
})
