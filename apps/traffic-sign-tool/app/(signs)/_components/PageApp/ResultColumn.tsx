import { useCountryPrefix } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.search'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import * as m from '@app/paraglide/messages'
import { getCountryCatalogueMeta, showSignsToTagsWarning } from '@osm-traffic-signs/converter'
import { ResultComments } from './results/ResultComments'
import { ResultTagRecommendations } from './results/ResultTagRecommendations'

export const ResultColumn = () => {
  const { paramSigns } = useParamSigns()
  const { countryPrefix } = useCountryPrefix()
  const { osmWikiOverviewUrl } = getCountryCatalogueMeta(countryPrefix)

  if (!paramSigns.length) {
    return (
      <>
        <h2 className="mb-3 text-lg font-light uppercase md:mb-4">{m.page_recommended_tags()}</h2>
        <p className="font-light text-stone-400">{m.page_select_sign_hint()}</p>
      </>
    )
  }

  return (
    <>
      {showSignsToTagsWarning(paramSigns) ? (
        <>
          <p className="py-3 md:py-6">
            <strong className="text-amber-500">{m.page_multi_modifier_warning()}</strong>{' '}
            {m.page_multi_modifier_followup()}{' '}
            <ExternalLink href={osmWikiOverviewUrl} blank>
              {m.page_wiki()}
            </ExternalLink>{' '}
            {m.page_multi_modifier_and()}{' '}
            <ExternalLink href="https://community.openstreetmap.org/tag/traffic_sign" blank>
              {m.page_forum()}
            </ExternalLink>{' '}
            {m.page_multi_modifier_end()}
          </p>
          <details>
            <summary className="cursor-pointer underline-offset-2 hover:text-white hover:underline">
              {m.page_show_results_anyway()}
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
    </>
  )
}
