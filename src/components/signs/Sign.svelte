<script lang="ts">
	import type { TrafficSignWithWiki } from '@/data/trafficSigns'
	import clsx from 'clsx'
	import { Icon, PlusCircle, CheckCircle } from 'svelte-hero-icons'

	export let active: boolean
	export let toggleSelection: (signId: string) => undefined
	export let key: string
	export let values: TrafficSignWithWiki
	//
</script>

<div class="w-20">
	<button
		on:click={toggleSelection(values.urlString || key)}
		class={clsx(
			'relative border w-full h-20 rounded border-stone-200 hover:bg-stone-200 flex p-4 justify-center items-center group/item',
			active ? 'shadow-inner bg-stone-200/50' : ''
		)}
	>
		<h3 class="sr-only">
			{key}
			{values.name} – {values.descriptiveName}
		</h3>
		<span
			class={clsx(
				'absolute -top-1 -right-1 rounded-full',
				active
					? 'group-hover/item:text-stone-700'
					: 'text-white/0 group-hover/item:text-stone-900 transition-colors'
			)}
		>
			{#if active}
				<Icon src={CheckCircle} class="w-6 h-6" />
			{:else}
				<Icon src={PlusCircle} class="w-6 h-6" />
			{/if}
		</span>

		<!-- {#if values?.image?.svg}
      <img src={values.image.svg} alt={values.name} class="h-10 w-10" />
    {/if} -->
		{#if values?.localFile}
			<img src={values?.localFile} alt={values.name} class="h-auto w-full" />
		{:else}
			<div>
				<code class="tracking-tighter whitespace-nowrap">{key}</code><br />
				<p class="text-[0.6rem] leading-tight">
					{#if values.descriptiveName}
						{values.descriptiveName}
					{:else}
						–
					{/if}
				</p>
			</div>
		{/if}
	</button>
	<details class="p-0.5 text-xs text-gray-400">
		<summary>Debug</summary>
		<pre class="">{JSON.stringify(values, undefined, 2)}</pre>
	</details>
</div>
