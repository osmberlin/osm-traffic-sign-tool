import type { CombinationRow } from '@app/app/(signs)/_components/PageCheckSignCombinations/combinationQaFilters'
import {
  feedbackCommentPlaceholder,
  type CombinationFeedbackState,
} from '@app/app/(signs)/_components/PageCheckSignCombinations/combinationQaTaskFormat'
import {
  ContentTable,
  ContentTableBody,
  ContentTableCell,
  ContentTableHead,
  ContentTableHeader,
  ContentTableRow,
} from '@app/app/_components/layout/ContentTable'
import { catalogueHtmlLang } from '@app/src/features/routing/lang'
import { SignStateType, signsToTags } from '@osm-traffic-signs/converter'
import clsx from 'clsx'
import type { Dispatch, SetStateAction } from 'react'
import { PackageSvgTrafficSign } from '../PackageSvgTrafficSign'
import { TagList } from '../PageApp/results/ResultTagRecommendations/TagList'
import { useCountryPrefix } from '../store/CountryPrefixContext'

type Props = {
  rows: CombinationRow[]
  feedback: Map<string, CombinationFeedbackState>
  onFeedbackChange: Dispatch<SetStateAction<Map<string, CombinationFeedbackState>>>
}

const feedbackOptions = [
  { key: 'OK', label: 'OK' },
  { key: 'NOTOK', label: 'Not OK' },
  { key: 'INVALID', label: 'Invalid combination' },
] as const

type FeedbackKey = (typeof feedbackOptions)[number]['key']

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
          <ContentTableHeader className="w-[22%]">Combination</ContentTableHeader>
          <ContentTableHeader className="w-[10%]">Image</ContentTableHeader>
          <ContentTableHeader className="w-[28%]">Tags</ContentTableHeader>
          <ContentTableHeader>Check</ContentTableHeader>
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
            <ContentTableRow key={tagValue}>
              <ContentTableHeader className="space-y-3">
                <code lang={catalogueLangAttr}>{tagValue}</code>
              </ContentTableHeader>
              <ContentTableCell>
                {recognizedSigns.map((sign) => (
                  <PackageSvgTrafficSign
                    key={sign.osmValuePart}
                    sign={sign}
                    className="h-auto max-h-10 w-full max-w-10"
                  />
                ))}
              </ContentTableCell>
              <ContentTableCell
                className={clsx(
                  allowFeedback ? '' : 'text-xs leading-snug text-gray-500 hover:text-gray-700',
                )}
              >
                <TagList tags={signsToTags(signs, countryPrefix, 'way')} />
              </ContentTableCell>
              <ContentTableCell className="text-sm leading-snug">
                {allowFeedback && (
                  <>
                    <div className="flex flex-wrap gap-x-4 gap-y-4">
                      {feedbackOptions.map((option) => {
                        const id = `${tagValue}-${option.key}`

                        return (
                          <div key={option.key} className="flex items-center">
                            <input
                              id={id}
                              onChange={() => handleStatusChange(tagValue, option.key)}
                              name={`feedback-${tagValue}`}
                              type="radio"
                              checked={currentData?.status === option.key}
                              className={radioClassName}
                            />
                            <label htmlFor={id} className="ml-2 block">
                              {option.label}
                            </label>
                          </div>
                        )
                      })}
                    </div>
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
