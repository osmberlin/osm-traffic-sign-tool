<script lang="ts">
	import StateHelper from '@/components/layout/StateHelper.svelte'
	import CopyButton from '@/components/links/CopyButton.svelte'
	import SelectedSign from '@/components/signs/SelectedSign.svelte'
	import SignGrid from '@/components/signs/SignGrid.svelte'
	import {
		aggregateComments,
		type AggregatedComments
	} from '@/components/signs/utils/aggregateComments'
	import { aggregateTags, type AggregatedTags } from '@/components/signs/utils/aggregateTags'
	import { buildUrlKey } from '@/components/signs/utils/urlKey/buildUrlKey'
	import { splitUrlKey } from '@/components/signs/utils/urlKey/splitUrlKey'
	import Tag from '@/components/wiki/Tag.svelte'
	import WikiLinkify from '@/components/wiki/WikiLinkify.svelte'
	import { alternativeKeyFormats } from '@/data/alternativeKeyFormats'
	import type { TrafficSign } from '@/data/types'
	import { signStore } from '@/stores/signStore'
	import { IconCopy } from '@tabler/icons-svelte'
	import { onMount } from 'svelte'
	import { queryParam } from 'sveltekit-search-params'

	const urlSignKeys = queryParam('signs', {
		// too URL
		encode: (value: string | string[]) => (typeof value === 'string' ? value : value.join('|')),
		// from URL to app
		decode: (value: string | null) => (value ? value.split('|') : null)
	})

	const urlSearch = queryParam('q')
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function updateSearch(event: any) {
		$urlSearch = event?.target?.value
	}

	async function transformAlternativeKeyFormatInUrl() {
		$urlSignKeys?.forEach((urlSignKey, index) => {
			const transformationKey = alternativeKeyFormats.get(urlSignKey)
			if (transformationKey && $urlSignKeys) {
				$urlSignKeys[index] = transformationKey
			}
		})
	}

	function updateSignStoreByUrlSignKey() {
		signStore.update((signs) => {
			$urlSignKeys?.forEach((urlSignKey) => {
				const { signKey, signValue } = splitUrlKey(urlSignKey)
				const sign = signs.find((s) => s.signKey === signKey)
				if (!sign) return signs

				sign.urlKey = urlSignKey
				sign.signValue = signValue
			})
			return signs
		})
	}

	// Sign store: Update on first render
	onMount(async () => {
		await transformAlternativeKeyFormatInUrl()
		updateSignStoreByUrlSignKey()
	})

	// Rendering signs
	let searchSigns: TrafficSign[] = []
	let selectedSigns: TrafficSign[] = []
	let aggregatedTags: AggregatedTags = []
	let aggregatedComments: AggregatedComments = []
	// Copy signs
	let copyTrafficSignTag: string | undefined = undefined
	let copyAllTags: string | undefined = undefined
	let trafficSignTag: string[] | undefined = undefined
	// Debug helper:
	let validKeys: string[] | undefined = undefined
	let unrecognizedKeys: string[] | undefined = undefined

	urlSignKeys.subscribe(() => {
		// Sign store: Update whenever URL changes
		updateSignStoreByUrlSignKey()

		// Rendering signs: Update
		searchSigns = $signStore.filter((sign) => {
			const lookup = $urlSearch?.toLocaleLowerCase() ?? ''
			return (
				sign.signKey.toLocaleLowerCase().includes(lookup) ||
				sign.descriptiveName?.toLocaleLowerCase()?.includes(lookup) ||
				sign.description?.toLocaleLowerCase()?.includes(lookup)
			)
		})
		selectedSigns = $signStore.filter((sign) => $urlSignKeys?.includes(sign.urlKey))
		aggregatedTags = aggregateTags(selectedSigns)
		aggregatedComments = aggregateComments(selectedSigns)
		// Copy signs: Update
		copyTrafficSignTag = aggregatedTags.find(([key]) => key === 'traffic_sign')?.join('=')
		copyAllTags = aggregatedTags.map(([key, value]) => `${key}=${value}`).join('\n')
		trafficSignTag = copyTrafficSignTag?.split('=')
		// Debug helper: Update
		validKeys = $signStore.map((value) => value.urlKey)
		unrecognizedKeys = $urlSignKeys?.filter((key) => !validKeys?.includes(key))
	})

	function updateUrlSignKey(urlKey: string) {
		const { signKey: updateSignKey, signValue: updateSignValue } = splitUrlKey(urlKey)

		urlSignKeys.update((signKeys) => {
			// The store is something like ['DE:262[5.5]', 'DE:1020-30']
			// We find the signKey index and update the value (using the fresh signValue)
			signKeys?.forEach((urlKey, index) => {
				const { signKey: currentSignKey } = splitUrlKey(urlKey)
				if (currentSignKey && currentSignKey === updateSignKey) {
					signKeys[index] = buildUrlKey(currentSignKey, updateSignValue)
				}
			})
			return signKeys
		})

		return undefined
	}

	function toggleUrlSignKey(urlKey: string) {
		if ($urlSignKeys?.includes(urlKey)) {
			// remove
			$urlSignKeys = $urlSignKeys.filter((id) => id !== urlKey)
		} else {
			// add
			$urlSignKeys = [...($urlSignKeys ?? []), urlKey]
		}
		return undefined
	}

	const signsMostUsed = $signStore.filter((sign) => sign.mostUsed === true)
	const signsCatSigns = $signStore.filter(
		(sign) => sign.category === 'traffic_sign' && !sign.mostUsed
	)
	const signsCatModifiers = $signStore.filter((sign) => sign.category === 'modifier_sign')
	const signsCatModifierRestrictions = $signStore.filter(
		(sign) => sign.category === 'modifier_sign_restriction'
	)
