import type { TrafficSign } from '@/data/types'
import { describe, expect, test } from 'vitest'
import { collectTags } from './collectTags'

describe('collectTags()', () => {
	const baseInput = {
		urlKey: 'todo',
		signKey: 'todo',
		signValue: undefined,
		name: 'name',
		descriptiveName: null,
		description: null,
		category: 'traffic_sign',
		image: { svgPath: undefined, sourceUrl: undefined, licence: undefined }
	} satisfies TrafficSign

	test('does nothing when no input given', () => {
		const input = [
			{ ...baseInput, urlKey: 'DE:333' },
			{ ...baseInput, urlKey: 'DE:444' }
		] satisfies TrafficSign[]
		const result = collectTags(input)

		expect(result).toMatchObject([])
	})

	test('handles osmTags', () => {
		const input = [
			{ ...baseInput, urlKey: 'DE:333', osmTags: { foo: 'bar', lorem: ['a', 'b'] } }
		] satisfies TrafficSign[]
		const result = collectTags(input)

		expect(result).toMatchObject([
			['foo', 'bar'],
			['lorem', ['a', 'b']]
		])
	})

	test('handles key, value', () => {
		const input = [
			{
				...baseInput,
				urlKey: 'DE:333',
				osmTags: { foo: 'bar' },
				key: 'highway',
				value: 'bridleway'
			}
		] satisfies TrafficSign[]
		const result = collectTags(input)

		expect(result).toMatchObject([
			['foo', 'bar'],
			['highway', 'bridleway']
		])
	})

	test('handles key, value', () => {
		const input = [
			{
				...baseInput,
				urlKey: 'DE:333',
				key: 'maxweight',
				valuePrompt: {
					prompt: 'Gewicht in Tonnen ohne Einheit',
					defaultValue: '5.5',
					format: 'float'
				}
			}
		] satisfies TrafficSign[]
		const result = collectTags(input)

		expect(result).toMatchObject([['maxweight', '5.5']])
	})
})
