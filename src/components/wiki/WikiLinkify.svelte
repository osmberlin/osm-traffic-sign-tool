<script lang="ts">
	import Tag from './Tag.svelte'
	import WikiLinkKey from './WikiLinkKey.svelte'

	export let text: string

	const regex = /\[(.*?)\]/g

	function addCodeTags(text: string) {
		return text.replaceAll(/`(.+?)`/g, '<code>$1</code>')
	}

	const parts = text.split(regex).map((part) => {
		const partWithCode = addCodeTags(part)

		// Case Code `foo=bar`; Code in `tagsComment` need to be treated as text
		if (partWithCode.includes('<code>')) {
			return { type: 'text', content: partWithCode }
		}
		// Case Key [Key:foo]
		if (partWithCode.startsWith('Key:')) {
			return { type: 'key', content: partWithCode.replace('Key:', '') }
		}
		// Case Tag [Tag:foo=bar]
		if (partWithCode.startsWith('Tag:')) {
			return { type: 'tag', content: partWithCode.replace('Tag:', '') }
		}
		return { type: 'text', content: partWithCode }
	})
</script>

{#each parts as part}
	{#if part.type === 'key'}
		<WikiLinkKey osmKey={part.content} />
	{/if}
	{#if part.type === 'tag'}
		{@const [key, value] = part.content.split('=')}
		<Tag {key} {value} />
	{/if}
	{#if part.type === 'text'}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html part.content}
	{/if}
{/each}
