import { describe, expect, test } from 'vitest'
import { createTrafficSignTagValue } from './createTrafficSignTagValue'
import type { TrafficSign } from '@/data/types'

describe('createTrafficSignTagValue()', () => {
	test('one key, primary category', () => {
		const input = [{ urlKey: 'DE:333', category: 'traffic_sign' }] as TrafficSign[]
		const result = createTrafficSignTagValue(input)

		expect(result).toMatchObject(`DE:333`)
	})

	test('one key, secondary category', () => {
		const input = [{ urlKey: 'DE:10-10', category: 'modifier_sign' }] as TrafficSign[]
		const result = createTrafficSignTagValue(input)

		expect(result).toMatchObject(`DE:10-10`)
	})

	test('two keys, both primary category', () => {
		const input = [
			{ urlKey: 'DE:333', category: 'traffic_sign' },
			{ urlKey: 'DE:444', category: 'traffic_sign' }
		] as TrafficSign[]
		const result = createTrafficSignTagValue(input)

		expect(result).toMatchObject(`DE:333;444`)
	})

	test('two keys, both secondary category', () => {
		const input = [
			{ urlKey: 'DE:10-10', category: 'modifier_sign' },
			{ urlKey: 'DE:12-12', category: 'modifier_sign_restriction' }
		] as TrafficSign[]
		const result = createTrafficSignTagValue(input)

		expect(result).toMatchObject(`DE:10-10,12-12`)
	})

	test('mixed case', () => {
		const input = [
			{ urlKey: 'DE:333', category: 'traffic_sign' },
			{ urlKey: 'DE:10-10', category: 'modifier_sign' },
			{ urlKey: 'DE:12-12', category: 'modifier_sign_restriction' },
			{ urlKey: 'DE:444', category: 'traffic_sign' },
			{ urlKey: 'DE:555', category: 'traffic_sign' },
			{ urlKey: 'DE:13-13', category: 'modifier_sign_restriction' }
		] as TrafficSign[]
		const result = createTrafficSignTagValue(input)

		expect(result).toMatchObject(`DE:333,10-10,12-12;444;555,13-13`)
	})
})
