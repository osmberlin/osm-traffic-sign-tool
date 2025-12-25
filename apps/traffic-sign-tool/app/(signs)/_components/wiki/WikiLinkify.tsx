import { CountryPrefixType } from '@osm-traffic-signs/converter'
import { micromark } from 'micromark'
import { gfm, gfmHtml } from 'micromark-extension-gfm'
import { useMemo } from 'react'

import { useCountryPrefixWithFallback } from '../store/CountryPrefixContext'

type Props = {
  text: string
}

/**
 * Preprocessor that converts OSM-specific syntax to standard markdown
 * before micromark parsing.
 *
 * - [Key:foo] → link to wiki key page
 * - [Key:foo:bar] → link to wiki page for compound key foo:bar
 * - [Tag:foo=bar] → link to wiki tag page with inline code styling
 */
function preprocessOsmSyntax(text: string, countryPrefix: CountryPrefixType): string {
  const wikiKeyBase = `https://wiki.openstreetmap.org/wiki/${countryPrefix}:Key:`
  const wikiTagBase = `https://wiki.openstreetmap.org/wiki/${countryPrefix}:Tag:`

  return text
    .replace(/\[Key:([^\]]+)\]/g, (_, key: string) => {
      return `[\`${key}\`](${wikiKeyBase}${key})`
    })
    .replace(/\[Tag:([^=\]]+)=([^\]]+)\]/g, (_, key: string, value: string) => {
      return `[\`${key}=${value}\`](${wikiTagBase}${key}=${value})`
    })
}

export const WikiLinkify = ({ text }: Props) => {
  const { countryPrefix } = useCountryPrefixWithFallback()

  const html = useMemo(() => {
    const preprocessed = preprocessOsmSyntax(text, countryPrefix)

    return micromark(preprocessed, {
      extensions: [gfm()],
      htmlExtensions: [gfmHtml()],
    })
  }, [text, countryPrefix])

  return (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      className="prose-code:bg-stone-700 prose-code:rounded prose-code:px-0.5 prose-a:underline prose-a:decoration-stone-700 prose-a:underline-offset-4 prose-a:hover:decoration-stone-400 prose-a:hover:decoration-1"
    />
  )
}
