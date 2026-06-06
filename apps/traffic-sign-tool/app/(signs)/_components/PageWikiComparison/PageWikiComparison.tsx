import { MissingSvgNotice } from '@app/app/(signs)/_components/MissingSvgNotice'
import { MissingSvgPlaceholder } from '@app/app/(signs)/_components/MissingSvgPlaceholder'
import { PackageSvgTrafficSign } from '@app/app/(signs)/_components/PackageSvgTrafficSign'
import { FocusFilterRow } from '@app/app/(signs)/_components/PageApp/signGroups/FocusFilterRow'
import osmWikiLogo from '@app/app/(signs)/_components/PageWikiComparison/assets/osm-wiki-logo.svg'
import { useWikiComparisonHashScroll } from '@app/app/(signs)/_components/PageWikiComparison/useWikiComparisonHashScroll'
import { WikiComparisonFilterRow } from '@app/app/(signs)/_components/PageWikiComparison/WikiComparisonFilterRow'
import {
  countWikiRowsByFocus,
  countWikiRowsByStatus,
  enrichWikiSigns,
  filterWikiRowsByFocus,
  filterWikiRowsByStatus,
  getWikiRowPlaceholderSign,
  isWikiRowMissingInCatalogue,
  isWikiSignImageMissing,
  isWikiRowWikiSvgMissing,
  type WikiComparisonStatusFilter,
} from '@app/app/(signs)/_components/PageWikiComparison/wikiComparisonFilters'
import { buildWikiSignGithubIssueUrl } from '@app/app/(signs)/_components/PageWikiComparison/wikiComparisonIssueFormat'
import { buildWikiComparisonRowId } from '@app/app/(signs)/_components/PageWikiComparison/wikiComparisonLinks'
import { WikiComparisonPageIntro } from '@app/app/(signs)/_components/PageWikiComparison/WikiComparisonPageIntro'
import { WikiComparisonTablelize } from '@app/app/(signs)/_components/PageWikiComparison/WikiComparisonTablelize'
import { useParamFocus } from '@app/app/(signs)/_components/store/useParamFocus.search'
import { CataloguePageProps } from '@app/app/(signs)/_components/types'
import appLogo from '@app/app/_components/layout/assets/logo.svg'
import { ContentPageLayout } from '@app/app/_components/layout/ContentPageLayout'
import {
  ContentTable,
  ContentTableBody,
  ContentTableCell,
  ContentTableHeader,
  ContentTableRow,
} from '@app/app/_components/layout/ContentTable'
import { buttonStyle } from '@app/app/_components/links/buttonStyles'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import * as m from '@app/paraglide/messages'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { getTrafficSignsWiki } from '@internal/wiki'
import { clsx } from 'clsx'
import { Fragment, useMemo, useState } from 'react'

const WikiComparisonColumnHeader = ({ logoSrc, label }: { logoSrc: string; label: string }) => (
  <span className="inline-flex items-center gap-2">
    <img src={logoSrc} alt="" width={20} height={20} className="size-5 shrink-0" />
    <span>{label}</span>
  </span>
)

const wikiComparisonBlockHeaderClassName = (rowIndex: number) =>
  clsx('w-1/2 !border-b !border-stone-400/40 !py-1.5', rowIndex > 0 && '!pt-4')

const wikiComparisonRowCellClassName = (_rowIndex: number) =>
  clsx('relative !border-b-2 !border-stone-500/50 !py-2 !pb-4')

