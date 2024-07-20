<script>
	import Footer from '@/components/layout/Footer.svelte'
	import Header from '@/components/layout/Header.svelte'
	import TailwindResponsiveHelper from '@/components/layout/TailwindResponsiveHelper.svelte'
	import '@fontsource/overpass'
	import '@fontsource/overpass-mono'
	import '@fontsource/overpass/100.css'
	import '@fontsource/overpass/300.css'
	import '@fontsource/overpass/600.css'
	import '../app.css'
</script>

<Header />
<div class="mx-4 max-w-6xl self-center xl:mx-0">
	<slot />
</div>
<Footer />

<TailwindResponsiveHelper />
