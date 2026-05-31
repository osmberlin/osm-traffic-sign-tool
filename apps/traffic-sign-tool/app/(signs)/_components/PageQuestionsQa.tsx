import { FocusFilterRow } from '@app/app/(signs)/_components/PageApp/signGroups/FocusFilterRow'
import {
  getQuestionTaskForSign,
  QuestionQaSignDetail,
} from '@app/app/(signs)/_components/PageQuestionsQa/QuestionQaSignDetail'
import { QuestionQaSignPicker } from '@app/app/(signs)/_components/PageQuestionsQa/QuestionQaSignPicker'
import { QuestionQaTaskResults } from '@app/app/(signs)/_components/PageQuestionsQa/QuestionQaTaskResults'
import {
  collectQuestionTaskEntries,
  emptyQuestionTaskState,
  type QuestionTaskState,
} from '@app/app/(signs)/_components/PageQuestionsQa/questionsQaTaskFormat'
import { useParamCombinationPrimary } from '@app/app/(signs)/_components/store/useParamCombinationPrimary.search'
import { useParamFocus } from '@app/app/(signs)/_components/store/useParamFocus.search'
import { useParamQuestionsQa } from '@app/app/(signs)/_components/store/useParamQuestionsQa.search'
import { useReplaceDeSearch } from '@app/app/(signs)/_components/store/useReplaceDeSearch'
import { PageProps } from '@app/app/(signs)/_components/types'
import { ContentPageLayout } from '@app/app/_components/layout/ContentPageLayout'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import * as m from '@app/paraglide/messages'
import { serializeQuestionsQaParam } from '@app/src/features/searchParams/deSearch'
import {
  countSignsByQuestionsQa,
  filterSignsByFocus,
  filterSignsByQuestionsQa,
} from '@osm-traffic-signs/converter'
import { useState } from 'react'

export const PageQuestionsQa = ({ trafficSignData }: PageProps) => {
  const { focuses } = useParamFocus()
  const { qqaFilter } = useParamQuestionsQa()
  const { primaryOsmValuePart } = useParamCombinationPrimary()
  const { replaceSearch } = useReplaceDeSearch()
  const [tasks, setTasks] = useState<Map<string, QuestionTaskState>>(() => new Map())

  const focusFilteredSigns = filterSignsByFocus(trafficSignData, focuses)
  const qqaCounts = countSignsByQuestionsQa(focusFilteredSigns)
  const filteredSigns = filterSignsByQuestionsQa(focusFilteredSigns, qqaFilter)

  const selectedSign = primaryOsmValuePart
    ? filteredSigns.find((sign) => sign.osmValuePart === primaryOsmValuePart)
    : undefined

  const taskEntries = collectQuestionTaskEntries(trafficSignData, tasks)

  const updateSearch = (update: { qqaFilter?: typeof qqaFilter; primaryOsmValuePart?: string }) => {
    replaceSearch((prev) => {
      const nextFilter = update.qqaFilter ?? qqaFilter
      const nextFiltered = filterSignsByQuestionsQa(focusFilteredSigns, nextFilter)
      let nextPrimary = 'primaryOsmValuePart' in update ? update.primaryOsmValuePart : prev.primary

      if (nextPrimary && !nextFiltered.some((sign) => sign.osmValuePart === nextPrimary)) {
        nextPrimary = undefined
      }

      return {
        ...prev,
        qqa: serializeQuestionsQaParam(nextFilter),
        primary: nextPrimary,
      }
    })
  }

  const handlePrimarySelect = (osmValuePart: string) => {
    updateSearch({ primaryOsmValuePart: osmValuePart })
  }

  const handleTaskChange = (osmValuePart: string, task: QuestionTaskState) => {
    setTasks((prev) => {
      const next = new Map(prev)
      if (!task.addSuggestions && !task.suggestionNotes.trim()) {
        next.delete(osmValuePart)
      } else {
        next.set(osmValuePart, task)
      }
      return next
    })
  }

  return (
    <ContentPageLayout>
      <h2 className="my-4 text-3xl font-light text-black uppercase">
        {m.page_questions_qa_title()}
      </h2>
      <p>{m.page_questions_qa_description()}</p>

      <div className="mt-6">
        <FocusFilterRow />
      </div>

      <QuestionQaTaskResults entries={taskEntries} />

      <QuestionQaSignPicker
        filteredSigns={filteredSigns}
        counts={qqaCounts}
        primaryOsmValuePart={primaryOsmValuePart}
        onPrimarySelect={handlePrimarySelect}
      />

      <p className="mt-4 text-sm text-stone-700">
        {m.page_questions_qa_showing({
          shown: String(filteredSigns.length),
          filtered: String(focusFilteredSigns.length),
          total: String(trafficSignData.length),
        })}{' '}
        <ExternalLink href="https://www.npmjs.com/package/@osm-traffic-signs/converter">
          {m.converter_package()}
        </ExternalLink>
      </p>

      {selectedSign ? (
        <QuestionQaSignDetail
          sign={selectedSign}
          task={getQuestionTaskForSign(tasks, selectedSign.osmValuePart)}
          onTaskChange={handleTaskChange}
        />
      ) : (
        <p className="mt-6 text-sm text-stone-600">{m.questions_qa_select_sign_hint()}</p>
      )}
    </ContentPageLayout>
  )
}
