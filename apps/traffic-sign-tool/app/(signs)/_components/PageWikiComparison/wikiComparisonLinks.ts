import type { CountryPrefixType } from '@osm-traffic-signs/converter'

export const buildWikiComparisonRowId = (wikiSign: string) =>
  `wiki-qa-${wikiSign.replace(':', '-')}`

export const buildWikiComparisonRowHref = (
  countryPrefix: CountryPrefixType,
  osmValuePart: string,
) => `/${countryPrefix}/wiki#${buildWikiComparisonRowId(`${countryPrefix}:${osmValuePart}`)}`
