<script lang="ts">
	import type { TrafficSign } from '@/data/types'
	import { IconCircleCheck } from '@tabler/icons-svelte'
	import { buildUrlKey } from './utils/urlKey/buildUrlKey'
	import { splitUrlKey } from './utils/urlKey/splitUrlKey'

	export let toggleUrlSignKey: (urlKey: string) => undefined
	export let updateUrlSignKey: (urlKey: string) => undefined
	export let sign: TrafficSign

	const inputFormats = {
		integer: { type: 'number', steps: undefined },
		float: { type: 'number', steps: '0.1' },
		opening_hours: { type: 'text', steps: undefined },
		time_restriction: { type: 'text', steps: undefined }
	}

	// We update the URL store which in turn updates the signStore in our page component
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function updateValue(key: string, event: any) {
		const { signKey } = splitUrlKey(key)
		signKey && updateUrlSignKey(buildUrlKey(signKey, event.target.value))
	}
</script>

<div class="w-full self-center text-center leading-tight">
	<button
		on:click={toggleUrlSignKey(sign.urlKey)}
		class="group/item relative flex h-auto w-full flex-col items-center justify-center gap-2 rounded border border-transparent p-2 leading-tight hover:border-stone-200 hover:bg-stone-200"
	>
		<div
			class="absolute -right-1 -top-1 rounded-full text-stone-300/0 group-hover/item:text-stone-700"
		>
			<IconCircleCheck class="h-6 w-6" />
		</div>

		<div class="relative">
			{#if sign?.image?.svgPath}
				<img src={sign.image.svgPath} alt={sign.name} class="h-auto w-full" />
				{#if 'valuePrompt' in sign && sign.signValue !== sign.valuePrompt.defaultValue}
					<div class="absolute inset-0 flex items-center justify-center">
						<div class="-rotate-12 bg-white/80 px-3 pt-1 uppercase text-stone-600">Example</div>
					</div>
				{/if}
			{:else}
				<div
					class="flex h-20 w-20 items-center justify-center rounded border border-stone-800 bg-stone-600 pt-1 text-stone-50"
				>
					<code class="whitespace-nowrap tracking-tighter"
						>{sign.signKey.replaceAll('DE:', '')}</code
					><br />
				</div>
			{/if}
		</div>

		<h3 class="text-md w-full font-light">
			{sign.name}
		</h3>
		<p>
			<strong
				>{#if sign.descriptiveName}
					{sign.descriptiveName}
				{:else}
					–
				{/if}</strong
			>
		</p>
	</button>
	{#if 'valuePrompt' in sign}
		<div class="leading-tight">
			<label for={sign.urlKey} class="font-bold">{sign.valuePrompt.prompt}:</label>
			<input
				on:input={(event) => updateValue(sign.urlKey, event)}
				name={sign.urlKey}
				type={inputFormats[sign.valuePrompt.format]['type'] ?? 'text'}
				step={inputFormats[sign.valuePrompt.format]['steps'] ?? undefined}
				value={sign.signValue ?? sign.valuePrompt.defaultValue}
				class="block w-full rounded-md border-0 px-1 py-1.5 text-center text-gray-900 shadow-sm ring-1
			ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
			sm:text-sm sm:leading-6"
			/>
		</div>
	{/if}
</div>
