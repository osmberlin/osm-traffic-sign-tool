<script lang="ts">
	import { linkStyle } from './linkStyles'

	export let href: string | undefined = undefined
	export let className: string | undefined = linkStyle
	export let blank: boolean = false
	const target = blank ? '_blank' : undefined
</script>

<a {href} class={className} {target} rel="noreferrer">
	<slot />
</a>
