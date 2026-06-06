import { FocusFilterRow } from '@app/app/(signs)/_components/PageApp/signGroups/FocusFilterRow'
import {
  getQuestionTaskForSign,
  QuestionQaSignDetail,
} from '@app/app/(signs)/_components/PageQuestionsQa/QuestionQaSignDetail'
import { QuestionQaSignPicker } from '@app/app/(signs)/_components/PageQuestionsQa/QuestionQaSignPicker'
import { QuestionQaTaskResults } from '@app/app/(signs)/_components/PageQuestionsQa/QuestionQaTaskResults'
import { QuestionsQaPageIntro } from '@app/app/(signs)/_components/PageQuestionsQa/QuestionsQaPageIntro'
import {
  collectQuestionTaskEntries,
  type QuestionTaskState,
} from '@app/app/(signs)/_components/PageQuestionsQa/questionsQaTaskFormat'
import { useParamCombinationPrimary } from '@app/app/(signs)/_components/store/useParamCombinationPrimary.search'
import { useParamFocus } from '@app/app/(signs)/_components/store/useParamFocus.search'
import { useParamQuestionsQa } from '@app/app/(signs)/_components/store/useParamQuestionsQa.search'
import { useReplaceDeSearch } from '@app/app/(signs)/_components/store/useReplaceDeSearch'
import { CataloguePageProps } from '@app/app/(signs)/_components/types'
import { ContentPageLayout } from '@app/app/_components/layout/ContentPageLayout'
import { ContentPageWorkflowStepGroup } from '@app/app/_components/layout/ContentPageWorkflowStep'
import * as m from '@app/paraglide/messages'
import { serializeQuestionsQaParam } from '@app/src/features/searchParams/deSearch'
import {
  countSignsByQuestionsQa,
  filterSignsByFocus,
  filterSignsByQuestionsQa,
} from '@osm-traffic-signs/converter'
import { useState } from 'react'

export const PageQuestionsQa = ({ trafficSignData }: CataloguePageProps) => {
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
      if (!task.suggestionNotes.trim()) {
        next.delete(osmValuePart)
      } else {
        next.set(osmValuePart, task)
      }
      return next
    })
  }

  return (
    <ContentPageLayout intro={<QuestionsQaPageIntro />}>
      <ContentPageWorkflowStepGroup step={1}>
        <FocusFilterRow />
        <QuestionQaSignPicker
          nested
          filteredSigns={filteredSigns}
          counts={qqaCounts}
          primaryOsmValuePart={primaryOsmValuePart}
          onPrimarySelect={handlePrimarySelect}
        />
      </ContentPageWorkflowStepGroup>

      {selectedSign ? (
        <QuestionQaSignDetail
          sign={selectedSign}
          task={getQuestionTaskForSign(tasks, selectedSign.osmValuePart)}
          onTaskChange={handleTaskChange}
        />
      ) : (
        <p className="mt-6 text-sm text-stone-600">{m.questions_qa_select_sign_hint()}</p>
      )}

      <QuestionQaTaskResults entries={taskEntries} />
    </ContentPageLayout>
  )
}