</script>

{#if $urlSignKeys && unrecognizedKeys?.length}
	<section class="mb-4 rounded bg-amber-700 p-4 text-white">
		<h2 class="text-lg font-thin uppercase">Unrecognized keys ({unrecognizedKeys.length})</h2>
		<p>{unrecognizedKeys.join(', ')}</p>
	</section>
{/if}

<main class="flex gap-4">
	<section class="rounded bg-stone-300 px-6 py-4">
		<div class="flex items-start justify-between">
			<h2 class="mb-4 text-lg font-light uppercase text-black">Choose Signs</h2>
			<div class="relative -mt-1.5">
				<!-- svelte-ignore a11y-autofocus -->
				<input
					on:input={updateSearch}
					name="search"
					type="text"
					autofocus={true}
					class="block rounded-md border-0 px-2 py-1.5 text-left text-gray-900 shadow-sm ring-1
                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                sm:text-sm"
					placeholder="Search…"
				/>
				{#if $urlSearch && searchSigns.length === 0}<div
						class="absolute -bottom-4 right-0.5 text-xs text-indigo-700"
					>
						No results
					</div>{/if}
			</div>
		</div>

		{#if $urlSearch && searchSigns.length}
			<SignGrid
				headline="Suchergebnisse"
				signs={searchSigns}
				toggleSelection={toggleUrlSignKey}
				bind:attributes={$urlSignKeys}
			/>
		{/if}

		<SignGrid
			headline="Häufig verwendet"
			signs={signsMostUsed}
			toggleSelection={toggleUrlSignKey}
			bind:attributes={$urlSignKeys}
		/>

		<SignGrid
			headline="Kategorie Verkehrszeichen"
			signs={signsCatSigns}
			toggleSelection={toggleUrlSignKey}
			bind:attributes={$urlSignKeys}
		/>

		<SignGrid
			headline="Zusatzzeichen"
			signs={signsCatModifiers}
			toggleSelection={toggleUrlSignKey}
			bind:attributes={$urlSignKeys}
		/>

		<SignGrid
			headline="Zusatzzeichen Einschränkungen"
			signs={signsCatModifierRestrictions}
			toggleSelection={toggleUrlSignKey}
			bind:attributes={$urlSignKeys}
		/>
	</section>

	<section class="w-56 flex-none rounded bg-stone-300 py-4">
		<h2 class="mb-4 text-center text-lg font-light uppercase">Selected Signs</h2>

		<div class="-mt-2 space-y-6">
			{#each selectedSigns as sign}
				<SelectedSign {sign} {toggleUrlSignKey} {updateUrlSignKey} />
			{/each}
		</div>
	</section>

	<section class="w-96 flex-none rounded bg-stone-900 px-4 py-4 text-stone-100">
		{#if !$urlSignKeys}
			<h2 class="mb-4 text-lg font-light uppercase">Recommended Tags</h2>
			<p class="font-light text-stone-400">Select a traffic sign to display recommended tags …</p>
		{:else}
			<h2 class="mb-4 text-lg font-light uppercase">Traffic sign tag</h2>
			{#if trafficSignTag && copyTrafficSignTag}
				{#key trafficSignTag}
					<div class="flex items-center justify-between">
						<Tag key={trafficSignTag[0]} value={trafficSignTag[1]} />
						<CopyButton text={copyTrafficSignTag}>
							<IconCopy class="h-4 w-4" />
						</CopyButton>
					</div>
				{/key}
			{/if}

			<h2 class="mb-4 mt-10 text-lg font-light uppercase">Recommended <code>highway</code> tags</h2>

			{#if aggregatedTags && copyAllTags}
				<div class="flex items-end justify-between">
					<ul>
						{#key aggregatedTags}
							{#each aggregatedTags as [key, value]}
								<li>
									<Tag {key} {value} />
								</li>
							{/each}
						{/key}
					</ul>

					<div>
						<CopyButton text={copyAllTags}>
							<IconCopy class="h-4 w-4" />
						</CopyButton>
					</div>
				</div>
			{/if}

			<div class="mt-10 space-y-2">
				<h3 class="text-lg font-thin uppercase text-stone-50">Notes</h3>
				{#if !aggregatedComments.length}–{/if}
				{#each aggregatedComments as [signKey, signTitle, comment] (signKey)}
					<p
						class="prose-white prose-a:underline prose-a:decoration-stone-700 prose-a:underline-offset-4 hover:prose-a:decoration-stone-400 hover:prose-a:decoration-1"
					>
						<code
							title={signTitle}
							class="mr-1 inline-flex items-center rounded bg-gray-50/10 px-1.5 py-0.5 pt-1 text-xs"
						>
							{signKey}
						</code>
						<WikiLinkify text={comment} />
					</p>
				{/each}
			</div>
		{/if}
	</section>
</main>

<StateHelper state={selectedSigns} />
