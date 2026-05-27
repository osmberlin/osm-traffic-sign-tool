'use client'
import { FocusFilterRow } from '@app/app/(signs)/_components/PageApp/signGroups/FocusFilterRow'
import { TaggingQaFilterRow } from '@app/app/(signs)/_components/PageSignsQa/TaggingQaFilterRow'
import { TaggingQaTable } from '@app/app/(signs)/_components/PageSignsQa/TaggingQaTable'
import { CountryPrefixProvider } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { useParamFocus } from '@app/app/(signs)/_components/store/useParamFocus.search'
import { useParamTaggingQa } from '@app/app/(signs)/_components/store/useParamTaggingQa.search'
import { PageProps } from '@app/app/(signs)/_components/types'
import { ContentPageLayout } from '@app/app/_components/layout/ContentPageLayout'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import {
  countSignsByTaggingSuggestionsQa,
  filterSignsByFocus,
  filterSignsByTaggingSuggestionsQa,
} from '@osm-traffic-signs/converter'
export const PageSignsQa = ({ countryPrefix, trafficSignData }: PageProps) => {
  const { focuses } = useParamFocus()
  const { qaFilter } = useParamTaggingQa()

  const focusFilteredSigns = filterSignsByFocus(trafficSignData, focuses)
  const qaCounts = countSignsByTaggingSuggestionsQa(focusFilteredSigns)
  const displayedSigns = filterSignsByTaggingSuggestionsQa(focusFilteredSigns, qaFilter)

  return (
    <CountryPrefixProvider countryPrefix={countryPrefix}>
      <ContentPageLayout>
        <h2 className="my-4 text-3xl font-light text-black uppercase">Tagging QA</h2>
        <p>
          Review tagging suggestions per sign. Use focus and QA filters to find signs that still
          need tag recommendations. Record tasks below and copy results into a GitHub issue.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <FocusFilterRow />
          <TaggingQaFilterRow counts={qaCounts} />
        </div>

        <p className="mt-4 text-sm text-stone-700">
          Showing {displayedSigns.length} of {focusFilteredSigns.length} signs (focus filter) ·{' '}
          {trafficSignData.length} total in catalogue.{' '}
          <ExternalLink href="https://www.npmjs.com/package/@osm-traffic-signs/converter">
            Converter package
          </ExternalLink>
        </p>

        <TaggingQaTable signs={displayedSigns} />
      </ContentPageLayout>
    </CountryPrefixProvider>
  )
}
