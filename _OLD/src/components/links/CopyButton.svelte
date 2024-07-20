<script lang="ts">
	import { buttonStyle, buttonStyleSecondary } from './buttonStyles'

	// Inpspired by https://usehooks-ts.com/react-hook/use-copy-to-clipboard

	type CopyFn = (text: string) => Promise<boolean> // Return success

	const copy: CopyFn = async (text) => {
		if (!navigator?.clipboard) {
			console.warn('Clipboard not supported')
			return false
		}

		// Try to save to clipboard then save it in the state if worked
		try {
			await navigator.clipboard.writeText(text)
			copiedText = text
			return true
		} catch (error) {
			console.warn('Copy failed', error)
			copiedText = null
			return false
		}
	}

	export let text: string
	let copiedText: string | null = null
	export let secondary = false
</script>

<div class="inline-flex gap-3">
	<button
		on:click={() => copy(text)}
		class={secondary ? buttonStyleSecondary : buttonStyle}
		disabled={!text}
	>
		{#if copiedText}
			<span>copied</span>
		{:else}
			<slot />
		{/if}
	</button>
</div>
