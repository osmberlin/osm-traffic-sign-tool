'use client'
import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.nuqs'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import { showSignsToTagsWarning } from '@osm-traffic-signs/converter'
import { ResultComments } from './results/ResultComments'
import { ResultDebug } from './results/ResultDebug'
import { ResultTagRecommendations } from './results/ResultTagRecommendations'
import { ResultTrafficSignTag } from './results/ResultTrafficSignTag'

export const ResultColumn = () => {
  const { paramSigns } = useParamSigns()

  if (!paramSigns.length) {
    return (
      <>
        <h2 className="mb-4 text-lg font-light uppercase">Recommended Tags</h2>
        <p className="font-light text-stone-400">
          Select a traffic sign to display recommended tags …
        </p>
      </>
    )
  }

  return (
    <>
      <ResultTrafficSignTag />
      {showSignsToTagsWarning(paramSigns) ? (
        <>
          <p className="py-6">
            <strong className="text-amber-500">
              You selected more than one sign that modifies access or conditional tags which this
              tool does not handle, yet.
            </strong>{' '}
            The tagging recommendations are very likely wrong. Please consult the{' '}
            <ExternalLink
              href="https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland"
              blank
            >
              Wiki
            </ExternalLink>{' '}
            and{' '}
            <ExternalLink href="https://community.openstreetmap.org/tag/traffic_sign" blank>
              Forum
            </ExternalLink>{' '}
            to find suitable recommendations.
          </p>
          <details>
            <summary className="cursor-pointer underline-offset-2 hover:text-white hover:underline">
              Show results anyway
            </summary>

            <ResultTagRecommendations />
            <ResultComments />
          </details>
        </>
      ) : (
        <>
          <ResultTagRecommendations />
          <ResultComments />
        </>
      )}
      <ResultDebug />
    </>
  )
}
