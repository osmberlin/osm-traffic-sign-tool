<script lang="ts">
	import CopyButton from '@/components/links/CopyButton.svelte'
	import SelectedSign from '@/components/signs/SelectedSign.svelte'
	import SignGrid from '@/components/signs/SignGrid.svelte'
	import { aggregateTags, type AggregatedTags } from '@/components/signs/aggregateTags'
	import { signsFromUrl } from '@/components/signs/utils/signsFromUrl'
	import Tag from '@/components/wiki/Tag.svelte'
	import WikiLinkify from '@/components/wiki/WikiLinkify.svelte'
	import type { TrafficSignsWithWiki } from '@/data/trafficSigns'
	import trafficSignsJson from '@/data/trafficSignsWithWiki.json'
	import { DocumentDuplicate, Icon } from 'svelte-hero-icons'
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
		selectedSigns = signsFromUrl($selectedSignIds)
		;[aggregatedTags, aggregatedComments] = aggregateTags(selectedSigns)
		;[copyTrafficSignTag, copyAllTags] = copyTagsValues(aggregatedTags)
		trafficSignTag = copyTrafficSignTag?.split('=')

		return undefined
	}

	function copyTagsValues(aggregatedTags: AggregatedTags) {
		copyTrafficSignTag = aggregatedTags.find(([key, _]) => key === 'traffic_sign')?.join('=')
		copyAllTags = aggregatedTags.map(([key, value]) => `${key}=${value}`).join('\n')
		return [copyTrafficSignTag, copyAllTags]
	}

	let selectedSigns = signsFromUrl($selectedSignIds)
	let [aggregatedTags, aggregatedComments] = aggregateTags(selectedSigns)

	// TODO: Clean this up once we have a merged and clean trafficSign object
	const trafficSigns = trafficSignsJson as unknown as TrafficSignsWithWiki
	const signsMostUsed = Object.entries(trafficSigns).filter(
		([_, values]) => values.mostUsed === true
	)
	const signsCatSigns = Object.entries(trafficSigns).filter(
		([_, values]) => values.category === 'traffic_sign' && !values.mostUsed
	)
	const signsCatModifiers = Object.entries(trafficSigns).filter(
		([_, values]) => values.category === 'modifier_sign'
	)
	const signsCatModifierRestrictions = Object.entries(trafficSigns).filter(
		([_, values]) => values.category === 'modifier_sign_restriction'
	)

	// Copy
	let copyTrafficSignTag: string | undefined = undefined
	let copyAllTags: string | undefined = undefined
	;[copyTrafficSignTag, copyAllTags] = copyTagsValues(aggregatedTags)
	let trafficSignTag: string[] | undefined = copyTrafficSignTag?.split('=')

	// Debug helper output:
	const validKeys = Object.values(trafficSigns).map((value) => value.urlString)
	const unrecognizedKeys = $selectedSignIds?.filter((key) => !validKeys.includes(key))
</script>

{#if $selectedSignIds && unrecognizedKeys?.length}
	<section class="text-white bg-amber-700 rounded mb-4 p-4">
		<h2 class="uppercase font-thin text-lg">Unrecognized keys ({unrecognizedKeys.length})</h2>
		<p>{unrecognizedKeys.join(', ')}</p>
	</section>
{/if}

<main class="flex gap-4">
	<section class="rounded bg-stone-300 px-6 py-4">
		<h2 class="text-black uppercase font-light text-lg mb-4">Choose Signs</h2>

		<SignGrid
			headline="Häufig verwendet"
			signs={signsMostUsed}
			{toggleSelection}
			bind:attributes={$selectedSignIds}
		/>

		<SignGrid
			headline="Kategorie Verkehrszeichen"
			signs={signsCatSigns}
			{toggleSelection}
			bind:attributes={$selectedSignIds}
		/>

		<SignGrid
			headline="Zusatzzeichen"
			signs={signsCatModifiers}
			{toggleSelection}
			bind:attributes={$selectedSignIds}
		/>

		<SignGrid
			headline="Zusatzzeichen Einschränkungen"
			signs={signsCatModifierRestrictions}
			{toggleSelection}
			bind:attributes={$selectedSignIds}
		/>
	</section>

	<section class="rounded bg-stone-300 px-4 py-4 flex-none w-48">
		<h2 class="uppercase font-light text-lg mb-4 text-center">Selected Signs</h2>

		<div class="flex flex-col -mt-1">
			{#each selectedSigns as [key, values]}
				<SelectedSign {key} {values} {toggleSelection} active={true} />
			{/each}
		</div>
	</section>

	<section class="rounded bg-stone-900 text-stone-100 px-6 py-4 flex-none w-96">
		{#if !$selectedSignIds}
			<h2 class="uppercase font-light text-lg mb-4">Recommended Tags</h2>
			<p class="font-light text-stone-400">Select a traffic sign to display recommended tags …</p>
		{:else}
			<h2 class="uppercase font-light text-lg mb-4">Traffic sign tag</h2>
			{#if trafficSignTag && copyTrafficSignTag}
				{#key trafficSignTag}
					<div class="flex justify-between items-center">
						<Tag key={trafficSignTag[0]} value={trafficSignTag[1]} />
						<CopyButton text={copyTrafficSignTag}>
							<Icon src={DocumentDuplicate} class="w-4 h-4" />
						</CopyButton>
					</div>
				{/key}
			{/if}

			<h2 class="uppercase font-light text-lg mt-10 mb-4">Derived recommended Tags</h2>

			{#if aggregatedTags && copyAllTags}
				<div class="flex justify-between items-end">
					<ul>
						{#key aggregatedTags}
							{#each aggregatedTags as [key, value]}
								<li>
									<Tag {key} {value} />
								</li>
							{/each}
						{/key}
					</ul>

					<div>
						<CopyButton text={copyAllTags}>
							<Icon src={DocumentDuplicate} class="w-4 h-4" />
						</CopyButton>
					</div>
				</div>
			{/if}

			<div class="mt-10">
				<h3 class="text-stone-50 uppercase font-thin text-lg">Notes</h3>
				{#each aggregatedComments as comment}
					<p><WikiLinkify text={comment} /></p>
				{/each}
			</div>
		{/if}
	</section>
</main>
