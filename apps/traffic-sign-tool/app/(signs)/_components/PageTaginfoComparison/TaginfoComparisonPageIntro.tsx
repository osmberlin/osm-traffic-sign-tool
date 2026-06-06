import { WikiLinkify } from '@app/app/(signs)/_components/wiki/WikiLinkify'
import {
  ContentPageIntro,
  ContentPageIntroRow,
  ContentPageIntroRows,
  ContentPageIntroTitle,
} from '@app/app/_components/layout/ContentPageIntro'
import { proseLightClass } from '@app/app/_components/layout/proseClasses'
import { stonePillButton } from '@app/app/_components/links/buttonStyles'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import * as m from '@app/paraglide/messages'
import { getLocale } from '@app/paraglide/runtime'
import { getCatalogueLabel } from '@app/src/features/i18n/catalogueLabels'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { BoltIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { getTaginfoSnapshotMeta, getTaginfoTrafficSignKeyUrl } from '@internal/taginfo'
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

export function TaginfoComparisonPageIntro() {
  const countryPrefix = useCurrentLang()
  const catalogueName = getCatalogueLabel(countryPrefix)
  const taginfoUrl = getTaginfoTrafficSignKeyUrl(countryPrefix)
  const parsedAt = getTaginfoSnapshotMeta(countryPrefix)?.parsedAt
  const parsedAtLabel = parsedAt
    ? formatParsedAt(parsedAt, getLocale())
    : m.page_taginfo_qa_parsed_unknown()

  return (
    <ContentPageIntro>
      <ContentPageIntroTitle>
        {m.page_taginfo_qa_title({ catalogueName, countryPrefix })}
      </ContentPageIntroTitle>
      <ContentPageIntroRows>
        <ContentPageIntroRow icon={InformationCircleIcon} title={m.page_taginfo_qa_about_label()}>
          <WikiLinkify
            text={m.page_taginfo_qa_about_text({ parsedAt: parsedAtLabel })}
            className={clsx(proseLightClass, 'text-sm leading-snug text-stone-800 [&_p]:m-0')}
          />
          <ExternalLink
            href={taginfoUrl}
            blank
            className={clsx(
              'mt-2 inline-flex h-8 w-fit items-center self-start px-3 text-sm leading-none',
              stonePillButton,
            )}
          >
            {m.page_taginfo_qa_open_taginfo_reference()}
          </ExternalLink>
        </ContentPageIntroRow>
        <ContentPageIntroRow icon={BoltIcon} title={m.page_taginfo_qa_action_label()}>
          {m.page_taginfo_qa_action_text()}
        </ContentPageIntroRow>
      </ContentPageIntroRows>
    </ContentPageIntro>
  )
}
