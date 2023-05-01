<script lang="ts">
	import ExternalLink from '../links/ExternalLink.svelte'

	export let osmKey: string
	export let osmValue: string | string[]
	export let lang: 'DE' | 'US' = 'DE'

	const wikiLink = 'https://wiki.openstreetmap.org/wiki/'

	function prepareLinks(values: string[]) {
		return values.map((valuePart) => {
			const link = `${wikiLink}${lang}:Tag:${osmKey}=${valuePart}`
			return {
				link,
				valuePart
			}
		})
	}

	const orLinks = typeof osmValue === 'object' ? prepareLinks(osmValue) : []
	const semiLinks = typeof osmValue === 'string' ? prepareLinks(osmValue.split(';')) : []
</script>

{#each orLinks as { link, valuePart }, index}
	<ExternalLink
		href={link}
		className="underline underline-offset-4 hover:decoration-1 decoration-transparent hover:decoration-stone-400"
		blank>{valuePart}</ExternalLink
	>{#if index < orLinks.length - 1}{' '}<em>or</em> {/if}
{/each}{#each semiLinks as { link, valuePart }, index}
	<ExternalLink
		href={link}
		className="underline underline-offset-4 hover:decoration-1 decoration-transparent hover:decoration-stone-400"
		blank>{valuePart}</ExternalLink
	>{#if index < semiLinks.length - 1};{/if}
{/each}
