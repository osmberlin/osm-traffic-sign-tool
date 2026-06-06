import { useParamAnswers } from '@app/app/(signs)/_components/store/useParamAnswers.search'
import { useParamSigns } from '@app/app/(signs)/_components/store/useParamSigns.search'
import { MoreLinkButton } from '@app/app/_components/links/MoreLinkButton'
import { MaturityLinkBadge } from '@app/app/_components/MaturityLabel'
import * as m from '@app/paraglide/messages'
import {
  formatQuestionAnswerTags,
  getQuestionAnswerShortLabel,
  getQuestionPromptShortLabel,
} from '@app/src/features/i18n/questionLabels'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import {
  collectSignQuestionGroups,
  namedTrafficSignValues,
  QUESTION_NIL_ANSWER_ID,
  resolveGroupedEffectiveAnswerId,
  type SignQuestion,
} from '@osm-traffic-signs/converter'
import clsx from 'clsx'
import { useState } from 'react'
import { useCountryPrefix } from '../../store/CountryPrefixContext'

const radioClassName =
  'relative mt-0.5 size-4 shrink-0 appearance-none rounded-full border border-stone-500 bg-stone-900 before:absolute before:inset-1 before:rounded-full before:bg-stone-900 not-checked:before:hidden checked:border-amber-500 checked:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500'

const formatSignKey = (countryPrefix: string, osmValuePart: string) =>
  namedTrafficSignValues.includes(osmValuePart) ? osmValuePart : `${countryPrefix}:${osmValuePart}`

const formatQuestionsForSigns = (countryPrefix: string, signOsmValueParts: readonly string[]) => {
  const formattedSignKeys = signOsmValueParts.map((part) => formatSignKey(countryPrefix, part))

  return signOsmValueParts.length === 1
    ? m.questions_for_sign({ signKey: formattedSignKeys[0]! })
    : m.questions_for_signs({ signKeys: formattedSignKeys.join(', ') })
}

const QuestionChoices = ({
  signOsmValueParts,
  question,
  effectiveAnswerId,
}: {
  signOsmValueParts: readonly string[]
  question: SignQuestion
  effectiveAnswerId: string
}) => {
  const { updateAnswer } = useParamAnswers()
  const groupName = `result-${question.questionId}-${signOsmValueParts.join('-')}`

  return (
    <fieldset
      aria-label={getQuestionPromptShortLabel(question.questionI18nKey)}
      className="min-w-0"
    >
      <legend className="sr-only">{getQuestionPromptShortLabel(question.questionI18nKey)}</legend>
      {question.answers.map((answer, index) => {
        const id = `${groupName}-${answer.answerId}`
        const checked = effectiveAnswerId === answer.answerId
        const tagCode = formatQuestionAnswerTags(answer)

        return (
          <label
            key={answer.answerId}
            htmlFor={id}
            className={clsx(
              'flex w-full cursor-pointer px-3 py-3 transition-colors hover:bg-stone-800/40',
              index > 0 && 'border-t border-stone-500/50',
              checked && 'bg-stone-800/60 hover:bg-stone-800/60',
            )}
          >
            <input
              id={id}
              type="radio"
              name={groupName}
              checked={checked}
              onChange={() =>
                updateAnswer([...signOsmValueParts], question.questionId, answer.answerId)
              }
              className={radioClassName}
            />
            <span className="ml-3 flex min-w-0 flex-1 flex-col">
              <span className="text-sm font-medium text-stone-100">
                {getQuestionAnswerShortLabel(answer.answerI18nKey)}
              </span>
              {(tagCode || answer.referenceUrl) && (
                <span className="mt-0.5 flex items-center justify-between gap-3">
                  {tagCode ? (
                    <code className="min-w-0 text-xs text-stone-400">{tagCode}</code>
                  ) : (
                    <span />
                  )}
                  {answer.referenceUrl && (
                    <MoreLinkButton
                      href={answer.referenceUrl}
                      onClick={(event) => event.stopPropagation()}
                    />
                  )}
                </span>
              )}
              {!tagCode && !answer.referenceUrl && answer.answerId === QUESTION_NIL_ANSWER_ID && (
                <span className="mt-0.5 text-xs text-stone-400">
                  {m.question_answer_nil_hint()}
                </span>
              )}
            </span>
          </label>
        )
      })}
    </fieldset>
  )
}

