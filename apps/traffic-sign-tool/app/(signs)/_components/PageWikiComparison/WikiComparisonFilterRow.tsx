import {
  type WikiComparisonStatusFilter,
  wikiComparisonStatusFilters,
} from '@app/app/(signs)/_components/PageWikiComparison/wikiComparisonFilters'
import * as m from '@app/paraglide/messages'
import { clsx } from 'clsx'

const statusFilterLabels: Record<WikiComparisonStatusFilter, () => string> = {
  all: m.page_wiki_qa_filter_all,
  missing: m.page_wiki_qa_filter_missing,
  matched: m.page_wiki_qa_filter_matched,
  missing_svg: m.page_wiki_qa_filter_missing_svg,
}

type Props = {
  counts: Record<WikiComparisonStatusFilter, number>
  statusFilter: WikiComparisonStatusFilter
  onStatusFilterChange: (filter: WikiComparisonStatusFilter) => void
}

export const WikiComparisonFilterRow = ({ counts, statusFilter, onStatusFilterChange }: Props) => (
  <nav
    aria-label={m.page_wiki_qa_filter_nav_label()}
    className="w-full rounded-sm px-2 py-1.5 outline -outline-offset-1 outline-stone-500/50"
  >
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      {wikiComparisonStatusFilters.map((filter) => {
        const isActive = statusFilter === filter

        return (
          <button
            key={filter}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onStatusFilterChange(filter)}
            className={clsx(
              'inline-flex cursor-pointer items-center rounded-md px-2 py-1.5 text-left text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-300 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-800',
              isActive
                ? 'bg-stone-900 text-stone-50'
                : 'text-stone-400 hover:bg-stone-700/60 hover:text-stone-100',
            )}
          >
            {statusFilterLabels[filter]()} ({counts[filter]})
          </button>
        )
      })}
    </div>
  </nav>
)
