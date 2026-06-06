import type {
  CombinationBlockReason,
  CombinationRow,
} from '@app/app/(signs)/_components/PageCheckSignCombinations/combinationQaFilters'
import {
  feedbackCommentPlaceholder,
  getCombinationQaConfirmationDate,
  type CombinationFeedbackState,
} from '@app/app/(signs)/_components/PageCheckSignCombinations/combinationQaTaskFormat'
import { SignTagRecommendationsPanel } from '@app/app/(signs)/_components/SignTagRecommendations/SignTagRecommendationsPanel'
import { ContentPageWorkflowStepLabel } from '@app/app/_components/layout/ContentPageWorkflowStep'
import {
  ContentTable,
  ContentTableBody,
  ContentTableCell,
  ContentTableHead,
  ContentTableHeader,
  ContentTableRow,
} from '@app/app/_components/layout/ContentTable'
import * as m from '@app/paraglide/messages'
import { getLocale } from '@app/paraglide/runtime'
import { catalogueHtmlLang } from '@app/src/features/routing/lang'
import { ParaglideMessage } from '@inlang/paraglide-js-react'
import { isSignSvgUnavailable, type SignStateType } from '@osm-traffic-signs/converter'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { MissingSvgNotice } from '../MissingSvgNotice'
import { PackageSvgTrafficSign } from '../PackageSvgTrafficSign'
import { useCountryPrefix } from '../store/CountryPrefixContext'

type Props = {
  rows: CombinationRow[]
  feedback: Map<string, CombinationFeedbackState>
  onFeedbackChange: Dispatch<SetStateAction<Map<string, CombinationFeedbackState>>>
}

type FeedbackKey = 'OK' | 'NOTOK' | 'INVALID'

const feedbackMarkup = {
  strong: ({ children }: { children?: ReactNode }) => <strong>{children}</strong>,
}

const formatConfirmationDateLabel = (isoDate: string, locale: string): string => {
  const date = new Date(`${isoDate}T12:00:00`)
  if (Number.isNaN(date.getTime())) {
    return isoDate
  }

  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(date)
}

const getOkConfirmationDateIso = (
  currentData: CombinationFeedbackState | undefined,
  lastConfirmedAt: string | undefined,
): string | undefined => {
  if (currentData?.status === 'OK') {
    return currentData.confirmedAt ?? getCombinationQaConfirmationDate()
  }

  return lastConfirmedAt
}

const isFeedbackOptionChecked = (
  optionKey: FeedbackKey,
  currentData: CombinationFeedbackState | undefined,
  lastConfirmedAt: string | undefined,
  blockReason: CombinationBlockReason | undefined,
): boolean => {
  if (currentData) {
    return currentData.status === optionKey
  }

  if (optionKey === 'OK' && lastConfirmedAt) {
    return true
  }

  return optionKey === 'INVALID' && blockReason === 'incompatible_modifier'
}

const showsFeedbackOptions = (
  allowFeedback: boolean,
  blockReason: CombinationBlockReason | undefined,
) => allowFeedback || blockReason === 'incompatible_modifier'

const radioClassName =
  'relative size-4 shrink-0 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden'

export const CheckCombinationTable = ({ rows, feedback, onFeedbackChange }: Props) => {
  const { countryPrefix } = useCountryPrefix()
  const catalogueLangAttr = catalogueHtmlLang(countryPrefix)
  const locale = getLocale()

  const handleStatusChange = (tagValue: string, status: FeedbackKey) => {
    onFeedbackChange((prev) => {
      const next = new Map(prev)
      if (status === 'OK') {
        next.set(tagValue, {
          status,
          confirmedAt: getCombinationQaConfirmationDate(),
          comment: undefined,
        })
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

  const renderFeedbackLabel = (
    optionKey: FeedbackKey,
    okConfirmationDateIso: string | undefined,
    blockReason: CombinationBlockReason | undefined,
  ): ReactNode => {
    if (optionKey === 'OK') {
      const formattedDate = okConfirmationDateIso
        ? formatConfirmationDateLabel(okConfirmationDateIso, locale)
        : undefined

      return (
        <span className="flex flex-col">
          <span>{m.combinations_feedback_ok()}</span>
          {formattedDate ? (
            <span className="text-xs font-normal text-stone-500">
              {m.combinations_feedback_ok_last_confirmed({ date: formattedDate })}
            </span>
          ) : null}
        </span>
      )
    }

    if (optionKey === 'NOTOK') {
      return <ParaglideMessage message={m.combinations_feedback_not_ok} markup={feedbackMarkup} />
    }

    return (
      <span className="flex flex-col">
        <span>{m.combinations_feedback_invalid()}</span>
        {blockReason === 'incompatible_modifier' ? (
          <span className="text-xs font-normal text-stone-500">
            {m.combinations_feedback_invalid_in_data()}
          </span>
        ) : null}
      </span>
    )
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
          const { signs, tagValue, allowFeedback, blockReason, lastConfirmedAt } = row
          const recognizedSigns = signs.filter(
            (sign): sign is SignStateType & { recodgnizedSign: true } => sign.recodgnizedSign,
          )
          const currentData = feedback.get(tagValue)
          const okConfirmationDateIso = getOkConfirmationDateIso(currentData, lastConfirmedAt)

          return (
            <ContentTableRow key={tagValue} className="[&>td]:py-5 [&>th]:py-5">
              <ContentTableHeader className="space-y-3">
                <code lang={catalogueLangAttr}>{tagValue}</code>
              </ContentTableHeader>
              <ContentTableCell>
                {recognizedSigns.map((sign) => (
                  <div key={sign.osmValuePart} className="space-y-1">
                    <PackageSvgTrafficSign
                      sign={sign}
                      className="h-auto max-h-13 w-full max-w-13 object-contain"
                    />
                    {isSignSvgUnavailable(countryPrefix, sign) ? (
                      <MissingSvgNotice sign={sign} variant="compact" />
                    ) : null}
                  </div>
                ))}
              </ContentTableCell>
              <ContentTableCell>
                <SignTagRecommendationsPanel value={tagValue} />
              </ContentTableCell>
              <ContentTableCell className="text-sm leading-snug">
                {showsFeedbackOptions(allowFeedback, blockReason) && (
                  <>
                    <ul className="flex flex-col gap-0.5 leading-tight">
                      {(['OK', 'NOTOK', 'INVALID'] as const).map((optionKey) => {
                        const id = `${tagValue}-${optionKey}`

                        return (
                          <li key={optionKey}>
                            <label
                              htmlFor={id}
                              className="flex cursor-pointer items-center gap-2 py-0.5"
                            >
                              <input
                                id={id}
                                onChange={() => handleStatusChange(tagValue, optionKey)}
                                name={`feedback-${tagValue}`}
                                type="radio"
                                checked={isFeedbackOptionChecked(
                                  optionKey,
                                  currentData,
                                  lastConfirmedAt,
                                  blockReason,
                                )}
                                className={radioClassName}
                              />
                              <span className="text-sm leading-tight">
                                {renderFeedbackLabel(
                                  optionKey,
                                  optionKey === 'OK' ? okConfirmationDateIso : undefined,
                                  blockReason,
                                )}
                              </span>
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
              </ContentTableCell>
            </ContentTableRow>
          )
        })}
      </ContentTableBody>
    </ContentTable>
  )
}
