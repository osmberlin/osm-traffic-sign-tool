import { TaginfoRowActions } from '@app/app/(signs)/_components/PageTaginfoComparison/row/TaginfoRowActions'
import { TaginfoRowRecommendations } from '@app/app/(signs)/_components/PageTaginfoComparison/row/TaginfoRowRecommendations'
import { TaginfoSignImages } from '@app/app/(signs)/_components/PageTaginfoComparison/row/TaginfoSignImages'
import { ContentPageLayout } from '@app/app/_components/layout/ContentPageLayout'
import {
  ContentTable,
  ContentTableBody,
  ContentTableCell,
  ContentTableHead,
  ContentTableHeader,
  ContentTableRow,
} from '@app/app/_components/layout/ContentTable'
import { inlineCodeClass } from '@app/app/_components/layout/proseClasses'
import * as m from '@app/paraglide/messages'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { getTaginfoTrafficSignData } from '@internal/taginfo'
import { z } from 'zod'
import { TaginfoComparisonPageIntro } from './TaginfoComparisonPageIntro'

const Schema = z.array(z.tuple([z.string(), z.number()]))

const TaginfoTableColumnHeader = ({
  source,
  label,
}: {
  source?: 'taginfo' | 'tool'
  label: string
}) => (
  <span className="block leading-tight">
    {source ? (
      <span className="block text-xs font-normal text-stone-500">
        {source === 'taginfo'
          ? m.page_taginfo_qa_source_taginfo()
          : m.page_taginfo_qa_source_tool()}
      </span>
    ) : null}
    <span>{label}</span>
  </span>
)

export const PageTaginfoComparison = () => {
  const countryPrefix = useCurrentLang()
  const data = Schema.parse(getTaginfoTrafficSignData(countryPrefix))

  return (
    <ContentPageLayout intro={<TaginfoComparisonPageIntro />}>
      <ContentTable>
        <ContentTableHead>
          <ContentTableRow>
            <ContentTableHeader className="w-[14%]">
              <TaginfoTableColumnHeader
                source="taginfo"
                label={m.page_taginfo_qa_col_sign_value()}
              />
            </ContentTableHeader>
            <ContentTableHeader className="w-[8%]">
              <TaginfoTableColumnHeader source="taginfo" label={m.page_taginfo_qa_col_usage()} />
            </ContentTableHeader>
            <ContentTableHeader className="w-[14%]">
              <TaginfoTableColumnHeader source="tool" label={m.page_taginfo_qa_col_signs()} />
            </ContentTableHeader>
            <ContentTableHeader>
              <TaginfoTableColumnHeader
                source="tool"
                label={m.page_taginfo_qa_col_recommendations()}
              />
            </ContentTableHeader>
            <ContentTableHeader className="w-[20%] min-w-44">
              <TaginfoTableColumnHeader label={m.page_taginfo_qa_col_actions()} />
            </ContentTableHeader>
          </ContentTableRow>
        </ContentTableHead>
        <ContentTableBody>
          {data.map(([value, usageCount]) => {
            return (
              <ContentTableRow key={value}>
                <ContentTableHeader>
                  <code className={inlineCodeClass}>{value}</code>
                </ContentTableHeader>
                <ContentTableCell className="text-right">
                  {usageCount.toLocaleString()} &times;
                </ContentTableCell>
                <ContentTableCell className="text-sm">
                  <TaginfoSignImages value={value} />
                </ContentTableCell>
                <ContentTableCell className="text-sm">
                  <TaginfoRowRecommendations value={value} />
                </ContentTableCell>
                <ContentTableCell className="min-w-44 text-sm">
                  <TaginfoRowActions
                    value={value}
                    usageCount={usageCount}
                    countryPrefix={countryPrefix}
                  />
                </ContentTableCell>
              </ContentTableRow>
            )
          })}
        </ContentTableBody>
      </ContentTable>
    </ContentPageLayout>
  )
}
