import {
  ContentPageIntro,
  ContentPageIntroRow,
  ContentPageIntroRows,
  ContentPageIntroTitle,
} from '@app/app/_components/layout/ContentPageIntro'
import { stonePillButton } from '@app/app/_components/links/buttonStyles'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import * as m from '@app/paraglide/messages'
import { getLocale } from '@app/paraglide/runtime'
import { getCatalogueLabel } from '@app/src/features/i18n/catalogueLabels'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { BoltIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { getWikiSnapshotMeta } from '@internal/wiki'
import { getCountryCatalogueMeta } from '@osm-traffic-signs/converter'
import clsx from 'clsx'

const formatParsedAt = (parsedAt: string, locale: string): string => {
  const date = new Date(parsedAt)
  if (Number.isNaN(date.getTime())) {
    return parsedAt
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date)
}

export function WikiComparisonPageIntro() {
  const countryPrefix = useCurrentLang()
  const catalogueName = getCatalogueLabel(countryPrefix)
  const wikiOverviewUrl = getCountryCatalogueMeta(countryPrefix).osmWikiOverviewUrl
  const parsedAt = getWikiSnapshotMeta(countryPrefix)?.parsedAt
  const parsedAtLabel = parsedAt
    ? formatParsedAt(parsedAt, getLocale())
    : m.page_wiki_qa_parsed_unknown()

  return (
    <ContentPageIntro>
      <ContentPageIntroTitle>
        {m.page_wiki_qa_title({ catalogueName, countryPrefix })}
      </ContentPageIntroTitle>
      <ContentPageIntroRows>
        <ContentPageIntroRow icon={InformationCircleIcon} title={m.page_wiki_qa_about_label()}>
          {m.page_wiki_qa_about_text({ parsedAt: parsedAtLabel })}
          <ExternalLink
            href={wikiOverviewUrl}
            blank
            className={clsx(
              'mt-2 inline-flex h-8 w-fit items-center self-start px-3 text-sm leading-none',
              stonePillButton,
            )}
          >
            {m.page_wiki_qa_open_wiki_reference()}
          </ExternalLink>
        </ContentPageIntroRow>
        <ContentPageIntroRow icon={BoltIcon} title={m.page_wiki_qa_action_label()}>
          {m.page_wiki_qa_action_text()}
        </ContentPageIntroRow>
      </ContentPageIntroRows>
    </ContentPageIntro>
  )
}
