import * as m from '@app/paraglide/messages'
import type { DeSearchSchema } from '@app/src/features/searchParams/deSearch'
import type { CountryPrefixType } from '@osm-traffic-signs/converter'

/** Production origin for canonical URLs, sitemap, and static og:image (see `public/og-traffic-signs.png`). */
export const SITE_ORIGIN = 'https://trafficsigns.osm-verkehrswende.org' as const

export const OG_IMAGE_URL = `${SITE_ORIGIN}/og-traffic-signs.png` as const

const robotsNoindexMeta = { name: 'robots', content: 'noindex, nofollow' } as const

export const pageTitle = (pageLabel: string) => `${pageLabel} — ${m.header_title()}`

export const hasDeSearchParams = (search: DeSearchSchema): boolean =>
  Boolean(search.q || search.signs || search.focus || search.qa || search.comb || search.primary)

export const catalogueHomeUrl = (lang: CountryPrefixType) => `${SITE_ORIGIN}/${lang}/`

type HeadMeta = { title: string } | { name: string; content: string }

export const buildPageHead = (options: {
  title: string
  description?: string
  noindex?: boolean
}) => {
  const meta: HeadMeta[] = [
    { title: options.title },
    { name: 'description', content: options.description ?? m.seo_default_description() },
  ]
  if (options.noindex) {
    meta.push(robotsNoindexMeta)
  }
  return { meta }
}

export const buildNoindexPageHead = (pageLabel: string) =>
  buildPageHead({
    title: pageTitle(pageLabel),
    noindex: true,
  })
