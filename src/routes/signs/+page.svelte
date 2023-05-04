<script lang="ts">
	import ExternalLink from '@/components/links/ExternalLink.svelte'
	import { buttonStyle } from '@/components/links/buttonStyles'
	import { aggregateTags } from '@/components/signs/aggregateTags'
	import { signsFromUrl } from '@/components/signs/utils/signsFromUrl'
	import Tag from '@/components/wiki/Tag.svelte'
	import WikiLinkify from '@/components/wiki/WikiLinkify.svelte'
	import clsx from 'clsx'
	import { queryParam } from 'sveltekit-search-params'
	import trafficSignsWiki from '@/data/wiki/parseWiki/trafficSignsWiki.json'

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
		return undefined
	}

	let selectedSigns = signsFromUrl($selectedSignIds)
	let [aggregatedTags, aggregatedComments] = aggregateTags(selectedSigns)
</script>

<main class="rounded bg-stone-300 px-6 py-4">
	<h2 class="text-black uppercase font-light text-3xl my-4 flex items-center gap-3">
		{#if !$selectedSignIds}
			All signs {selectedSigns.length}
		{:else}
			Signs: {$selectedSignIds.join(', ')}
			<button on:click={() => ($selectedSignIds = null)} class={buttonStyle}>Show all signs</button>
		{/if}
	</h2>

	<p>
		This page is to understand, debug and improve the trafficSigns object that is the source of data
		for this app. <ExternalLink
			href="https://github.com/osmberlin/osm-traffic-sign-tool/issues/2"
			blank>Learn more…</ExternalLink
		>
	</p>

	{#if $selectedSignIds}
		<h3 class="text-stone-800 mt-10 mb-2 text-lg">
			This combination of signs will return the following combined tags
		</h3>

		<ul>
			{#each aggregatedTags as [key, value]}
				<li>
					<Tag {key} {value} />
				</li>
			{/each}
		</ul>

		<h3 class="text-stone-800 mt-10 mb-2 text-lg">
			This combination of signs will return the following comments
		</h3>
		{#each aggregatedComments as comment}
			<p><WikiLinkify text={comment} /></p>
		{/each}
	{/if}

	<table class="mt-10 min-w-full">
		<thead class="border-b-2 border-violet-300">
			<tr>
				<th
					scope="col"
					class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-stone-900 sm:pl-6 md:pl-0"
				>
					Sign key
				</th>
				<th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-stone-900">
					Sign object
				</th>
				<th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-stone-900">
					Sign object <code>wikiData</code>
				</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-violet-200">
			{#each selectedSigns as [key, values]}
				<tr class={clsx(values?.image?.svgPath ? '' : 'bg-amber-300')}>
					<th class="py-4 pl-4 pr-3 text-sm text-stone-900 sm:pl-6 md:pl-0 text-center space-y-3">
						<code>{key}</code>
						<br />

						{#if values?.image?.svgPath}
							<img src={values.image.svgPath} alt={values.name} class="h-auto w-10 inline-block" />
						{:else}
							<span class="text-amber-700 inline-block">Missing</span>
						{/if}
						<br />

						<button
							on:click={() => toggleSelection(key)}
							class={clsx(buttonStyle, 'w-8 h-8 inline-flex items-center justify-center pb-0.5')}
						>
							{#if $selectedSignIds?.includes(key)}
								&times;
							{:else}
								+
							{/if}
						</button>
					</th>
					<td class="py-4 px-3 text-xs text-stone-500">
						<pre class="w-96 overflow-scroll">{JSON.stringify(
								values,
								(key, value) => {
									if (key === 'wikiData') return undefined // Remove the key from the output
									return value
								},
								2
							)}</pre>
					</td>
					<td class="py-4 px-3 text-xs text-stone-500">
						<pre class="w-96 overflow-scroll">{JSON.stringify(
								trafficSignsWiki.find((sign) => sign.sign === key),
								undefined,
								2
							)}</pre>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
