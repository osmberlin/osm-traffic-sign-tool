import { FocusFilterRow } from '@app/app/(signs)/_components/PageApp/signGroups/FocusFilterRow'
import { TaggingQaFilterRow } from '@app/app/(signs)/_components/PageSignsQa/TaggingQaFilterRow'
import { TaggingQaPageIntro } from '@app/app/(signs)/_components/PageSignsQa/TaggingQaPageIntro'
import { TaggingQaTable } from '@app/app/(signs)/_components/PageSignsQa/TaggingQaTable'
import {
  collectSignTaskEntries,
  type SignTaskState,
} from '@app/app/(signs)/_components/PageSignsQa/taggingQaTaskFormat'
import { TaggingQaTaskResults } from '@app/app/(signs)/_components/PageSignsQa/TaggingQaTaskResults'
import { useParamFocus } from '@app/app/(signs)/_components/store/useParamFocus.search'
import { useParamTaggingQa } from '@app/app/(signs)/_components/store/useParamTaggingQa.search'
import { CataloguePageProps } from '@app/app/(signs)/_components/types'
import { ContentPageLayout } from '@app/app/_components/layout/ContentPageLayout'
import { ContentPageWorkflowStepGroup } from '@app/app/_components/layout/ContentPageWorkflowStep'
import {
  countSignsByFocus,
  countSignsByTaggingSuggestionsQa,
  filterSignsByFocus,
  filterSignsByTaggingSuggestionsQa,
} from '@osm-traffic-signs/converter'
import { useMemo, useState } from 'react'

export const PageSignsQa = ({ trafficSignData }: CataloguePageProps) => {
  const { focuses } = useParamFocus()
  const { qaFilter } = useParamTaggingQa()
  const [tasks, setTasks] = useState<Map<string, SignTaskState>>(() => new Map())

  const focusCounts = useMemo(() => countSignsByFocus(trafficSignData), [trafficSignData])
  const focusFilteredSigns = filterSignsByFocus(trafficSignData, focuses)
  const qaCounts = countSignsByTaggingSuggestionsQa(focusFilteredSigns)
  const displayedSigns = filterSignsByTaggingSuggestionsQa(focusFilteredSigns, qaFilter)
  const taskEntries = collectSignTaskEntries(trafficSignData, tasks)

  return (
    <ContentPageLayout intro={<TaggingQaPageIntro />} qaPagesNav>
      <ContentPageWorkflowStepGroup step={1}>
        <FocusFilterRow counts={focusCounts} />
        <TaggingQaFilterRow counts={qaCounts} />
      </ContentPageWorkflowStepGroup>

      <TaggingQaTaskResults entries={taskEntries} />

      <TaggingQaTable signs={displayedSigns} tasks={tasks} onTasksChange={setTasks} />
    </ContentPageLayout>
  )
}
