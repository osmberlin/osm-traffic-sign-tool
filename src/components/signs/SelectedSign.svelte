<script lang="ts">
	import type { TrafficSign } from '@/data/types'
	import clsx from 'clsx'
	import { CheckCircle, Icon } from 'svelte-hero-icons'

	export let active: boolean
	export let toggleSelection: (signId: string) => undefined
	export let key: string
	export let values: TrafficSign
	//
</script>

<div class="w-full self-center text-center leading-tight">
	<button
		on:click={toggleSelection(values.urlString || key)}
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

		{#if values?.image?.svgPath}
			<img src={values.image.svgPath} alt={values.name} class="h-auto w-full" />
		{:else}
			<div
				class="w-20 h-20 rounded-full border border-dotted border-stone-600 flex items-center pt-1 justify-center"
			>
				<code class="tracking-tighter whitespace-nowrap">{key}</code><br />
			</div>
		{/if}

		<h3 class="font-light text-md w-full">
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
	{#if 'valuePrompt' in values}
		<div class="leading-tight">
			<label for={key} class="font-bold">{values.valuePrompt.prompt}:</label>
			<!-- TODO remove readonly; changes to input update the object and url -->
			<input
				readonly
				name={key}
				type={values.valuePrompt.format === 'opening_hours' ? 'text' : 'number'}
				step={values.valuePrompt.format === 'float' ? '0.1' : undefined}
				value={values.urlValue ?? values.valuePrompt.defaultValue}
				class="block text-center w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1
			ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
			sm:text-sm sm:leading-6"
			/>
		</div>
	{/if}
</div>
