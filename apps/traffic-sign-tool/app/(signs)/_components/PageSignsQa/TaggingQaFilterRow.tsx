import { useParamTaggingQa } from '@app/app/(signs)/_components/store/useParamTaggingQa.search'
import * as m from '@app/paraglide/messages'
import type {
  TaggingSuggestionsQaCounts,
  TaggingSuggestionsQaFilter,
} from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'

const qaFilterOptions: TaggingSuggestionsQaFilter[] = ['all', 'with', 'missing', 'explicit_none']

const getQaFilterLabel = (filter: TaggingSuggestionsQaFilter): string => {
  const labels: Record<TaggingSuggestionsQaFilter, () => string> = {
    all: m.qa_filter_all,
    with: m.qa_filter_with,
    missing: m.qa_filter_missing,
    explicit_none: m.qa_filter_explicit_none,
  }
  return labels[filter]()
}

type Props = {
  counts: TaggingSuggestionsQaCounts
}

export const TaggingQaFilterRow = ({ counts }: Props) => {
  const { qaFilter, setQaFilter } = useParamTaggingQa()

  return (
    <nav
      aria-label={m.qa_filter_nav_label()}
      className="w-full rounded-sm px-2 py-1.5 outline -outline-offset-1 outline-stone-500/50"
    >
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {qaFilterOptions.map((filter) => {
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
              {getQaFilterLabel(filter)} ({count})
            </button>
          )
        })}
      </div>
    </nav>
  )
}
