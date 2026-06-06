import {
  buildGithubIssueUrl,
  formatQuestionsQaTaskResults,
  type QuestionTaskEntry,
} from '@app/app/(signs)/_components/PageQuestionsQa/questionsQaTaskFormat'
import { ContentPageWorkflowStepBadge } from '@app/app/_components/layout/ContentPageWorkflowStep'
import { contentPreClass } from '@app/app/_components/layout/ContentTable'
import { buttonStyle } from '@app/app/_components/links/buttonStyles'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import * as m from '@app/paraglide/messages'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'

type Props = {
  entries: QuestionTaskEntry[]
}

export const QuestionQaTaskResults = ({ entries }: Props) => {
  const countryPrefix = useCurrentLang()
  const resultText = formatQuestionsQaTaskResults(entries, countryPrefix)
  const issueUrl = entries.length > 0 ? buildGithubIssueUrl(entries, countryPrefix) : undefined
  const hasResults = entries.length > 0

  return (
    <section
      className={clsx(
        'mt-6 w-full rounded-sm px-2 py-3 outline -outline-offset-1 transition-colors',
        hasResults ? 'bg-stone-900 shadow-sm outline-stone-900' : 'outline-stone-500/50',
      )}
    >
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <ContentPageWorkflowStepBadge step={3} variant="content" />
          {hasResults ? (
            <ExternalLink href={issueUrl} className={buttonStyle} blank>
              {m.questions_qa_open_issue()}
            </ExternalLink>
          ) : (
            <button type="button" className={buttonStyle} disabled>
              {m.questions_qa_open_issue()}
            </button>
          )}
        </div>
        <p className={clsx('pl-9 text-sm', hasResults ? 'text-stone-400' : 'text-stone-600')}>
          {m.questions_qa_issue_multi_sign_hint()}
        </p>
      </div>

      {hasResults ? (
        <details className="group mt-4 border-t border-stone-700 pt-3">
          <summary
            className={clsx(
              'flex cursor-pointer list-none items-center gap-2 py-1 text-sm font-medium text-stone-300',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-300 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900',
              '[&::-webkit-details-marker]:hidden',
            )}
          >
            <ChevronRightIcon className="size-4 shrink-0 text-stone-500 transition-transform group-open:rotate-90" />
            {m.questions_qa_show_issue_description()}
          </summary>
          <pre
            className={clsx(
              contentPreClass,
              'mt-3 max-h-96 overflow-auto rounded-md border border-stone-600/40 bg-stone-100 p-4 text-stone-900',
            )}
          >
            {resultText}
          </pre>
        </details>
      ) : null}
    </section>
  )
}
