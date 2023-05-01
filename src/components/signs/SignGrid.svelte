<script lang="ts">
	import type { TrafficSignWithWikiEntry } from '@/data/trafficSigns'
	import Sign from './Sign.svelte'

	export let defaultOpen = true
	export let attributes: string[] | null
	export let toggleSelection: (signId: string) => undefined
	export let headline: string
	export let signs: TrafficSignWithWikiEntry[]
	// eslint-disable-next-line no-self-assign
	signs = signs
	//
</script>

<details open={defaultOpen} class="mb-8 group/details">
	<summary class="mb-0 group-open/details:mb-4 cursor-pointer">
		<h3 class="inline-block text-black uppercase font-thin text-lg">
			{headline} ({signs.length})
		</h3>
	</summary>
	<div class="flex flex-wrap gap-4">
		{#each signs as [key, values]}
			<Sign {key} {values} {toggleSelection} active={attributes?.includes(key) ?? false} />
		{/each}
	</div>
</details>
