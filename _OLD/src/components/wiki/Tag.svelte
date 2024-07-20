<script lang="ts">
	import WikiLinkKey from './WikiLinkKey.svelte'
	import WikiLinkValue from './WikiLinkValue.svelte'

	export let key: string
	export let value: string | string[]
</script>

<code
	><WikiLinkKey osmKey={key} /><span class="mx-0.5 text-gray-500">=</span><WikiLinkValue
		osmKey={key}
		osmValue={value}
	/></code
>
