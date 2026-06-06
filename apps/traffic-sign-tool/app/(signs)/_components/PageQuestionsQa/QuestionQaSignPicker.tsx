import { QuestionQaFilterRow } from '@app/app/(signs)/_components/PageQuestionsQa/QuestionQaFilterRow'
import { useCatalogueHtmlLang } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import * as m from '@app/paraglide/messages'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import type { QuestionsQaCounts } from '@osm-traffic-signs/converter'
import { signHasQuestions, type SignType } from '@osm-traffic-signs/converter'
import clsx from 'clsx'

type Props = {
  filteredSigns: SignType[]
  counts: QuestionsQaCounts
  primaryOsmValuePart?: string
  onPrimarySelect: (osmValuePart: string) => void
  nested?: boolean
}

export const QuestionQaSignPicker = ({
  filteredSigns,
  counts,
  primaryOsmValuePart,
  onPrimarySelect,
  nested = false,
}: Props) => {
  const catalogueLang = useCatalogueHtmlLang()
  const selectedSign = filteredSigns.find((sign) => sign.osmValuePart === primaryOsmValuePart)
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
              {m.questions_qa_select_sign()}:{' '}
              <span lang={catalogueLang}>
                {selectedSign.osmValuePart} – {selectedSign.descriptiveName}
              </span>
            </>
          ) : (
            m.questions_qa_select_sign()
          )}
        </span>
        {selectedSign && (
          <span className="text-stone-500">
            {m.questions_qa_select_sign_matching({ count: String(filteredSigns.length) })}
          </span>
        )}
      </summary>

      <div className="space-y-3 border-t border-stone-200 px-2 py-3">
        <QuestionQaFilterRow counts={counts} />

        <p className="text-sm text-stone-600">
          {filteredSigns.length} sign{filteredSigns.length === 1 ? '' : 's'} match this filter.
          Choose one to review questions and answers.
        </p>

        <ul className="max-h-72 space-y-1 overflow-y-auto">
          {filteredSigns.map((sign) => {
            const isSelected = sign.osmValuePart === primaryOsmValuePart
            const questionCount = signHasQuestions(sign) ? (sign.questions?.length ?? 0) : 0

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
                    {m.questions_qa_question_count({ count: String(questionCount) })}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        {filteredSigns.length === 0 && (
          <p className="text-sm text-stone-600">{m.questions_qa_no_match()}</p>
        )}
      </div>
    </details>
  )
}
