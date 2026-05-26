'use client'
import { useParamTaggingQa } from '@app/app/(signs)/_components/store/useParamTaggingQa.search'
import type { TaggingSuggestionsQaCounts, TaggingSuggestionsQaFilter } from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'

const qaFilterOptions: {
  filter: TaggingSuggestionsQaFilter
  label: string
}[] = [
  { filter: 'all', label: 'All signs' },
  { filter: 'with', label: 'All signs with tagging suggestions' },
  { filter: 'missing', label: 'All signs with missing tagging suggestions' },
  {
    filter: 'explicit_none',
    label: 'All signs with explicit no tagging suggestions',
  },
]

type Props = {
  counts: TaggingSuggestionsQaCounts
}

export const TaggingQaFilterRow = ({ counts }: Props) => {
  const { qaFilter, setQaFilter } = useParamTaggingQa()

  return (
    <nav
      aria-label="Tagging suggestions QA"
      className="w-full rounded-sm px-2 py-1.5 outline -outline-offset-1 outline-stone-500/50"
    >
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {qaFilterOptions.map(({ filter, label }) => {
          const isActive = qaFilter === filter
          const count = counts[filter]

          return (
            <button
              key={filter}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setQaFilter(filter)}
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
