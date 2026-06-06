import { PackageSvgTrafficSign } from '@app/app/(signs)/_components/PackageSvgTrafficSign'
import { CheckCombinationTable } from '@app/app/(signs)/_components/PageCheckSignCombinations/CheckCombinationTable'
import {
  buildCombinationRowsForPrimary,
  countPrimarySignsByFilter,
  filterPrimarySigns,
  getPrimaryCombinationMeta,
} from '@app/app/(signs)/_components/PageCheckSignCombinations/combinationQaFilters'
import { CombinationQaSignPicker } from '@app/app/(signs)/_components/PageCheckSignCombinations/CombinationQaSignPicker'
import {
  collectCombinationTaskEntries,
  type CombinationFeedbackState,
} from '@app/app/(signs)/_components/PageCheckSignCombinations/combinationQaTaskFormat'
import { CombinationQaTaskResults } from '@app/app/(signs)/_components/PageCheckSignCombinations/CombinationQaTaskResults'
import { useParamCombinationPrimary } from '@app/app/(signs)/_components/store/useParamCombinationPrimary.search'
import { useParamCombinationQa } from '@app/app/(signs)/_components/store/useParamCombinationQa.search'
import { useReplaceDeSearch } from '@app/app/(signs)/_components/store/useReplaceDeSearch'
import { PageProps } from '@app/app/(signs)/_components/types'
import { ContentPageLayout } from '@app/app/_components/layout/ContentPageLayout'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import * as m from '@app/paraglide/messages'
import { catalogueHtmlLang } from '@app/src/features/routing/lang'
import {
  serializeCombinationQaParam,
  type CombinationQaFilter,
} from '@app/src/features/searchParams/deSearch'
import { useState } from 'react'

export const PageCheckSignCombinations = ({ countryPrefix, trafficSignData }: PageProps) => {
  const { combinationFilter } = useParamCombinationQa()
  const { primaryOsmValuePart } = useParamCombinationPrimary()
  const { replaceSearch } = useReplaceDeSearch()
  const [feedback, setFeedback] = useState<Map<string, CombinationFeedbackState>>(() => new Map())
  const catalogueLangAttr = catalogueHtmlLang(countryPrefix)

  const primarySigns = trafficSignData.filter((sign) => sign.kind === 'traffic_sign')
  const modifierSigns = trafficSignData.filter((sign) => sign.kind !== 'traffic_sign')

  const signFilterCounts = countPrimarySignsByFilter(primarySigns, modifierSigns)

  const filteredPrimarySigns = filterPrimarySigns(primarySigns, modifierSigns, combinationFilter)

  const combinationCountByOsm = new Map<string, number>()
  for (const sign of filteredPrimarySigns) {
    combinationCountByOsm.set(
      sign.osmValuePart,
      getPrimaryCombinationMeta(sign, modifierSigns).combinationCount,
    )
  }

  const selectedPrimarySign = primaryOsmValuePart
    ? filteredPrimarySigns.find((sign) => sign.osmValuePart === primaryOsmValuePart)
    : undefined

  const selectedCombinationRows = selectedPrimarySign
    ? buildCombinationRowsForPrimary(selectedPrimarySign, modifierSigns, countryPrefix)
    : []

  const taskEntries =
    feedback.size === 0 ? [] : collectCombinationTaskEntries(feedback, countryPrefix)

  const updateSearch = (
    update: { combinationFilter: CombinationQaFilter } | { primaryOsmValuePart: string },
  ) => {
    replaceSearch((prev) => {
      const nextFilter =
        'combinationFilter' in update ? update.combinationFilter : combinationFilter
      const nextFiltered = filterPrimarySigns(primarySigns, modifierSigns, nextFilter)
      let nextPrimary = 'primaryOsmValuePart' in update ? update.primaryOsmValuePart : prev.primary

      if (nextPrimary && !nextFiltered.some((sign) => sign.osmValuePart === nextPrimary)) {
        nextPrimary = undefined
      }

      return {
        ...prev,
        comb: serializeCombinationQaParam(nextFilter),
        primary: nextPrimary,
      }
    })
  }

  const handleFilterChange = (filter: CombinationQaFilter) => {
    updateSearch({ combinationFilter: filter })
  }

  const handlePrimarySelect = (osmValuePart: string) => {
    updateSearch({ primaryOsmValuePart: osmValuePart })
  }

  const handleClearPrimary = () => {
    replaceSearch((prev) => ({ ...prev, primary: undefined }))
  }

  return (
    <ContentPageLayout qaPagesNav>
      <h2 className="my-4 text-3xl font-light text-black uppercase">
        {m.page_combinations_qa_title()}
      </h2>
      <p>{m.combinations_intro()}</p>

      <CombinationQaTaskResults entries={taskEntries} />

      <CombinationQaSignPicker
        filteredPrimarySigns={filteredPrimarySigns}
        combinationCountByOsm={combinationCountByOsm}
        counts={signFilterCounts}
        primaryOsmValuePart={primaryOsmValuePart}
        onPrimarySelect={handlePrimarySelect}
        onFilterChange={handleFilterChange}
      />

      {primaryOsmValuePart && !selectedPrimarySign && (
        <p className="mt-8 text-sm text-stone-600">
          <code lang={catalogueLangAttr}>{primaryOsmValuePart}</code> is not in the current filter.{' '}
          <button
            type="button"
            className="underline hover:text-stone-900"
            onClick={handleClearPrimary}
          >
            Clear selection
          </button>
        </p>
      )}

      {selectedPrimarySign ? (
        <section className="mt-8">
          <div className="mb-4 flex items-center gap-4">
            <PackageSvgTrafficSign sign={selectedPrimarySign} className="h-auto w-16 shrink-0" />
            <div>
              <h3 className="text-xl font-light text-black">
                <span lang={catalogueLangAttr}>
                  <code>{selectedPrimarySign.osmValuePart}</code> –{' '}
                  {selectedPrimarySign.descriptiveName}
                </span>
              </h3>
              <p className="mt-1 text-sm text-stone-700">
                {selectedCombinationRows.length === 1
                  ? m.combinations_showing({ count: String(selectedCombinationRows.length) })
                  : m.combinations_showing_plural({
                      count: String(selectedCombinationRows.length),
                    })}{' '}
                · {modifierSigns.length} modifier signs in catalogue.{' '}
                <ExternalLink href="https://www.npmjs.com/package/@osm-traffic-signs/converter">
                  {m.converter_package()}
                </ExternalLink>
              </p>
            </div>
          </div>

          <CheckCombinationTable
            key={selectedPrimarySign.osmValuePart}
            rows={selectedCombinationRows}
            feedback={feedback}
            onFeedbackChange={setFeedback}
          />
        </section>
      ) : (
        !primaryOsmValuePart && (
          <p className="mt-8 text-sm text-stone-600">{m.combinations_select_primary_hint()}</p>
        )
      )}
    </ContentPageLayout>
  )
}
