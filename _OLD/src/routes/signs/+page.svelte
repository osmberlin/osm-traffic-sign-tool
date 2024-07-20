<script lang="ts">
	import ExternalLink from '@/components/links/ExternalLink.svelte'
	import trafficSignsWiki from '@/data/wiki/parseWiki/trafficSignsWiki.json'
	import { signStore } from '@/stores/signStore'
	import { twJoin } from 'tailwind-merge'
</script>

<main class="rounded bg-stone-300 px-6 py-4">
	<h2 class="my-4 flex items-center gap-3 text-3xl font-light uppercase text-black">
		All signs {$signStore.length}
	</h2>

	<p>
		This page is to understand, debug and improve the trafficSigns object that is the source of data
		for this app. <ExternalLink
			href="https://github.com/osmberlin/osm-traffic-sign-tool/issues/2"
			blank>Learn more…</ExternalLink
		>
	</p>

	<table class="mt-10 min-w-full">
		<thead class="border-b-2 border-violet-300">
			<tr>
				<th
					scope="col"
					class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-stone-900 sm:pl-6 md:pl-0"
				>
					Sign key
				</th>
				<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">
					Sign data from this app
				</th>
				<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">
					Sign data parsed from the wiki
				</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-violet-200">
			{#each $signStore as sign}
				<tr class={twJoin(sign?.image?.svgPath ? '' : 'bg-amber-300')}>
					<th class="space-y-3 py-4 pl-4 pr-3 text-center text-sm text-stone-900 sm:pl-6 md:pl-0">
						<code>{sign.urlKey}</code>
						<br />

						{#if sign?.image?.svgPath}
							<img src={sign.image.svgPath} alt={sign.name} class="inline-block h-auto w-10" />
						{:else}
							<span class="inline-block text-amber-700">Missing</span>
						{/if}
					</th>
					<td class="px-3 py-4 text-xs text-stone-500">
						<pre class="w-96 overflow-scroll">{JSON.stringify(
								sign,
								(key, value) => {
									if (key === 'wikiData') return undefined // Remove the key from the output
									return value
								},
								2
							)}</pre>
					</td>
					<td class="px-3 py-4 text-xs text-stone-500">
						<pre class="w-96 overflow-scroll">{JSON.stringify(
								trafficSignsWiki.find((wikiSign) => wikiSign.sign === sign.urlKey),
								undefined,
								2
							)}</pre>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
