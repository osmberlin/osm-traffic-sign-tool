import { CountryFeatureUnavailablePage } from '@app/app/(signs)/_components/CountryFeatureUnavailablePage'
import { PageTaginfoComparison } from '@app/app/(signs)/_components/PageTaginfoComparison/PageTaginfoComparison'
import * as m from '@app/paraglide/messages'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { hasQaCapability } from '@osm-traffic-signs/converter'

export default function TaginfoComparisonRoutePage() {
  const countryPrefix = useCurrentLang()

  if (!hasQaCapability(countryPrefix, 'taginfoComparison')) {
    return <CountryFeatureUnavailablePage featureName={m.taginfo_title()} />
  }

  return <PageTaginfoComparison />
}
