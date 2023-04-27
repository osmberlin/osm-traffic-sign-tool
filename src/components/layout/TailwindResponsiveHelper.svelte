<script lang="ts">
	import { dev } from '$app/environment'
</script>

{#if dev}
	<a
		class="border-xl fixed bottom-1 left-1 z-10 flex h-5 flex-row items-center space-x-1 rounded bg-pink-300 px-1 text-xs shadow-xl hover:underline print:hidden"
		href="https://tailwindcss.com/docs/responsive-design"
	>
		<span class="font-bold underline" title="<640px Mobile"> 📱 </span>
		<span class="sm:font-bold sm:underline" title="640px"> sm </span>
		<span class="md:font-bold md:underline" title="768px"> md </span>
		<span class="lg:font-bold lg:underline" title="1024px"> lg </span>
		<span class="xl:font-bold xl:underline" title="1280px"> xl </span>
		<span class="2xl:font-bold 2xl:underline" title="1536px"> 2xl </span>
	</a>
{/if}
