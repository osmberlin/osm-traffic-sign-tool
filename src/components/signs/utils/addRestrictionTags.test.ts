import { describe, expect, test } from 'vitest'
import { addRestrictionTags } from './addRestrictionTags'
import type { AggregatedTags } from '../aggregateTags'
import type { TrafficSignMap } from '@/data/types'

describe('addRestrictionTags()', () => {
	test('does nothing when no conditional tags given', () => {
		const collector: AggregatedTags = []
		const input = [['DE:333', {}]] as TrafficSignMap[]
		addRestrictionTags(collector, input)

		expect(collector).toMatchObject([])
	})

	test('adds restrictionKey with default "no"', () => {
		const collector: AggregatedTags = []
		const input = [['DE:333', { restrictionKeys: ['bicycle'] }]] as TrafficSignMap[]
		addRestrictionTags(collector, input)

		expect(collector).toMatchObject([['bicycle', 'no']])
	})

	test('adds conditional restriction', () => {
		const collector: AggregatedTags = []
		const input = [
			['DE:252', { restrictionKeys: ['hgv'] }],
			['DE:1053-35', { value: 'wet', conditional: true }]
		] as TrafficSignMap[]
		addRestrictionTags(collector, input)

		expect(collector).toMatchObject([['hgv:conditional', 'no @ (wet)']])
	})

	test('adds multiple conditional restrictions', () => {
		const collector: AggregatedTags = []
		const input = [
			['DE:252', { restrictionKeys: ['hgv'] }],
			['DE:1053-35', { value: 'wet', conditional: true }],
			['DE:1042-51', { value: 'Sa,Su', conditional: true }],
			['DE:253', { restrictionKeys: ['foo'] }]
		] as TrafficSignMap[]
		addRestrictionTags(collector, input)

		expect(collector).toMatchObject([
			['hgv:conditional', 'no @ (wet AND Sa,Su)'],
			['foo:conditional', 'no @ (wet AND Sa,Su)']
		])
	})
})
