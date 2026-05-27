import { PackageSvgTrafficSign } from '@app/app/(signs)/_components/PackageSvgTrafficSign'
import {
  collectSignTaskEntries,
  emptySignTaskState,
  taskNotesPlaceholder,
  type SignTaskType,
} from '@app/app/(signs)/_components/PageSignsQa/taggingQaTaskFormat'
import { TaggingQaTaskResults } from '@app/app/(signs)/_components/PageSignsQa/TaggingQaTaskResults'
import { useCatalogueHtmlLang } from '@app/app/(signs)/_components/store/CountryPrefixContext'
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
import { classifyTaggingSuggestionsQa, type SignType } from '@osm-traffic-signs/converter'
import { useState } from 'react'

const qaCategoryLabels = {
  withSuggestions: () => m.qa_with_suggestions(),
  missingSuggestions: () => m.qa_missing_suggestions(),
  explicitNoSuggestions: () => m.qa_explicit_no_suggestions(),
} as const

const taskOptions: { value: SignTaskType; label: () => string }[] = [
  { value: 'explicit_none', label: m.qa_task_explicit_none },
  { value: 'add_suggestions', label: m.qa_task_add_suggestions },
  { value: 'comment', label: m.qa_task_comment },
]

const radioClassName =
  'relative size-4 shrink-0 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden'

type Props = {
  signs: SignType[]
}

export const TaggingQaTable = ({ signs }: Props) => {
  const catalogueLang = useCatalogueHtmlLang()
  const [tasks, setTasks] = useState<Map<string, ReturnType<typeof emptySignTaskState>>>(
    () => new Map(),
  )

  const taskEntries = collectSignTaskEntries(signs, tasks)

  const setTaskType = (osmValuePart: string, taskType: SignTaskType) => {
    setTasks((prev) => {
      const next = new Map(prev)
      const current = next.get(osmValuePart) ?? emptySignTaskState()
      const isSame = current.taskType === taskType

      next.set(
        osmValuePart,
        isSame ? emptySignTaskState() : { taskType, suggestionNotes: current.suggestionNotes },
      )
      return next
    })
  }

  const updateNotes = (osmValuePart: string, suggestionNotes: string) => {
    setTasks((prev) => {
      const next = new Map(prev)
      const current = next.get(osmValuePart) ?? emptySignTaskState()
      next.set(osmValuePart, { ...current, suggestionNotes })
      return next
    })
  }

  return (
    <form>
      <TaggingQaTaskResults entries={taskEntries} />

      <ContentTable>
        <ContentTableHead>
          <ContentTableRow>
            <ContentTableHeader className="w-[14%]">{m.qa_table_sign_key()}</ContentTableHeader>
            <ContentTableHeader className="w-[36%]">{m.qa_table_task()}</ContentTableHeader>
            <ContentTableHeader>{m.page_all_signs_raw_config()}</ContentTableHeader>
          </ContentTableRow>
        </ContentTableHead>
        <ContentTableBody>
          {signs.map((sign) => {
            const qaCategory = classifyTaggingSuggestionsQa(sign)
            const task = tasks.get(sign.osmValuePart) ?? emptySignTaskState()
            const groupName = `task-${sign.osmValuePart}`

            return (
              <ContentTableRow key={sign.osmValuePart}>
                <ContentTableHeader className="space-y-3 text-center">
                  <code lang={catalogueLang}>{sign.osmValuePart}</code>
                  <br />
                  <PackageSvgTrafficSign sign={sign} className="inline-block h-auto w-20" />
                </ContentTableHeader>
                <ContentTableCell className="align-top text-sm leading-snug">
                  <p className="mb-3 font-medium text-stone-700">
                    {qaCategoryLabels[qaCategory]()}
                  </p>
                  <fieldset className="space-y-3">
                    <legend className="sr-only">
                      {m.qa_task_for({ signKey: sign.osmValuePart })}
                    </legend>
                    {taskOptions.map(({ value, label }) => {
                      const id = `${groupName}-${value}`

                      return (
                        <div key={value} className="flex items-start gap-2">
                          <input
                            id={id}
                            type="radio"
                            name={groupName}
                            checked={task.taskType === value}
                            onChange={() => setTaskType(sign.osmValuePart, value)}
                            className={radioClassName}
                          />
                          <label htmlFor={id}>{label()}</label>
                        </div>
                      )
                    })}
                    {task.taskType && (
                      <textarea
                        placeholder={taskNotesPlaceholder(task.taskType)}
                        value={task.suggestionNotes}
                        onChange={(event) => updateNotes(sign.osmValuePart, event.target.value)}
                        rows={4}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                      />
                    )}
                  </fieldset>
                </ContentTableCell>
                <ContentTableCell lang={catalogueLang}>
                  <pre className={contentPreClass}>{JSON.stringify(sign, undefined, 2)}</pre>
                </ContentTableCell>
              </ContentTableRow>
            )
          })}
        </ContentTableBody>
      </ContentTable>
    </form>
  )
}
