import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { hasQaCapability } from '@osm-traffic-signs/converter'
import { TaginfoGeometrySections } from '../recommendations/TaginfoGeometrySections'
import { TaginfoRowDebug } from '../recommendations/TaginfoRowDebug'

type Props = {
  value: string
}

export const TaginfoRowRecommendations = ({ value }: Props) => {
  const countryPrefix = useCurrentLang()
  const showDebug = hasQaCapability(countryPrefix, 'debugInfo')

  return (
    <div className="space-y-4">
      <TaginfoGeometrySections value={value} />
      {showDebug ? <TaginfoRowDebug value={value} countryPrefix={countryPrefix} /> : null}
    </div>
  )
}
