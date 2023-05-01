<script lang="ts">
	import Tag from './Tag.svelte'

	export let text: string

	const regex = /\[(.*?)\]/g

	const parts = text.split(regex).map((part) => {
		if (part.match(/\b\w+=\w+\b/)) {
			return { type: 'tag', content: part }
		} else {
			return { type: 'text', content: part }
		}
	})
</script>

{#each parts as part}
	{#if part.type === 'tag'}
		{@const [key, value] = part.content.split('=')}
		<Tag {key} {value} />
	{:else}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html part.content}
	{/if}
{/each}
