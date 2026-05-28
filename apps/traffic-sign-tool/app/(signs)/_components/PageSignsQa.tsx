import { FocusFilterRow } from '@app/app/(signs)/_components/PageApp/signGroups/FocusFilterRow'
import { TaggingQaFilterRow } from '@app/app/(signs)/_components/PageSignsQa/TaggingQaFilterRow'
import { TaggingQaTable } from '@app/app/(signs)/_components/PageSignsQa/TaggingQaTable'
import { useParamFocus } from '@app/app/(signs)/_components/store/useParamFocus.search'
import { useParamTaggingQa } from '@app/app/(signs)/_components/store/useParamTaggingQa.search'
import { PageProps } from '@app/app/(signs)/_components/types'
import { ContentPageLayout } from '@app/app/_components/layout/ContentPageLayout'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import * as m from '@app/paraglide/messages'
import {
  countSignsByTaggingSuggestionsQa,
  filterSignsByFocus,
  filterSignsByTaggingSuggestionsQa,
} from '@osm-traffic-signs/converter'

export const PageSignsQa = ({ trafficSignData }: PageProps) => {
  const { focuses } = useParamFocus()
  const { qaFilter } = useParamTaggingQa()

  const focusFilteredSigns = filterSignsByFocus(trafficSignData, focuses)
  const qaCounts = countSignsByTaggingSuggestionsQa(focusFilteredSigns)
  const displayedSigns = filterSignsByTaggingSuggestionsQa(focusFilteredSigns, qaFilter)

  return (
    <ContentPageLayout>
      <h2 className="my-4 text-3xl font-light text-black uppercase">{m.page_tagging_qa_title()}</h2>
      <p>{m.page_tagging_qa_description()}</p>

      <div className="mt-6 flex flex-col gap-3">
        <FocusFilterRow />
        <TaggingQaFilterRow counts={qaCounts} />
      </div>

      <p className="mt-4 text-sm text-stone-700">
        {m.page_tagging_qa_showing({
          shown: String(displayedSigns.length),
          filtered: String(focusFilteredSigns.length),
          total: String(trafficSignData.length),
        })}{' '}
        <ExternalLink href="https://www.npmjs.com/package/@osm-traffic-signs/converter">
          {m.converter_package()}
        </ExternalLink>
      </p>

      <TaggingQaTable signs={displayedSigns} />
    </ContentPageLayout>
  )
}
