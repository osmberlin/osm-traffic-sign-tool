<script lang="ts">
	import type { TrafficSign } from '@/data/types'
	import Sign from './Sign.svelte'

	export let defaultOpen = true
	export let attributes: string[] | null
	export let toggleSelection: (signId: string) => undefined
	export let headline: string
	export let signs: TrafficSign[]
	signs = signs
</script>

<details open={defaultOpen} class="group/details mb-8">
	<summary class="mb-0 cursor-pointer group-open/details:mb-4">
		<h3 class="inline-block text-lg font-thin uppercase text-black">
			{headline} ({signs.length})
		</h3>
	</summary>
	<div class="flex flex-wrap gap-4">
		{#each signs as sign}
			<Sign {sign} {toggleSelection} active={attributes?.includes(sign.urlKey) ?? false} />
		{/each}
	</div>
</details>
