'use client'
import { contentPreClass } from '@app/app/_components/layout/ContentTable'
import { buttonStyle } from '@app/app/_components/links/buttonStyles'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import {
  buildGithubIssueUrl,
  formatTaggingQaTaskResults,
  type SignTaskEntry,
} from '@app/app/(signs)/_components/PageSignsQa/taggingQaTaskFormat'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'
import { useState } from 'react'

type Props = {
  entries: SignTaskEntry[]
}

export const TaggingQaTaskResults = ({ entries }: Props) => {
  const [copyLabel, setCopyLabel] = useState('Copy to clipboard')
  const resultText = formatTaggingQaTaskResults(entries)
  const issueUrl = entries.length > 0 ? buildGithubIssueUrl(entries) : undefined
  const hasResults = entries.length > 0

  const handleCopy = async () => {
    if (!resultText) {
      return
    }

    await navigator.clipboard.writeText(resultText)
    setCopyLabel('Copied!')
    setTimeout(() => setCopyLabel('Copy to clipboard'), 2000)
  }

  return (
    <details
      className={clsx(
        'group mt-6 w-full rounded-sm outline -outline-offset-1 transition-colors',
        hasResults
          ? 'bg-stone-900 shadow-sm outline-stone-900'
          : 'outline-stone-500/50',
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
        <span>
          Task Results ({entries.length}) – Copy those into a new Github Issue so the catalogue can
          be updated
        </span>
      </summary>

      <div
        className={clsx(
          'space-y-4 px-2 pb-3',
          hasResults && 'border-t border-stone-700 pt-3',
        )}
      >
        {!hasResults ? (
          <p className="text-sm text-stone-600">
            Select a task for one or more signs in the table below.
          </p>
        ) : (
          <>
            <div className="flex flex-wrap gap-3">
              <ExternalLink href={issueUrl} className={buttonStyle} blank>
                Open Tagging QA issue (triggers Cursor)
              </ExternalLink>
              <button type="button" className={buttonStyle} onClick={() => void handleCopy()}>
                {copyLabel}
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
