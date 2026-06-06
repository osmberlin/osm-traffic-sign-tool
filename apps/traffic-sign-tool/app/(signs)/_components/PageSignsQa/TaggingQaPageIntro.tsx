import {
  ContentPageIntro,
  ContentPageIntroRow,
  ContentPageIntroRows,
  ContentPageIntroTitle,
} from '@app/app/_components/layout/ContentPageIntro'
import {
  ContentPageWorkflowLetterList,
  ContentPageWorkflowLetterListItem,
  ContentPageWorkflowStepList,
  ContentPageWorkflowStepListItem,
} from '@app/app/_components/layout/ContentPageWorkflowStep'
import * as m from '@app/paraglide/messages'
import { getCatalogueLabel } from '@app/src/features/i18n/catalogueLabels'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { BoltIcon, InformationCircleIcon, ListBulletIcon } from '@heroicons/react/24/outline'

export function TaggingQaPageIntro() {
  const countryPrefix = useCurrentLang()
  const catalogueName = getCatalogueLabel(countryPrefix)

  return (
    <ContentPageIntro>
      <ContentPageIntroTitle>
        {m.page_tagging_qa_title({ catalogueName, countryPrefix })}
      </ContentPageIntroTitle>
      <ContentPageIntroRows>
        <ContentPageIntroRow icon={InformationCircleIcon} title={m.page_tagging_qa_about_label()}>
          {m.page_tagging_qa_about_text()}
        </ContentPageIntroRow>
        <ContentPageIntroRow
          icon={ListBulletIcon}
          title={m.page_tagging_qa_tasks_label()}
          highlightOnHover
        >
          <ContentPageWorkflowLetterList>
            <ContentPageWorkflowLetterListItem letter="A">
              {m.page_tagging_qa_task_a()}
            </ContentPageWorkflowLetterListItem>
            <ContentPageWorkflowLetterListItem letter="B">
              {m.page_tagging_qa_task_b()}
            </ContentPageWorkflowLetterListItem>
            <ContentPageWorkflowLetterListItem letter="C">
              {m.page_tagging_qa_task_c()}
            </ContentPageWorkflowLetterListItem>
          </ContentPageWorkflowLetterList>
        </ContentPageIntroRow>
        <ContentPageIntroRow
          icon={BoltIcon}
          title={m.page_tagging_qa_action_label()}
          highlightOnHover
        >
          <ContentPageWorkflowStepList>
            <ContentPageWorkflowStepListItem step={1} highlightBadgeOnHover>
              {m.page_tagging_qa_action_step_1()}
            </ContentPageWorkflowStepListItem>
            <ContentPageWorkflowStepListItem step={2} highlightBadgeOnHover>
              {m.page_tagging_qa_action_step_2()}
            </ContentPageWorkflowStepListItem>
            <ContentPageWorkflowStepListItem step={3} highlightBadgeOnHover>
              {m.page_tagging_qa_action_step_3()}
            </ContentPageWorkflowStepListItem>
          </ContentPageWorkflowStepList>
        </ContentPageIntroRow>
      </ContentPageIntroRows>
    </ContentPageIntro>
  )
}
