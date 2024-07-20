<script lang="ts">
	const navigation = [
		{
			name: 'Imprint & Contact & Privacy Statement (German)',
			href: 'https://parkraum.osm-verkehrswende.org/contact'
		},
		{
			name: 'Code on Github',
			href: 'https://github.com/osmberlin/osm-traffic-sign-tool'
		}
	]
</script>

<footer>
	<div class="mx-auto max-w-6xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
		<p class="mb-8 text-center text-base text-stone-400">
			This project is part of the OpenStreetMap Verkehrswende Project.{' '}
			<br />
			It is inspired by the great but unmaintaned{' '}
			<a
				class="text-base text-stone-400 underline decoration-stone-700 underline-offset-4 hover:text-stone-400"
				href="http://osmtools.de/traffic_signs/"
				target="_blank"
			>
				osmtools.de/traffic_signs
			</a>
		</p>
		<nav class="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
			{#each navigation as item}
				<div class="px-5 py-2">
					<a
						href={item.href}
						class="text-base text-stone-400 underline decoration-stone-700 underline-offset-4 hover:text-stone-400"
						target="_blank"
					>
						{item.name}
					</a>
				</div>
			{/each}

			<div class="px-5 py-2">
				<a
					href="/signs"
					class="text-base text-stone-400 underline decoration-stone-700 underline-offset-4 hover:text-stone-400"
				>
					List of all traffic signs
				</a>
			</div>
		</nav>
	</div>
</footer>
