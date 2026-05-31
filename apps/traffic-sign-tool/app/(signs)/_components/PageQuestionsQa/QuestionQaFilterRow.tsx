import { useParamQuestionsQa } from '@app/app/(signs)/_components/store/useParamQuestionsQa.search'
import * as m from '@app/paraglide/messages'
import type { QuestionsQaCounts, QuestionsQaFilter } from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'

const qqaFilterOptions: QuestionsQaFilter[] = ['all', 'with', 'without']

const getQqaFilterLabel = (filter: QuestionsQaFilter): string => {
  const labels: Record<QuestionsQaFilter, () => string> = {
    all: m.questions_qa_filter_all,
    with: m.questions_qa_filter_with,
    without: m.questions_qa_filter_without,
  }
  return labels[filter]()
}

type Props = {
  counts: QuestionsQaCounts
}

export const QuestionQaFilterRow = ({ counts }: Props) => {
  const { qqaFilter, setQqaFilter } = useParamQuestionsQa()

  return (
    <nav
      aria-label={m.questions_qa_filter_nav_label()}
      className="w-full rounded-sm px-2 py-1.5 outline -outline-offset-1 outline-stone-500/50"
    >
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {qqaFilterOptions.map((filter) => {
          const isActive = qqaFilter === filter
          const count = counts[filter]

          return (
            <button
              key={filter}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setQqaFilter(filter)}
              className={clsx(
                'inline-flex cursor-pointer items-center rounded-md px-2 py-1.5 text-left text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-300 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-800',
                isActive
                  ? 'bg-stone-900 text-stone-50'
                  : 'text-stone-400 hover:bg-stone-700/60 hover:text-stone-100',
              )}
            >
              {getQqaFilterLabel(filter)} ({count})
            </button>
          )
        })}
      </div>
    </nav>
  )
}
