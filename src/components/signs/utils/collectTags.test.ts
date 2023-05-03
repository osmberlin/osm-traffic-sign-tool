import { describe, expect, test } from 'vitest'
import { collectTags } from './collectTags'
import type { TrafficSignWithWiki, TrafficSignWithWikiEntry } from '@/data/trafficSigns'

describe('collectTags()', () => {
	const baseInput = {
		name: 'name',
		descriptiveName: null,
		description: null,
		category: 'traffic_sign'
	} satisfies TrafficSignWithWiki

	test('does nothing when no input given', () => {
		const input = [
			['DE:333', baseInput],
			['DE:444', baseInput]
		] as TrafficSignWithWikiEntry[]
		const result = collectTags(input)

		expect(result).toMatchObject([])
	})

	test('handles osmTags', () => {
		const input = [
			['DE:333', { ...baseInput, osmTags: { foo: 'bar', lorem: ['a', 'b'] } }]
		] satisfies TrafficSignWithWikiEntry[]
		const result = collectTags(input)

		expect(result).toMatchObject([
			['foo', 'bar'],
			['lorem', ['a', 'b']]
		])
	})

	test('handles key, value', () => {
		const input = [
			['DE:333', { ...baseInput, osmTags: { foo: 'bar' }, key: 'highway', value: 'bridleway' }]
		] satisfies TrafficSignWithWikiEntry[]
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
					key: 'maxweight',
					valuePrompt: {
						prompt: 'Gewicht in Tonnen ohne Einheit',
						defaultValue: '5.5',
						format: 'float'
					}
				}
			]
		] satisfies TrafficSignWithWikiEntry[]
		const result = collectTags(input)

		expect(result).toMatchObject([['maxweight', '5.5']])
	})
})
