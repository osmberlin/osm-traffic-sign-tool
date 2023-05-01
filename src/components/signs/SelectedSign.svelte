<script lang="ts">
	import type { TrafficSignWithWiki } from '@/data/trafficSigns'
	import clsx from 'clsx'
	import { CheckCircle, Icon } from 'svelte-hero-icons'

	export let active: boolean
	export let toggleSelection: (signId: string) => undefined
	export let key: string
	export let values: TrafficSignWithWiki
	//
</script>

<div class="w-full self-center">
	<button
		on:click={toggleSelection(key)}
		class={clsx(
			'relative border w-full h-auto rounded border-transparent hover:border-stone-200 hover:bg-stone-200 flex gap-2 p-2 justify-center items-center group/item flex-col leading-tight'
		)}
	>
		<span
			class="absolute -top-1 -right-1 rounded-full text-stone-300/0 group-hover/item:text-stone-700"
		>
			{#if active}
				<Icon src={CheckCircle} class="w-6 h-6" />
			{/if}
		</span>

		<!-- {#if values?.image?.svg}
      <img src={values.image.svg} alt={values.name} class="h-10 w-10" />
    {/if} -->
		{#if values?.localFile}
			<img src={values?.localFile} alt={values.name} class="h-auto w-full" />
		{:else}
			<div
				class="w-20 h-20 rounded-full border border-dotted border-stone-600 flex items-center pt-1 justify-center"
			>
				<code class="tracking-tighter whitespace-nowrap">{key}</code><br />
			</div>
		{/if}

		<h3 class="font-light text-md text-center w-full">
			{values.name}
		</h3>
		<p>
			<strong
				>{#if values.descriptiveName}
					{values.descriptiveName}
				{:else}
					–
				{/if}</strong
			>
		</p>
	</button>
</div>
