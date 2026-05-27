'use client'
import { useParamCombinationQa } from '@app/app/(signs)/_components/store/useParamCombinationQa.search'
import type { CombinationQaFilter } from '@app/src/features/searchParams/deSearch'
import { clsx } from 'clsx'
import type { CombinationQaCounts } from './combinationQaFilters'

const combinationFilterOptions: {
  filter: CombinationQaFilter
  label: string
}[] = [
  { filter: 'actionable', label: 'With reviewable combinations' },
  { filter: 'blocked', label: 'With blocked combinations' },
  { filter: 'all', label: 'All primary signs' },
]

type Props = {
  counts: CombinationQaCounts
  onFilterChange?: (filter: CombinationQaFilter) => void
}

export const CombinationQaFilterRow = ({ counts, onFilterChange }: Props) => {
  const { combinationFilter, setCombinationFilter } = useParamCombinationQa()

  const handleFilterClick = (filter: CombinationQaFilter) => {
    if (onFilterChange) {
      onFilterChange(filter)
      return
    }
    setCombinationFilter(filter)
  }

  return (
    <nav
      aria-label="Filter primary signs"
      className="w-full rounded-sm px-2 py-1.5 outline -outline-offset-1 outline-stone-500/50"
    >
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {combinationFilterOptions.map(({ filter, label }) => {
          const isActive = combinationFilter === filter
          const count = counts[filter]

          return (
            <button
              key={filter}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => handleFilterClick(filter)}
              className={clsx(
                'inline-flex cursor-pointer items-center rounded-md px-2 py-1.5 text-left text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-300 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-800',
                isActive
                  ? 'bg-stone-900 text-stone-50'
                  : 'text-stone-400 hover:bg-stone-700/60 hover:text-stone-100',
              )}
            >
              {label} ({count})
            </button>
          )
        })}
      </div>
    </nav>
  )
}
