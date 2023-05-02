import { describe, expect, test } from 'vitest'
import { addRestrictionTags } from './addRestrictionTags'
import type { AggregatedTags } from '../aggregateTags'
import type { TrafficSignWithWikiEntry } from '@/data/trafficSigns'

describe('addRestrictionTags()', () => {
	test('does nothing when no conditional tags given', () => {
		const collector: AggregatedTags = []
		const input = [['DE:333', {}]] as TrafficSignWithWikiEntry[]
		addRestrictionTags(collector, input)

		expect(collector).toMatchObject([])
	})

	test('adds restrictionKey with default "no"', () => {
		const collector: AggregatedTags = []
		const input = [['DE:333', { restrictionKeys: ['bicycle'] }]] as TrafficSignWithWikiEntry[]
		addRestrictionTags(collector, input)

		expect(collector).toMatchObject([['bicycle', 'no']])
	})

	// test('adds conditional restriction', () => {
	// 	const collector: AggregatedTags = []
	// 	const input = [
	// 		['DE:252', { restrictionKeys: ['hgv'] }],
	// 		['DE:1053-35', { value: 'wet', conditional: true }]
	// 	] as TrafficSignWithWikiEntry[]
	// 	addRestrictionTags(collector, input)

	// 	expect(collector).toMatchObject([['hgv:conditional', 'no @ (wet)']])
	// })

	// test('adds multiple conditional restrictions', () => {
	// 	const collector: AggregatedTags = []
	// 	const input = [
	// 		['DE:252', { restrictionKeys: ['hgv'] }],
	// 		['DE:1053-35', { value: 'wet', conditional: true }],
	// 		['DE:1042-51', { value: 'Sa,Su', conditional: true }]
	// 	] as TrafficSignWithWikiEntry[]
	// 	addRestrictionTags(collector, input)

	// 	expect(collector).toMatchObject([['hgv:conditional', 'no @ (wet AND Sa,Su)']])
	// })
})
