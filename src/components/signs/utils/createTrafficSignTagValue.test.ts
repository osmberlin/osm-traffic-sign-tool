import { describe, expect, test } from 'vitest'
import { createTrafficSignTagValue } from './createTrafficSignTagValue'
import type { TrafficSignMap } from '@/data/types'

describe('createTrafficSignTagValue()', () => {
	test('one key, primary category', () => {
		const input = [
			['DE:333', { urlString: 'DE:333', category: 'traffic_sign' }]
		] as TrafficSignMap[]
		const result = createTrafficSignTagValue(input)

		expect(result).toMatchObject(`DE:333`)
	})

	test('one key, secondary category', () => {
		const input = [
			['DE:10-10', { urlString: 'DE:10-10', category: 'modifier_sign' }]
		] as TrafficSignMap[]
		const result = createTrafficSignTagValue(input)

		expect(result).toMatchObject(`DE:10-10`)
	})

	test('two keys, both primary category', () => {
		const input = [
			['DE:333', { urlString: 'DE:333', category: 'traffic_sign' }],
			['DE:444', { urlString: 'DE:444', category: 'traffic_sign' }]
		] as TrafficSignMap[]
		const result = createTrafficSignTagValue(input)

		expect(result).toMatchObject(`DE:333;444`)
	})

	test('two keys, both secondary category', () => {
		const input = [
			['DE:10-10', { urlString: 'DE:10-10', category: 'modifier_sign' }],
			['DE:12-12', { urlString: 'DE:12-12', category: 'modifier_sign_restriction' }]
		] as TrafficSignMap[]
		const result = createTrafficSignTagValue(input)

		expect(result).toMatchObject(`DE:10-10,12-12`)
	})

	test('mixed case', () => {
		const input = [
			['DE:333', { urlString: 'DE:333', category: 'traffic_sign' }],
			['DE:10-10', { urlString: 'DE:10-10', category: 'modifier_sign' }],
			['DE:12-12', { urlString: 'DE:12-12', category: 'modifier_sign_restriction' }],
			['DE:444', { urlString: 'DE:444', category: 'traffic_sign' }],
			['DE:555', { urlString: 'DE:555', category: 'traffic_sign' }],
			['DE:13-13', { urlString: 'DE:13-13', category: 'modifier_sign_restriction' }]
		] as TrafficSignMap[]
		const result = createTrafficSignTagValue(input)

		expect(result).toMatchObject(`DE:333,10-10,12-12;444;555,13-13`)
	})
})
