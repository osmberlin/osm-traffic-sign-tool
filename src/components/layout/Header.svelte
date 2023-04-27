<script lang="ts">
	import { version } from '$app/environment'
	import { page } from '$app/stores'
	import clsx from 'clsx'

	const isHome = $page.url.pathname === '/'
</script>

<section>
	<div class="mx-auto max-w-6xl overflow-hidden px-4 pt-10 pb-6 sm:px-6 lg:px-8">
		<div class="-mx-5 -my-2 flex flex-col flex-wrap">
			<a
				class={clsx('mb-3 self-center decoration-violet-700 underline-offset-4 hover:underline', {
					'hover:no-underline cursor-auto': isHome
				})}
				href="/"
			>
				<h1 class="text-3xl font-thin text-stone-400">
					OSM Traffic Sign Tool 2.0{' '}
					<span class="rounded bg-stone-300 px-2 pt-1 text-2xl uppercase text-stone-800">Alpha</span
					>
					<small class="text-xs">{version}</small>
				</h1>
			</a>
			<details open class="text-stone-300 my-5 max-w-prose self-center leading-tight">
				<summary class="cursor-pointer text-center hover:underline underline-offset-2">
					About this tool…
				</summary>
				<p>
					This tool helps to find the right <code>traffic_sign=*</code> tag as well as recommended
					tags for the road that it applies to.
					<strong>Please review all tags before updating OSM.</strong>
				</p>
			</details>
		</div>
	</div>
</section>
