import type { CountryPrefixType } from '@osm-traffic-signs/converter'

export type IndexSearch = {
  q?: string
  signs?: string
  focus?: string
}

export const preserveIndexSearch = (search: IndexSearch) => ({
  ...(search.q ? { q: search.q } : {}),
  ...(search.signs ? { signs: search.signs } : {}),
  ...(search.focus ? { focus: search.focus } : {}),
})

export const buildIndexPreferenceRedirect = (
  preference: CountryPrefixType | null,
  search: IndexSearch,
) => {
  if (!preference) {
    return null
  }

  return {
    to: '/$lang' as const,
    params: { lang: preference },
    replace: true as const,
    search: preserveIndexSearch(search),
  }
}
