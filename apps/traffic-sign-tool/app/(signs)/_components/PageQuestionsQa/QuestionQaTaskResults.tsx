import {
  buildGithubIssueUrl,
  formatQuestionsQaTaskResults,
  type QuestionTaskEntry,
} from '@app/app/(signs)/_components/PageQuestionsQa/questionsQaTaskFormat'
import { contentPreClass } from '@app/app/_components/layout/ContentTable'
import { buttonStyle } from '@app/app/_components/links/buttonStyles'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import * as m from '@app/paraglide/messages'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'
import { useRef, useState } from 'react'

type Props = {
  entries: QuestionTaskEntry[]
}

export const QuestionQaTaskResults = ({ entries }: Props) => {
  const [copied, setCopied] = useState(false)
  const copyFeedbackGenerationRef = useRef(0)
  const resultText = formatQuestionsQaTaskResults(entries)
  const issueUrl = entries.length > 0 ? buildGithubIssueUrl(entries) : undefined
  const hasResults = entries.length > 0

  const handleCopy = async () => {
    if (!resultText) {
      return
    }

    await navigator.clipboard.writeText(resultText)
    const generation = ++copyFeedbackGenerationRef.current
    setCopied(true)

    window.setTimeout(() => {
      if (copyFeedbackGenerationRef.current === generation) {
        setCopied(false)
      }
    }, 2000)
  }

  return (
    <details
      className={clsx(
        'group mt-6 w-full rounded-sm outline -outline-offset-1 transition-colors',
        hasResults ? 'bg-stone-900 shadow-sm outline-stone-900' : 'outline-stone-500/50',
      )}
    >
      <summary
        className={clsx(
          'flex cursor-pointer list-none items-center gap-2 px-2 py-1.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-300 focus-visible:ring-offset-2',
          hasResults
            ? 'text-stone-50 focus-visible:ring-offset-stone-900'
            : 'text-stone-700 focus-visible:ring-offset-stone-300',
          '[&::-webkit-details-marker]:hidden',
        )}
      >
        <ChevronRightIcon
          className={clsx(
            'size-4 shrink-0 transition-transform group-open:rotate-90',
            hasResults ? 'text-stone-400' : 'text-stone-500',
          )}
        />
        <span>{m.qa_task_results_summary({ count: String(entries.length) })}</span>
      </summary>

      <div className={clsx('space-y-4 px-2 pb-3', hasResults && 'border-t border-stone-700 pt-3')}>
        {!hasResults ? (
          <p className="text-sm text-stone-600">{m.qa_task_results_empty()}</p>
        ) : (
          <>
            <div className="flex flex-wrap gap-3">
              <ExternalLink href={issueUrl} className={buttonStyle} blank>
                {m.questions_qa_open_issue()}
              </ExternalLink>
              <button type="button" className={buttonStyle} onClick={() => void handleCopy()}>
                {copied ? m.qa_copied() : m.qa_copy_clipboard()}
              </button>
            </div>

            <pre
              className={clsx(
                contentPreClass,
                'max-h-96 overflow-auto rounded-md border border-stone-600/40 bg-stone-100 p-4 text-stone-900',
              )}
            >
              {resultText}
            </pre>
          </>
        )}
      </div>
    </details>
  )
}
