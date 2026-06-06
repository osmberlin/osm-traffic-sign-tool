import { CombinationQaFilterRow } from '@app/app/(signs)/_components/PageCheckSignCombinations/CombinationQaFilterRow'
import type { CombinationQaCounts } from '@app/app/(signs)/_components/PageCheckSignCombinations/combinationQaFilters'
import { useCatalogueHtmlLang } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import * as m from '@app/paraglide/messages'
import type { CombinationQaFilter } from '@app/src/features/searchParams/deSearch'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import type { SignType } from '@osm-traffic-signs/converter'
import clsx from 'clsx'

type Props = {
  filteredPrimarySigns: SignType[]
  combinationCountByOsm: Map<string, number>
  counts: CombinationQaCounts
  primaryOsmValuePart?: string
  onPrimarySelect: (osmValuePart: string) => void
  onFilterChange: (filter: CombinationQaFilter) => void
  nested?: boolean
}

export const CombinationQaSignPicker = ({
  filteredPrimarySigns,
  combinationCountByOsm,
  counts,
  primaryOsmValuePart,
  onPrimarySelect,
  onFilterChange,
  nested = false,
}: Props) => {
  const catalogueLang = useCatalogueHtmlLang()
  const selectedSign = filteredPrimarySigns.find(
    (sign) => sign.osmValuePart === primaryOsmValuePart,
  )
  const selectedInList = Boolean(selectedSign)

  return (
    <details
      className={clsx(
        'group w-full rounded-sm outline -outline-offset-1 outline-stone-500/50',
        !nested && 'mt-6',
      )}
      open={!selectedInList}
    >
      <summary
        className={clsx(
          'flex cursor-pointer list-none items-center gap-2 px-2 py-1.5 text-sm font-medium text-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-300 focus-visible:ring-offset-2',
          '[&::-webkit-details-marker]:hidden',
        )}
      >
        <ChevronRightIcon className="size-4 shrink-0 text-stone-500 transition-transform group-open:rotate-90" />
        <span>
          {selectedSign ? (
            <>
              {m.combinations_primary_select()}:{' '}
              <span lang={catalogueLang}>
                {selectedSign.osmValuePart} – {selectedSign.descriptiveName}
              </span>
            </>
          ) : (
            m.combinations_primary_select()
          )}
        </span>
        {selectedSign && (
          <span className="text-stone-500">
            {m.combinations_primary_matching({ count: String(filteredPrimarySigns.length) })}
          </span>
        )}
      </summary>

      <div className="space-y-3 border-t border-stone-200 px-2 py-3">
        <CombinationQaFilterRow counts={counts} onFilterChange={onFilterChange} />

        <p className="text-sm text-stone-600">
          {m.combinations_primary_filter_hint({ count: String(filteredPrimarySigns.length) })}
        </p>

        <ul className="max-h-72 space-y-1 overflow-y-auto">
          {filteredPrimarySigns.map((sign) => {
            const isSelected = sign.osmValuePart === primaryOsmValuePart
            const combinationCount = combinationCountByOsm.get(sign.osmValuePart) ?? 0

            return (
              <li key={sign.osmValuePart}>
                <button
                  type="button"
                  aria-current={isSelected ? 'true' : undefined}
                  onClick={() => onPrimarySelect(sign.osmValuePart)}
                  className={clsx(
                    'flex w-full cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-2 text-left text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-300',
                    isSelected ? 'bg-stone-900 text-stone-50' : 'text-stone-700 hover:bg-stone-100',
                  )}
                >
                  <span lang={catalogueLang} className="min-w-0 flex-1">
                    <code className="block font-medium">{sign.osmValuePart}</code>
                    <span
                      className={clsx(
                        'block truncate',
                        isSelected ? 'text-stone-300' : 'text-stone-500',
                      )}
                    >
                      {sign.descriptiveName}
                    </span>
                  </span>
                  <span
                    className={clsx(
                      'shrink-0 text-xs',
                      isSelected ? 'text-stone-400' : 'text-stone-500',
                    )}
                  >
                    {m.combinations_combination_count({ count: String(combinationCount) })}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        {filteredPrimarySigns.length === 0 && (
          <p className="text-sm text-stone-600">{m.combinations_no_match()}</p>
        )}
      </div>
    </details>
  )
}
