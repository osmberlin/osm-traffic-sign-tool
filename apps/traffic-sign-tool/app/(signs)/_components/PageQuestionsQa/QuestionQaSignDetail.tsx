import { PackageSvgTrafficSign } from '@app/app/(signs)/_components/PackageSvgTrafficSign'
import {
  emptyQuestionTaskState,
  type QuestionTaskState,
} from '@app/app/(signs)/_components/PageQuestionsQa/questionsQaTaskFormat'
import { useCatalogueHtmlLang } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { ContentPageWorkflowStepLabel } from '@app/app/_components/layout/ContentPageWorkflowStep'
import {
  ContentTable,
  ContentTableBody,
  ContentTableCell,
  ContentTableHead,
  ContentTableHeader,
  ContentTableRow,
  contentPreClass,
} from '@app/app/_components/layout/ContentTable'
import * as m from '@app/paraglide/messages'
import {
  formatQuestionAnswerTags,
  getQuestionAnswerShortLabel,
  getQuestionPromptShortLabel,
} from '@app/src/features/i18n/questionLabels'
import {
  QUESTION_NIL_ANSWER_ID,
  type SignQuestion,
  type SignType,
} from '@osm-traffic-signs/converter'

type Props = {
  sign: SignType
  task: QuestionTaskState
  onTaskChange: (osmValuePart: string, task: QuestionTaskState) => void
}

const formatAnswerMeta = (question: SignQuestion, answer: SignQuestion['answers'][number]) => {
  const parts = [`answerId: ${answer.answerId}`]
  const tags = formatQuestionAnswerTags(answer)
  if (tags) {
    parts.push(tags)
  }
  if (answer.highwayValue) {
    parts.push(`highway=${answer.highwayValue}`)
  }
  if (answer.answerId === QUESTION_NIL_ANSWER_ID) {
    parts.push('no tags')
  }
  if (question.defaultAnswerId === answer.answerId) {
    parts.push('default')
  }
  return parts.join(' · ')
}

export const QuestionQaSignDetail = ({ sign, task, onTaskChange }: Props) => {
  const catalogueLang = useCatalogueHtmlLang()
  const questions = sign.questions ?? []

  const setNotes = (suggestionNotes: string) => {
    onTaskChange(sign.osmValuePart, { ...task, suggestionNotes })
  }

  return (
    <section className="mt-6 space-y-4 rounded-sm p-4 outline -outline-offset-1 outline-stone-500/50">
      <div className="flex flex-wrap items-start gap-4">
        <PackageSvgTrafficSign sign={sign} className="h-auto w-24 shrink-0" />
        <div lang={catalogueLang}>
          <h3 className="text-lg font-medium text-stone-900">
            <code>{sign.osmValuePart}</code> – {sign.descriptiveName}
          </h3>
          <p className="text-sm text-stone-600">
            signId <code>{sign.signId}</code>
          </p>
        </div>
      </div>

      {questions.length === 0 ? (
        <p className="text-sm text-stone-700">{m.questions_qa_no_questions()}</p>
      ) : (
        <ContentTable>
          <ContentTableHead>
            <ContentTableRow>
              <ContentTableHeader className="w-[28%]">
                {m.questions_qa_table_question()}
              </ContentTableHeader>
              <ContentTableHeader>{m.questions_qa_table_answers()}</ContentTableHeader>
            </ContentTableRow>
          </ContentTableHead>
          <ContentTableBody>
            {questions.map((question) => (
              <ContentTableRow key={question.questionId}>
                <ContentTableCell className="align-top text-sm">
                  <p className="font-medium text-stone-800">
                    {getQuestionPromptShortLabel(question.questionI18nKey)}
                  </p>
                  <p className="mt-1 text-xs text-stone-500">
                    <code>questionId: {question.questionId}</code>
                    {question.defaultAnswerId && (
                      <>
                        {' '}
                        · default <code>{question.defaultAnswerId}</code>
                      </>
                    )}
                    {question.affectsHighway && <> · affectsHighway</>}
                  </p>
                </ContentTableCell>
                <ContentTableCell className="align-top text-sm">
                  <ul className="space-y-2">
                    {question.answers.map((answer) => (
                      <li key={answer.answerId}>
                        <span className="font-medium text-stone-800">
                          {getQuestionAnswerShortLabel(answer.answerI18nKey)}
                        </span>
                        <p className="text-xs text-stone-500">
                          {formatAnswerMeta(question, answer)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </ContentTableCell>
              </ContentTableRow>
            ))}
          </ContentTableBody>
        </ContentTable>
      )}

      {questions.length > 0 ? (
        <details className="rounded-sm outline -outline-offset-1 outline-stone-400/50">
          <summary className="cursor-pointer px-2 py-1.5 text-sm font-medium text-stone-700">
            {m.page_all_signs_raw_config()}
          </summary>
          <pre className={contentPreClass} lang={catalogueLang}>
            {JSON.stringify(sign.questions, undefined, 2)}
          </pre>
        </details>
      ) : null}

      <div className="border-t border-stone-200 pt-4">
        <label className="mb-2 block text-sm font-medium text-stone-700">
          <ContentPageWorkflowStepLabel step={2}>
            {m.questions_qa_table_task()}
          </ContentPageWorkflowStepLabel>
        </label>
        <textarea
          placeholder={m.questions_qa_task_notes_placeholder()}
          value={task.suggestionNotes}
          onChange={(event) => setNotes(event.target.value)}
          rows={4}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        />
      </div>
    </section>
  )
}

export const getQuestionTaskForSign = (
  tasks: Map<string, QuestionTaskState>,
  osmValuePart: string,
): QuestionTaskState => tasks.get(osmValuePart) ?? emptyQuestionTaskState()
