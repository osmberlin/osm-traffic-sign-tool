import { describe, expect, test } from 'vitest'
import { collectTags } from './collectTags'
import type { TrafficSign, TrafficSignMap } from '@/data/types'

describe('collectTags()', () => {
	const baseInput = {
		urlString: 'todo',
		name: 'name',
		descriptiveName: null,
		description: null,
		category: 'traffic_sign'
	} satisfies TrafficSign

	test('does nothing when no input given', () => {
		const input = [
			['DE:333', { ...baseInput, urlString: 'DE:333' }],
			['DE:444', { ...baseInput, urlString: 'DE:444' }]
		] as TrafficSignMap[]
		const result = collectTags(input)

		expect(result).toMatchObject([])
	})

	test('handles osmTags', () => {
		const input = [
			['DE:333', { ...baseInput, urlString: 'DE:333', osmTags: { foo: 'bar', lorem: ['a', 'b'] } }]
		] satisfies TrafficSignMap[]
		const result = collectTags(input)

		expect(result).toMatchObject([
			['foo', 'bar'],
			['lorem', ['a', 'b']]
		])
	})

	test('handles key, value', () => {
		const input = [
			[
				'DE:333',
				{
					...baseInput,
					urlString: 'DE:333',
					osmTags: { foo: 'bar' },
					key: 'highway',
					value: 'bridleway'
				}
			]
		] satisfies TrafficSignMap[]
		const result = collectTags(input)

		expect(result).toMatchObject([
			['foo', 'bar'],
			['highway', 'bridleway']
		])
	})

	test('handles key, value', () => {
		const input = [
			[
				'DE:333',
				{
					...baseInput,
					urlString: 'DE:333',
					key: 'maxweight',
					valuePrompt: {
						prompt: 'Gewicht in Tonnen ohne Einheit',
						defaultValue: '5.5',
						format: 'float'
					}
				}
			]
		] satisfies TrafficSignMap[]
		const result = collectTags(input)

		expect(result).toMatchObject([['maxweight', '5.5']])
	})
})
