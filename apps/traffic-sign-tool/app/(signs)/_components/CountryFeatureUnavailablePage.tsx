import { ContentPageLayout } from '@app/app/_components/layout/ContentPageLayout'
import { proseLightClass } from '@app/app/_components/layout/proseClasses'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
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
          This maintainer view is not available yet for the <strong>{meta.catalogueName}</strong>{' '}
          catalogue ({countryPrefix}). It requires country-specific snapshot data that has only been
          prepared for Germany so far.
        </p>
        <p>
          See the{' '}
          <ExternalLink href={meta.osmWikiOverviewUrl} blank>
            OSM Wiki overview
          </ExternalLink>{' '}
          for this country&apos;s traffic sign documentation.
        </p>
      </div>
    </ContentPageLayout>
  )
}
