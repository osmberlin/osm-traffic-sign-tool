<script lang="ts">
	export let href: string | undefined = undefined
	export let className: string | undefined = undefined
	export let blank: boolean = false
	const target = blank ? '_blank' : undefined
</script>

<a {href} class={className} {target} rel="noreferrer">
	<slot />
</a>
