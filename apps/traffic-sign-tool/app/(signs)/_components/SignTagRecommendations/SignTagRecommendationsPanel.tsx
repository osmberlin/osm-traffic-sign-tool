import { TaginfoGeometrySections } from '@app/app/(signs)/_components/PageTaginfoComparison/recommendations/TaginfoGeometrySections'
import { TaginfoRowDebug } from '@app/app/(signs)/_components/PageTaginfoComparison/recommendations/TaginfoRowDebug'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { hasQaCapability } from '@osm-traffic-signs/converter'

type Props = {
  value: string
}

export function SignTagRecommendationsPanel({ value }: Props) {
  const countryPrefix = useCurrentLang()
  const showDebug = hasQaCapability(countryPrefix, 'debugInfo')

  return (
    <div className="space-y-4">
      <TaginfoGeometrySections value={value} />
      {showDebug ? <TaginfoRowDebug value={value} countryPrefix={countryPrefix} /> : null}
    </div>
  )
}
