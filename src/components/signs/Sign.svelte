<script lang="ts">
	import type { TrafficSign } from '@/data/types'
	import { IconBug, IconCircleCheck, IconCirclePlus } from '@tabler/icons-svelte'
	import { twJoin } from 'tailwind-merge'
	import { buttonStyleSecondary } from '../links/buttonStyles'

	export let active: boolean
	export let toggleSelection: (signId: string) => undefined
	export let sign: TrafficSign

	let debugOpen = false
</script>

<div class="relative w-20">
	<button
		on:click={toggleSelection(sign.urlKey)}
		class={twJoin(
			'group/item relative flex h-20 w-full items-center justify-center rounded border border-stone-200 p-2 hover:bg-stone-200',
			active ? 'bg-stone-100 shadow' : ''
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
				<IconCircleCheck class="h-6 w-6" />
			{:else}
				<IconCirclePlus class="h-6 w-6" />
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

	<dialog open={debugOpen} class="absolute z-10 max-w-md overflow-auto rounded p-5">
		<form method="dialog" class="absolute right-3 top-3">
			<button class={buttonStyleSecondary}>&times;</button>
		</form>
		<div class="bg-gray-100 py-1 text-center">
			<p><strong>{sign.urlKey}</strong></p>
			<p>{sign.descriptiveName}</p>
		</div>
		<pre class="mt-5"><code>{JSON.stringify(sign, undefined, 2)}</code></pre>
	</dialog>
	<p class="absolute -bottom-2 -right-1">
		<button
			class="rounded-full bg-stone-200 p-0.5 text-gray-400 hover:bg-violet-400 hover:text-violet-50"
			on:click={() => (debugOpen = !debugOpen)}><IconBug class="h-3 w-3" /></button
		>
	</p>
</div>
