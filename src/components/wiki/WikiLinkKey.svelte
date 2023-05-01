<script lang="ts">
	import ExternalLink from '../links/ExternalLink.svelte'

	export let osmKey: string
	export let lang: 'DE' | 'US' = 'DE'

	const wikiLink = 'https://wiki.openstreetmap.org/wiki/'
	const splitKeys: string[] = osmKey.split(':')

	const links = splitKeys.map((keyPart) => {
		const link = `${wikiLink}${lang}:Key:${keyPart}`
		return {
			link,
			keyPart
		}
	})
</script>

{#each links as { link, keyPart }, index}
	<ExternalLink
		href={link}
		className="underline underline-offset-4 hover:decoration-1 decoration-transparent hover:decoration-stone-400"
		blank>{keyPart}</ExternalLink
	>{#if index < links.length - 1}:{/if}
{/each}
