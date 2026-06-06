import { ContentPageLayout } from '@app/app/_components/layout/ContentPageLayout'
import { proseLightClass } from '@app/app/_components/layout/proseClasses'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import * as m from '@app/paraglide/messages'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { getCountryCatalogueMeta } from '@osm-traffic-signs/converter'

type Props = {
  featureName: string
}

export const CountryFeatureUnavailablePage = ({ featureName }: Props) => {
  const countryPrefix = useCurrentLang()
  const meta = getCountryCatalogueMeta(countryPrefix)

  return (
    <ContentPageLayout>
      <h2 className="my-4 text-3xl font-light text-black uppercase">{featureName}</h2>
      <div className={proseLightClass}>
        <p>
          {m.feature_unavailable_intro({
            catalogueName: meta.catalogueName,
            countryPrefix,
          })}
        </p>
        <p>
          {m.feature_unavailable_wiki_link()}{' '}
          <ExternalLink href={meta.osmWikiOverviewUrl} blank>
            OSM Wiki
          </ExternalLink>
        </p>
      </div>
    </ContentPageLayout>
  )
}
