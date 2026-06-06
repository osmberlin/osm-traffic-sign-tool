import type { CombinationRow } from '@app/app/(signs)/_components/PageCheckSignCombinations/combinationQaFilters'
import {
  feedbackCommentPlaceholder,
  type CombinationFeedbackState,
} from '@app/app/(signs)/_components/PageCheckSignCombinations/combinationQaTaskFormat'
import { ContentPageWorkflowStepLabel } from '@app/app/_components/layout/ContentPageWorkflowStep'
import {
  ContentTable,
  ContentTableBody,
  ContentTableCell,
  ContentTableHead,
  ContentTableHeader,
  ContentTableRow,
} from '@app/app/_components/layout/ContentTable'
import { SignTagRecommendationsPanel } from '@app/app/(signs)/_components/SignTagRecommendations/SignTagRecommendationsPanel'
import { ParaglideMessage } from '@inlang/paraglide-js-react'
import * as m from '@app/paraglide/messages'
import { catalogueHtmlLang } from '@app/src/features/routing/lang'
import type { SignStateType } from '@osm-traffic-signs/converter'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { PackageSvgTrafficSign } from '../PackageSvgTrafficSign'
import { useCountryPrefix } from '../store/CountryPrefixContext'

type Props = {
  rows: CombinationRow[]
  feedback: Map<string, CombinationFeedbackState>
  onFeedbackChange: Dispatch<SetStateAction<Map<string, CombinationFeedbackState>>>
}

type FeedbackKey = 'OK' | 'NOTOK' | 'INVALID'

const feedbackMarkup = {
  strong: ({ children }: { children: ReactNode }) => <strong>{children}</strong>,
}

const feedbackOptions: ReadonlyArray<{ key: FeedbackKey; label: () => ReactNode }> = [
  { key: 'OK', label: () => m.combinations_feedback_ok() },
  {
    key: 'NOTOK',
    label: () => (
      <ParaglideMessage message={m.combinations_feedback_not_ok} markup={feedbackMarkup} />
    ),
  },
  { key: 'INVALID', label: () => m.combinations_feedback_invalid() },
]

const radioClassName =
  'relative size-4 shrink-0 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden'

export const CheckCombinationTable = ({ rows, feedback, onFeedbackChange }: Props) => {
  const { countryPrefix } = useCountryPrefix()
  const catalogueLangAttr = catalogueHtmlLang(countryPrefix)

  const handleStatusChange = (tagValue: string, status: FeedbackKey) => {
    onFeedbackChange((prev) => {
      const next = new Map(prev)
      if (status === 'OK') {
        next.set(tagValue, { status, comment: undefined })
      } else {
        const current = next.get(tagValue)
        next.set(tagValue, { status, comment: current?.comment })
      }
      return next
    })
  }

  const handleCommentChange = (tagValue: string, comment: string) => {
    onFeedbackChange((prev) => {
      const next = new Map(prev)
      const current = next.get(tagValue)
      if (current && current.status !== 'OK') {
        next.set(tagValue, { ...current, comment })
      }
      return next
    })
  }

  return (
    <ContentTable>
      <ContentTableHead>
        <ContentTableRow>
          <ContentTableHeader className="w-[22%]">
            {m.combinations_table_combination()}
          </ContentTableHeader>
          <ContentTableHeader className="w-[13%]">
            {m.combinations_table_image()}
          </ContentTableHeader>
          <ContentTableHeader>{m.page_tagging_qa_col_recommendations()}</ContentTableHeader>
          <ContentTableHeader>
            <ContentPageWorkflowStepLabel step={2}>
              {m.combinations_table_check()}
            </ContentPageWorkflowStepLabel>
          </ContentTableHeader>
        </ContentTableRow>
      </ContentTableHead>
      <ContentTableBody>
        {rows.map((row) => {
          const { signs, tagValue, allowFeedback, blockReason } = row
          const recognizedSigns = signs.filter(
            (sign): sign is SignStateType & { recodgnizedSign: true } => sign.recodgnizedSign,
          )
          const currentData = feedback.get(tagValue)

          return (
            <ContentTableRow key={tagValue} className="[&>td]:py-5 [&>th]:py-5">
              <ContentTableHeader className="space-y-3">
                <code lang={catalogueLangAttr}>{tagValue}</code>
              </ContentTableHeader>
              <ContentTableCell>
                {recognizedSigns.map((sign) => (
                  <PackageSvgTrafficSign
                    key={sign.osmValuePart}
                    sign={sign}
                    className="h-auto max-h-13 w-full max-w-13 object-contain"
                  />
                ))}
              </ContentTableCell>
              <ContentTableCell>
                <SignTagRecommendationsPanel value={tagValue} />
              </ContentTableCell>
              <ContentTableCell className="text-sm leading-snug">
                {allowFeedback && (
                  <>
                    <ul className="flex flex-col gap-0.5 leading-tight">
                      {feedbackOptions.map((option) => {
                        const id = `${tagValue}-${option.key}`

                        return (
                          <li key={option.key}>
                            <label
                              htmlFor={id}
                              className="flex cursor-pointer items-center gap-2 py-0.5"
                            >
                              <input
                                id={id}
                                onChange={() => handleStatusChange(tagValue, option.key)}
                                name={`feedback-${tagValue}`}
                                type="radio"
                                checked={currentData?.status === option.key}
                                className={radioClassName}
                              />
                              <span className="text-sm leading-tight">{option.label()}</span>
                            </label>
                          </li>
                        )
                      })}
                    </ul>
                    {currentData?.status && currentData.status !== 'OK' && (
                      <textarea
                        placeholder={feedbackCommentPlaceholder(currentData.status)}
                        value={currentData.comment || ''}
                        onChange={(event) => handleCommentChange(tagValue, event.target.value)}
                        rows={3}
                        className="mt-3 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                      />
                    )}
                  </>
                )}
                {blockReason === 'no_modifiers' && (
                  <p>
                    <small>Sign cannot be combined with modifier signs</small>
                  </p>
                )}
                {blockReason === 'incompatible_modifier' && (
                  <p>
                    <small>Sign cannot be combined with this modifier sign</small>
                  </p>
                )}
              </ContentTableCell>
            </ContentTableRow>
          )
        })}
      </ContentTableBody>
    </ContentTable>
  )
}
