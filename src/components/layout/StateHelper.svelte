<script lang="ts">
	import { dev } from '$app/environment'

	export let state: any
</script>

{#if dev}
	<details
		class="border-xl fixed bottom-1 right-1 top-auto z-10 max-h-screen max-w-lg rounded bg-pink-300 px-1 py-2 text-xs shadow-xl open:top-1 open:overflow-scroll print:hidden"
	>
		<summary class="cursor-pointer hover:underline">State</summary>
		<pre><code>{JSON.stringify(state, undefined, 2)}</code></pre>
	</details>
{/if}
