'use client'
import { ContentPageLayout } from '@app/app/_components/layout/ContentPageLayout'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import { CheckCombinationTable } from '@app/app/(signs)/_components/PageCheckSignCombinations/CheckCombinationTable'
import { CombinationQaSignPicker } from '@app/app/(signs)/_components/PageCheckSignCombinations/CombinationQaSignPicker'
import { CombinationQaTaskResults } from '@app/app/(signs)/_components/PageCheckSignCombinations/CombinationQaTaskResults'
import {
  buildCombinationRowsForPrimary,
  countPrimarySignsByFilter,
  filterPrimarySigns,
  getPrimaryCombinationMeta,
} from '@app/app/(signs)/_components/PageCheckSignCombinations/combinationQaFilters'
import {
  collectCombinationTaskEntries,
  type CombinationFeedbackState,
} from '@app/app/(signs)/_components/PageCheckSignCombinations/combinationQaTaskFormat'
import { PackageSvgTrafficSign } from '@app/app/(signs)/_components/PackageSvgTrafficSign'
import { useParamCombinationPrimary } from '@app/app/(signs)/_components/store/useParamCombinationPrimary.search'
import { useParamCombinationQa } from '@app/app/(signs)/_components/store/useParamCombinationQa.search'
import { useReplaceDeSearch } from '@app/app/(signs)/_components/store/useReplaceDeSearch'
import { CountryPrefixProvider } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { PageProps } from '@app/app/(signs)/_components/types'
import {
  serializeCombinationQaParam,
  type CombinationQaFilter,
} from '@app/src/features/searchParams/deSearch'
import { useCallback, useMemo, useState } from 'react'

export const PageCheckSignCombinations = ({ countryPrefix, trafficSignData }: PageProps) => {
  const { combinationFilter } = useParamCombinationQa()
  const { primaryOsmValuePart } = useParamCombinationPrimary()
  const { replaceSearch } = useReplaceDeSearch()
  const [feedback, setFeedback] = useState<Map<string, CombinationFeedbackState>>(() => new Map())

  const primarySigns = trafficSignData.filter((sign) => sign.kind === 'traffic_sign')
  const modifierSigns = trafficSignData.filter((sign) => sign.kind !== 'traffic_sign')

  const signFilterCounts = useMemo(
    () => countPrimarySignsByFilter(primarySigns, modifierSigns),
    [primarySigns, modifierSigns],
  )

  const filteredPrimarySigns = useMemo(
    () => filterPrimarySigns(primarySigns, modifierSigns, combinationFilter),
    [primarySigns, modifierSigns, combinationFilter],
  )

  const combinationCountByOsm = useMemo(() => {
    const counts = new Map<string, number>()
    for (const sign of filteredPrimarySigns) {
      counts.set(sign.osmValuePart, getPrimaryCombinationMeta(sign, modifierSigns).combinationCount)
    }
    return counts
  }, [filteredPrimarySigns, modifierSigns])

  const selectedPrimarySign = primaryOsmValuePart
    ? filteredPrimarySigns.find((sign) => sign.osmValuePart === primaryOsmValuePart)
    : undefined

  const selectedCombinationRows = selectedPrimarySign
    ? buildCombinationRowsForPrimary(selectedPrimarySign, modifierSigns, countryPrefix)
    : []

  const taskEntries =
    feedback.size === 0 ? [] : collectCombinationTaskEntries(feedback, countryPrefix)

  const updateSearch = useCallback(
    (update: { combinationFilter: CombinationQaFilter } | { primaryOsmValuePart: string }) => {
      replaceSearch((prev) => {
        const nextFilter =
          'combinationFilter' in update ? update.combinationFilter : combinationFilter
        const nextFiltered = filterPrimarySigns(primarySigns, modifierSigns, nextFilter)
        let nextPrimary =
          'primaryOsmValuePart' in update ? update.primaryOsmValuePart : prev.primary

        if (nextPrimary && !nextFiltered.some((sign) => sign.osmValuePart === nextPrimary)) {
          nextPrimary = undefined
        }

        return {
          ...prev,
          comb: serializeCombinationQaParam(nextFilter),
          primary: nextPrimary,
        }
      })
    },
    [combinationFilter, modifierSigns, primarySigns, replaceSearch],
  )

  const handleFilterChange = useCallback(
    (filter: CombinationQaFilter) => {
      updateSearch({ combinationFilter: filter })
    },
    [updateSearch],
  )

  const handlePrimarySelect = useCallback(
    (osmValuePart: string) => {
      updateSearch({ primaryOsmValuePart: osmValuePart })
    },
    [updateSearch],
  )

  const handleClearPrimary = useCallback(() => {
    replaceSearch((prev) => ({ ...prev, primary: undefined }))
  }, [replaceSearch])

  return (
    <CountryPrefixProvider countryPrefix={countryPrefix}>
      <ContentPageLayout>
        <h2 className="my-4 text-3xl font-light text-black uppercase">Sign combinations QA</h2>
        <p>
          Select a primary sign, then review its modifier combinations. Record feedback and open a
          GitHub issue to update the catalogue.
        </p>

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
            <code>{primaryOsmValuePart}</code> is not in the current filter.{' '}
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
                  <code>{selectedPrimarySign.osmValuePart}</code> – {selectedPrimarySign.descriptiveName}
                </h3>
                <p className="mt-1 text-sm text-stone-700">
                  Showing {selectedCombinationRows.length} combination
                  {selectedCombinationRows.length === 1 ? '' : 's'} · {modifierSigns.length} modifier
                  signs in catalogue.{' '}
                  <ExternalLink href="https://www.npmjs.com/package/@osm-traffic-signs/converter">
                    Converter package
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
            <p className="mt-8 text-sm text-stone-600">
              Select a primary sign above to review its combinations.
            </p>
          )
        )}
      </ContentPageLayout>
    </CountryPrefixProvider>
  )
}
