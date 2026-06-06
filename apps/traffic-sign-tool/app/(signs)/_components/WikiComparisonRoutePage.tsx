import { CountryFeatureUnavailablePage } from '@app/app/(signs)/_components/CountryFeatureUnavailablePage'
import WikiPage from '@app/app/(signs)/DE/wiki/page'
import * as m from '@app/paraglide/messages'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { hasQaCapability } from '@osm-traffic-signs/converter'

export default function WikiComparisonRoutePage() {
  const countryPrefix = useCurrentLang()

  if (!hasQaCapability(countryPrefix, 'wikiComparison')) {
    return <CountryFeatureUnavailablePage featureName={m.wiki_title()} />
  }

  return <WikiPage />
}