export const PageWikiComparison = ({ trafficSignData }: CataloguePageProps) => {
  const countryPrefix = useCurrentLang()
  const { focuses } = useParamFocus()
  const [statusFilter, setStatusFilter] = useState<WikiComparisonStatusFilter>('all')
  const highlightedRowId = useWikiComparisonHashScroll()

  const wikiRows = useMemo(
    () => enrichWikiSigns(getTrafficSignsWiki(countryPrefix), countryPrefix),
    [countryPrefix],
  )

  const focusCounts = useMemo(
    () => countWikiRowsByFocus(wikiRows, trafficSignData),
    [wikiRows, trafficSignData],
  )

  const focusFilteredRows = useMemo(
    () => filterWikiRowsByFocus(wikiRows, trafficSignData, focuses),
    [wikiRows, trafficSignData, focuses],
  )

  const statusCounts = useMemo(
    () => countWikiRowsByStatus(focusFilteredRows, countryPrefix),
    [focusFilteredRows, countryPrefix],
  )

  const displayedRows = useMemo(
    () => filterWikiRowsByStatus(focusFilteredRows, statusFilter, countryPrefix),
    [focusFilteredRows, statusFilter, countryPrefix],
  )

  const missingCount = statusCounts.missing

  return (
    <ContentPageLayout intro={<WikiComparisonPageIntro />} qaPagesNav>
      <div className="mt-2 flex flex-col gap-3">
        <FocusFilterRow counts={focusCounts} />
        <WikiComparisonFilterRow
          counts={statusCounts}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </div>

      <p className="mt-4 text-sm text-stone-700">
        {m.page_wiki_qa_showing({
          shown: String(displayedRows.length),
          filtered: String(focusFilteredRows.length),
          missing: String(missingCount),
        })}
      </p>

      <ContentTable className="!mt-6 text-xs leading-tight">
        <ContentTableBody>
          {displayedRows.map((sign, rowIndex) => {
            const { toolSign, imageSvg: _, ...restsign } = sign
            const isMissing = isWikiRowMissingInCatalogue(sign)
            const rowId = buildWikiComparisonRowId(sign.sign)
            const isHighlighted = highlightedRowId === rowId
            const blockHeaderClassName = wikiComparisonBlockHeaderClassName(rowIndex)
            const rowCellClassName = wikiComparisonRowCellClassName(rowIndex)
            const rowClassName = clsx(
              isMissing ? 'bg-amber-300' : '',
              isHighlighted && 'ring-2 ring-stone-900 ring-inset',
              'scroll-mt-24',
            )

            return (
              <Fragment key={sign.sign}>
                <ContentTableRow id={rowId} className={rowClassName}>
                  <ContentTableHeader className={blockHeaderClassName}>
                    <div className="flex items-center justify-between gap-2">
                      <WikiComparisonColumnHeader
                        logoSrc={appLogo}
                        label={m.page_wiki_qa_col_tool()}
                      />
                      <ExternalLink
                        href={buildWikiSignGithubIssueUrl(sign, toolSign)}
                        className={clsx(buttonStyle, 'shrink-0')}
                        blank
                      >
                        {m.wiki_open_github_issue()}
                      </ExternalLink>
                    </div>
                  </ContentTableHeader>
                  <ContentTableHeader className={blockHeaderClassName}>
                    <WikiComparisonColumnHeader
                      logoSrc={osmWikiLogo}
                      label={m.page_wiki_qa_col_wiki()}
                    />
                  </ContentTableHeader>
                </ContentTableRow>
                <ContentTableRow className={rowClassName}>
                  <ContentTableCell className={rowCellClassName}>
                    {toolSign?.recodgnizedSign ? (
                      <>
                        <PackageSvgTrafficSign
                          sign={toolSign}
                          className="absolute top-1 right-1 h-14 w-14 object-contain"
                          showSignKey={false}
                        />
                        <WikiComparisonTablelize
                          key={toolSign.osmValuePart}
                          data={toolSign}
                          compact
                        />
                        {isWikiRowWikiSvgMissing(sign) ? (
                          <MissingSvgNotice
                            sign={toolSign}
                            className="mt-2"
                            variant="compact"
                            showWikiLink={false}
                          />
                        ) : null}
                      </>
                    ) : (
                      <p className="text-center text-lg font-semibold text-pink-700">MISSING</p>
                    )}
                  </ContentTableCell>
                  <ContentTableCell className={rowCellClassName}>
                    {restsign ? (
                      <>
                        {sign?.imageSvg && !isWikiSignImageMissing(sign) ? (
                          <img
                            src={sign.imageSvg}
                            alt={sign.name}
                            className="absolute top-1 right-1 h-14 w-14 object-contain"
                            title="Image from source URL"
                          />
                        ) : (
                          <MissingSvgPlaceholder
                            sign={getWikiRowPlaceholderSign(sign)}
                            className="absolute top-1 right-1 h-14 w-14 object-contain"
                            showSignKey={false}
                          />
                        )}
                        <WikiComparisonTablelize key={restsign.sign} data={restsign} compact />
                      </>
                    ) : (
                      <small className="text-amber-700">MISSING</small>
                    )}
                  </ContentTableCell>
                </ContentTableRow>
              </Fragment>
            )
          })}
        </ContentTableBody>
      </ContentTable>
    </ContentPageLayout>
  )
}
