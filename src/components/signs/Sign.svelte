<script lang="ts">
	import type { TrafficSign } from '@/data/types'
	import { twJoin } from 'tailwind-merge'
	import { Icon, PlusCircle, CheckCircle } from 'svelte-hero-icons'

	export let active: boolean
	export let toggleSelection: (signId: string) => undefined
	export let sign: TrafficSign
</script>

<div class="w-20">
	<button
		on:click={toggleSelection(sign.urlKey)}
		class={twJoin(
			'group/item relative flex h-20 w-full items-center justify-center rounded border border-stone-200 p-2 hover:bg-stone-200',
			active ? 'bg-stone-200/50 shadow-inner' : ''
		)}
	>
		<h3 class="sr-only">
			{sign.urlKey}
			{sign.name} – {sign.descriptiveName}
		</h3>
		<span
			class={twJoin(
				'absolute -right-1 -top-1 rounded-full',
				active
					? 'group-hover/item:text-stone-700'
					: 'text-white/0 transition-colors group-hover/item:text-stone-900'
			)}
		>
			{#if active}
				<Icon src={CheckCircle} class="h-6 w-6" />
			{:else}
				<Icon src={PlusCircle} class="h-6 w-6" />
			{/if}
		</span>

		{#if sign?.image?.svgPath}
			<img src={sign.image.svgPath} alt={sign.name} class="h-auto w-full" />
		{:else}
			<div>
				<code class="whitespace-nowrap tracking-tighter">{sign.signKey.replaceAll('DE:', '')}</code
				><br />
				<p class="text-[0.6rem] leading-tight">
					{#if sign.descriptiveName}
						{sign.descriptiveName}
					{:else}
						–
					{/if}
				</p>
			</div>
		{/if}
	</button>
	<details class="p-0.5 text-xs text-gray-400">
		<summary>Debug</summary>
		<pre class="">{JSON.stringify(sign, undefined, 2)}</pre>
	</details>
</div>
