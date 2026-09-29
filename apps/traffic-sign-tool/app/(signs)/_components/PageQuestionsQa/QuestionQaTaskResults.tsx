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
import { clsx } from 'clsx'
import { useState } from 'react'

type Props = {
  entries: QuestionTaskEntry[]
}

export const QuestionQaTaskResults = ({ entries }: Props) => {
  const countryPrefix = useCurrentLang()
  const generatedIssueBody = formatQuestionsQaTaskResults(entries, countryPrefix)
  const [edit, setEdit] = useState({ source: generatedIssueBody, body: generatedIssueBody })
  // Manual edits apply only to the text they were made on; new results reset them.
  const issueBody = edit.source === generatedIssueBody ? edit.body : generatedIssueBody
  const hasResults = entries.length > 0
  const issueUrl = hasResults ? buildGithubIssueUrl(entries, countryPrefix, issueBody) : undefined

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
          <textarea
            value={issueBody}
            onChange={(event) => setEdit({ source: generatedIssueBody, body: event.target.value })}
            rows={16}
            spellCheck={false}
            aria-label={m.questions_qa_show_issue_description()}
            className={clsx(
              contentPreClass,
              'mt-3 block max-h-96 min-h-48 w-full resize-y overflow-auto rounded-md border border-stone-600/40 bg-stone-100 p-4 text-stone-900',
              'focus:outline-2 focus:-outline-offset-2 focus:outline-stone-400',
            )}
          />
        </details>
      ) : null}
    </section>
  )
}
