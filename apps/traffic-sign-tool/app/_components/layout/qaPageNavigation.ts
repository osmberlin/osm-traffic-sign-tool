import * as m from '@app/paraglide/messages'
import type { CountryQaCapabilities } from '@osm-traffic-signs/converter'

type QaPageTab = {
  id: string
  to:
    | '/$lang/taginfo'
    | '/$lang/wiki'
    | '/$lang/signs-qa'
    | '/$lang/check-sign-combinations'
    | '/$lang/questions-qa'
  capability: keyof CountryQaCapabilities
  name: () => string
}

export const qaPageTabs = [
  {
    id: 'taginfo',
    to: '/$lang/taginfo',
    capability: 'taginfoComparison',
    name: m.qa_pages_nav_taginfo,
  },
  {
    id: 'wiki',
    to: '/$lang/wiki',
    capability: 'wikiComparison',
    name: m.qa_pages_nav_wiki,
  },
  {
    id: 'tagging',
    to: '/$lang/signs-qa',
    capability: 'taggingQa',
    name: m.qa_pages_nav_tagging,
  },
  {
    id: 'combinations',
    to: '/$lang/check-sign-combinations',
    capability: 'combinationsQa',
    name: m.qa_pages_nav_combinations,
  },
  {
    id: 'questions',
    to: '/$lang/questions-qa',
    capability: 'questionsQa',
    name: m.qa_pages_nav_questions,
  },
] as const satisfies readonly QaPageTab[]
