<script>
	import Header from '@/components/layout/Header.svelte'
	import Footer from '@/components/layout/Footer.svelte'
	import '../app.css'
	import '@fontsource/overpass/100.css'
	import '@fontsource/overpass/300.css'
	import '@fontsource/overpass' // 400
	import '@fontsource/overpass/600.css'
	import '@fontsource/overpass-mono'
	import TailwindResponsiveHelper from '@/components/layout/TailwindResponsiveHelper.svelte'
</script>

<Header />
<div class="max-w-6xl xl:mx-0 mx-4 self-center">
	<slot />
</div>
<Footer />
<TailwindResponsiveHelper />
