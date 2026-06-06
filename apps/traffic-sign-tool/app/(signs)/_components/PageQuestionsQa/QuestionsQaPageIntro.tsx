import {
  ContentPageIntro,
  ContentPageIntroRow,
  ContentPageIntroRows,
  ContentPageIntroTitle,
} from '@app/app/_components/layout/ContentPageIntro'
import {
  ContentPageWorkflowStepList,
  ContentPageWorkflowStepListItem,
} from '@app/app/_components/layout/ContentPageWorkflowStep'
import * as m from '@app/paraglide/messages'
import { getCatalogueLabel } from '@app/src/features/i18n/catalogueLabels'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { BoltIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

export function QuestionsQaPageIntro() {
  const countryPrefix = useCurrentLang()
  const catalogueName = getCatalogueLabel(countryPrefix)

  return (
    <ContentPageIntro>
      <ContentPageIntroTitle>
        {m.page_questions_qa_title({ catalogueName, countryPrefix })}
      </ContentPageIntroTitle>
      <ContentPageIntroRows>
        <ContentPageIntroRow icon={InformationCircleIcon} title={m.page_questions_qa_about_label()}>
          {m.page_questions_qa_about_text()}
        </ContentPageIntroRow>
        <ContentPageIntroRow icon={BoltIcon} title={m.page_questions_qa_help_label()}>
          {m.page_questions_qa_help_intro()}
          <ContentPageWorkflowStepList>
            <ContentPageWorkflowStepListItem step={1}>
              {m.page_questions_qa_help_step_1()}
            </ContentPageWorkflowStepListItem>
            <ContentPageWorkflowStepListItem step={2}>
              {m.page_questions_qa_help_step_2()}
            </ContentPageWorkflowStepListItem>
            <ContentPageWorkflowStepListItem step={3}>
              {m.page_questions_qa_help_step_3()}
            </ContentPageWorkflowStepListItem>
          </ContentPageWorkflowStepList>
        </ContentPageIntroRow>
      </ContentPageIntroRows>
    </ContentPageIntro>
  )
}
