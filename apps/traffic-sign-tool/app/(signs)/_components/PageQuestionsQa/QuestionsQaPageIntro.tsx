import {
  ContentPageIntro,
  ContentPageIntroRow,
  ContentPageIntroRows,
  ContentPageIntroTitle,
} from '@app/app/_components/layout/ContentPageIntro'
import * as m from '@app/paraglide/messages'
import { BoltIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

export function QuestionsQaPageIntro() {
  return (
    <ContentPageIntro>
      <ContentPageIntroTitle>{m.page_questions_qa_title()}</ContentPageIntroTitle>
      <ContentPageIntroRows>
        <ContentPageIntroRow icon={InformationCircleIcon} title={m.page_questions_qa_about_label()}>
          {m.page_questions_qa_about_text()}
        </ContentPageIntroRow>
        <ContentPageIntroRow icon={BoltIcon} title={m.page_questions_qa_help_label()}>
          {m.page_questions_qa_help_text()}
        </ContentPageIntroRow>
      </ContentPageIntroRows>
    </ContentPageIntro>
  )
}
