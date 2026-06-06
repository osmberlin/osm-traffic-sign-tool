import { PackageSvgTrafficSign } from '@app/app/(signs)/_components/PackageSvgTrafficSign'
import {
  emptySignTaskState,
  taskNotesPlaceholder,
  type SignTaskState,
  type SignTaskType,
} from '@app/app/(signs)/_components/PageSignsQa/taggingQaTaskFormat'
import { SignTagRecommendationsPanel } from '@app/app/(signs)/_components/SignTagRecommendations/SignTagRecommendationsPanel'
import { useCatalogueHtmlLang } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import {
  ContentPageWorkflowLetterLabel,
  ContentPageWorkflowStepLabel,
} from '@app/app/_components/layout/ContentPageWorkflowStep'
import {
  ContentTable,
  ContentTableBody,
  ContentTableCell,
  ContentTableHead,
  ContentTableHeader,
  ContentTableRow,
} from '@app/app/_components/layout/ContentTable'
import * as m from '@app/paraglide/messages'
import { classifyTaggingSuggestionsQa, type SignType } from '@osm-traffic-signs/converter'

const qaCategoryLabels = {
  withSuggestions: () => m.qa_with_suggestions(),
  missingSuggestions: () => m.qa_missing_suggestions(),
  explicitNoSuggestions: () => m.qa_explicit_no_suggestions(),
} as const

const taskOptions: {
  value: SignTaskType
  letter: 'A' | 'B' | 'C'
  label: () => string
}[] = [
  { value: 'explicit_none', letter: 'A', label: m.qa_task_explicit_none },
  { value: 'add_suggestions', letter: 'B', label: m.qa_task_add_suggestions },
  { value: 'comment', letter: 'C', label: m.qa_task_comment },
]

const radioClassName =
  'relative size-4 shrink-0 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-purple-600 checked:bg-purple-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden'

type Props = {
  signs: SignType[]
  tasks: Map<string, SignTaskState>
  onTasksChange: (tasks: Map<string, SignTaskState>) => void
}

export const TaggingQaTable = ({ signs, tasks, onTasksChange }: Props) => {
  const catalogueLang = useCatalogueHtmlLang()

  const setTaskType = (osmValuePart: string, taskType: SignTaskType) => {
    const next = new Map(tasks)
    const current = next.get(osmValuePart) ?? emptySignTaskState()
    const isSame = current.taskType === taskType

    next.set(
      osmValuePart,
      isSame ? emptySignTaskState() : { taskType, suggestionNotes: current.suggestionNotes },
    )
    onTasksChange(next)
  }

  const updateNotes = (osmValuePart: string, suggestionNotes: string) => {
    const next = new Map(tasks)
    const current = next.get(osmValuePart) ?? emptySignTaskState()
    next.set(osmValuePart, { ...current, suggestionNotes })
    onTasksChange(next)
  }

  return (
    <form className="mt-6">
      <ContentTable>
        <ContentTableHead>
          <ContentTableRow>
            <ContentTableHeader className="w-[14%]">{m.qa_table_sign_key()}</ContentTableHeader>
            <ContentTableHeader className="w-[36%]">
              <ContentPageWorkflowStepLabel step={2}>
                {m.qa_table_task()}
              </ContentPageWorkflowStepLabel>
            </ContentTableHeader>
            <ContentTableHeader>{m.page_tagging_qa_col_recommendations()}</ContentTableHeader>
          </ContentTableRow>
        </ContentTableHead>
        <ContentTableBody>
          {signs.map((sign) => {
            const qaCategory = classifyTaggingSuggestionsQa(sign)
            const task = tasks.get(sign.osmValuePart) ?? emptySignTaskState()
            const groupName = `task-${sign.osmValuePart}`

            return (
              <ContentTableRow key={sign.osmValuePart}>
                <ContentTableHeader className="space-y-3 !py-5 text-center">
                  <code lang={catalogueLang}>{sign.osmValuePart}</code>
                  <br />
                  <PackageSvgTrafficSign
                    sign={sign}
                    className="inline-block max-h-[110px] w-auto max-w-20 object-contain"
                  />
                </ContentTableHeader>
                <ContentTableCell className="!py-5 align-top text-sm leading-snug">
                  <p className="mb-3 font-medium text-stone-700">
                    {qaCategoryLabels[qaCategory]()}
                  </p>
                  <fieldset className="space-y-3">
                    <legend className="sr-only">
                      {m.qa_task_for({ signKey: sign.osmValuePart })}
                    </legend>
                    {taskOptions.map(({ value, letter, label }) => {
                      const id = `${groupName}-${value}`

                      return (
                        <div key={value} className="flex items-center gap-2">
                          <input
                            id={id}
                            type="radio"
                            name={groupName}
                            checked={task.taskType === value}
                            onChange={() => setTaskType(sign.osmValuePart, value)}
                            className={radioClassName}
                          />
                          <label htmlFor={id}>
                            <ContentPageWorkflowLetterLabel letter={letter}>
                              {label()}
                            </ContentPageWorkflowLetterLabel>
                          </label>
                        </div>
                      )
                    })}
                    {task.taskType && (
                      <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                          <ContentPageWorkflowStepLabel step={2}>
                            {m.page_tagging_qa_action_step_2()}
                          </ContentPageWorkflowStepLabel>
                        </label>
                        <textarea
                          placeholder={taskNotesPlaceholder(task.taskType)}
                          value={task.suggestionNotes}
                          onChange={(event) => updateNotes(sign.osmValuePart, event.target.value)}
                          rows={4}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-600"
                        />
                      </div>
                    )}
                  </fieldset>
                </ContentTableCell>
                <ContentTableCell className="!py-5" lang={catalogueLang}>
                  <SignTagRecommendationsPanel value={sign.osmValuePart} />
                </ContentTableCell>
              </ContentTableRow>
            )
          })}
        </ContentTableBody>
      </ContentTable>
    </form>
  )
}
