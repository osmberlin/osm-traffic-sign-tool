<script lang="ts">
	import SignGrid from '@/components/signs/SignGrid.svelte'
	import { aggregateTags } from '@/components/signs/aggregateTags'
	import Tag from '@/components/wiki/Tag.svelte'
	import WikiLinkify from '@/components/wiki/WikiLinkify.svelte'
	import type { TrafficSignWithWikiEntry } from '@/data/trafficSigns'
	import trafficSigns from '@/data/trafficSignsWithWiki.json'
	import { queryParam } from 'sveltekit-search-params'

	const selectedSignIds = queryParam('signs', {
		// too URL
		encode: (value: string | string[]) => (typeof value === 'string' ? value : value.join('|')),
		// from URL to app
		decode: (value: string | null) => (value ? value.split('|') : null)
	})

	function toggleSelection(signId: string) {
		if ($selectedSignIds?.includes(signId)) {
			// remove
			$selectedSignIds = $selectedSignIds.filter((id) => id !== signId)
		} else {
			// add
			$selectedSignIds = [...($selectedSignIds ?? []), signId]
		}
		selectedSigns = visibleSigns()
		;[aggregatedTags, aggregatedComments] = aggregateTags(selectedSigns)
		return undefined
	}

	function visibleSigns() {
		return Object.entries(trafficSigns).filter(([key, _]) =>
			$selectedSignIds?.includes(key)
		) as TrafficSignWithWikiEntry[]
	}

	let selectedSigns = visibleSigns()
	let [aggregatedTags, aggregatedComments] = aggregateTags(selectedSigns)
	let allSigns = Object.entries(trafficSigns) as TrafficSignWithWikiEntry[]

	// Debug helper output:
	const validKeys = Object.keys(trafficSigns)
	const unrecognizedKeys = $selectedSignIds?.filter((key) => !validKeys.includes(key))
</script>

<h1>Selected Signs {selectedSigns.length}</h1>
<!-- <pre class="text-[10px]">{JSON.stringify(aggregatedTags, undefined, 2)}</pre> -->
<ul class="border border-violet-400 my-10 p-2 font-mono text-sm">
	{#each aggregatedTags as [key, value]}
		<li>
			<Tag {key} {value} />
		</li>
	{/each}
</ul>
<div>
	{#each aggregatedComments as comment}
		<p><WikiLinkify text={comment} /></p>
	{/each}
</div>
<SignGrid
	headline="Selected Signs"
	signs={selectedSigns}
	{toggleSelection}
	bind:attributes={$selectedSignIds}
/>

<hr class="my-10 h-1 bg-black" />

<SignGrid
	headline="All signs"
	signs={allSigns}
	{toggleSelection}
	bind:attributes={$selectedSignIds}
/>

<hr class="my-10 h-1 bg-black" />

{#if $selectedSignIds && unrecognizedKeys?.length}
	<h2>Unrecognized keys:</h2>
	{JSON.stringify(unrecognizedKeys, undefined, 2)}
{:else}
	(Alle Keys wurden erkannt.)
{/if}