const QuestionAccordionItem = ({
  isOpen,
  onOpenChange,
  signOsmValueParts,
  question,
  effectiveAnswerId,
  shortTitle,
  shortAnswer,
  countryPrefix,
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  signOsmValueParts: readonly string[]
  question: SignQuestion
  effectiveAnswerId: string
  shortTitle: string
  shortAnswer: string
  countryPrefix: string
}) => (
  <details
    open={isOpen}
    onToggle={(event) => onOpenChange(event.currentTarget.open)}
    className="group border-b border-stone-500/50 last:border-b-0"
  >
    <summary className="cursor-pointer list-none px-3 py-2 transition-colors group-open:bg-stone-700/60 group-open:pb-0 group-open:text-stone-100 hover:bg-stone-700/60 hover:text-stone-100 [&::-webkit-details-marker]:hidden">
      <span className="block text-sm text-stone-100">
        {shortTitle}:{' '}
        <span className={clsx(effectiveAnswerId === QUESTION_NIL_ANSWER_ID && 'text-amber-500')}>
          {shortAnswer}
        </span>
      </span>
      <span className="mt-0.5 hidden pb-2 text-xs text-stone-400 group-open:block">
        {formatQuestionsForSigns(countryPrefix, signOsmValueParts)}
      </span>
    </summary>

    <div className="border-t border-stone-500/50 bg-stone-900/40">
      <QuestionChoices
        signOsmValueParts={signOsmValueParts}
        question={question}
        effectiveAnswerId={effectiveAnswerId}
      />
    </div>
  </details>
)

export const ResultQuestions = () => {
  const lang = useCurrentLang()
  const { countryPrefix } = useCountryPrefix()
  const { paramSigns } = useParamSigns()
  const { paramAnswers } = useParamAnswers()
  const [openKey, setOpenKey] = useState<string | null>(null)

  const questionGroups = collectSignQuestionGroups(paramSigns)

  if (questionGroups.length === 0) {
    return null
  }

  return (
    <section className="mb-4 md:mb-6">
      <h2 className="mb-2.5 flex flex-wrap items-center gap-2 text-lg font-light uppercase md:mb-3">
        {m.questions_heading()}
        <MaturityLinkBadge maturity="beta" lang={lang} tooltip={m.questions_beta_tooltip()} />
      </h2>
      <div className="overflow-hidden rounded-sm border border-stone-500/50">
        {questionGroups.map(({ equivalenceKey, question, signOsmValueParts }) => {
          const effectiveAnswerId = resolveGroupedEffectiveAnswerId(
            question,
            paramAnswers,
            signOsmValueParts,
          )
          const effectiveAnswer = question.answers.find(
            (answer) => answer.answerId === effectiveAnswerId,
          )
          const shortTitle = getQuestionPromptShortLabel(question.questionI18nKey)
          const nilAnswer = question.answers.find(
            (answer) => answer.answerId === QUESTION_NIL_ANSWER_ID,
          )
          const shortAnswer = getQuestionAnswerShortLabel(
            (effectiveAnswer ?? nilAnswer)?.answerI18nKey ?? `${question.questionId}.answer.nil`,
          )

          return (
            <QuestionAccordionItem
              key={equivalenceKey}
              isOpen={openKey === equivalenceKey}
              onOpenChange={(open) => setOpenKey(open ? equivalenceKey : null)}
              signOsmValueParts={signOsmValueParts}
              question={question}
              effectiveAnswerId={effectiveAnswerId}
              shortTitle={shortTitle}
              shortAnswer={shortAnswer}
              countryPrefix={countryPrefix}
            />
          )
        })}
      </div>
    </section>
  )
}
