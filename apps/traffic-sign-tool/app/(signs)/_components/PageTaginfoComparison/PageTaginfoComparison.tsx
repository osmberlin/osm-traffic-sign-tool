import { WikiLinkListTrafficSignValues } from '@app/app/(signs)/_components/wiki/WikiLinkListTrafficSignValues'
import { TagGeometrySections } from '@app/app/(signs)/DE/taginfo/_components/TagGeometrySections'
import { TagSignImages } from '@app/app/(signs)/DE/taginfo/_components/TagSignImages'
import { ContentPageLayout } from '@app/app/_components/layout/ContentPageLayout'
import {
  ContentTable,
  ContentTableBody,
  ContentTableCell,
  ContentTableHead,
  ContentTableHeader,
  ContentTableRow,
} from '@app/app/_components/layout/ContentTable'
import { inlineCodeClass, proseLightClass } from '@app/app/_components/layout/proseClasses'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import { linkStyle } from '@app/app/_components/links/linkStyles'
import { osmtoolsUrl } from '@app/app/_components/links/osmtoolsUrl'
import * as m from '@app/paraglide/messages'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { getTaginfoTrafficSignData } from '@internal/taginfo'
import { getCatalogueDisplayName } from '@osm-traffic-signs/converter'
import { Link } from '@tanstack/react-router'
import { z } from 'zod'

const Schema = z.array(z.tuple([z.string(), z.number()]))

export const PageTaginfoComparison = () => {
  const countryPrefix = useCurrentLang()
  const data = Schema.parse(getTaginfoTrafficSignData(countryPrefix))
  const catalogueName = getCatalogueDisplayName(countryPrefix)

  return (
    <ContentPageLayout>
      <h2 className="my-4 text-3xl font-light text-black uppercase">
        {m.taginfo_title_count({ count: String(data.length) })}
      </h2>
      <div className={proseLightClass}>
        <p>
          {m.taginfo_page_intro({
            catalogueName,
            countryPrefix,
          })}{' '}
          <ExternalLink
            href="https://github.com/osmberlin/osm-traffic-sign-tool/tree/main/packages/internal_taginfo"
            blank
          >
            {m.taginfo_page_script_link()}
          </ExternalLink>
        </p>
      </div>

      <ContentTable>
        <ContentTableHead>
          <ContentTableRow>
            <ContentTableHeader className="w-[14%]">Sign key</ContentTableHeader>
            <ContentTableHeader className="w-[8%]">Usage</ContentTableHeader>
            <ContentTableHeader className="w-[14%]">Signs</ContentTableHeader>
            <ContentTableHeader className="w-[12%]">Links</ContentTableHeader>
            <ContentTableHeader>Tag recommendations, comments</ContentTableHeader>
          </ContentTableRow>
        </ContentTableHead>
        <ContentTableBody>
          {data.map(([value, usageCount]) => {
            return (
              <ContentTableRow key={value}>
                <ContentTableHeader>
                  <code className={inlineCodeClass}>{value}</code>
                </ContentTableHeader>
                <ContentTableCell className="text-right">
                  {usageCount.toLocaleString()} &times;
                </ContentTableCell>
                <ContentTableCell className="text-sm">
                  <TagSignImages value={value} />
                </ContentTableCell>
                <ContentTableCell className="text-sm">
                  <Link
                    to="/$lang"
                    params={{ lang: countryPrefix }}
                    search={{ signs: value }}
                    target="_blank"
                    className={linkStyle}
                  >
                    {m.taginfo_this_tool_link()}
                  </Link>
                  <br />
                  <ExternalLink href={osmtoolsUrl(value, countryPrefix)} blank>
                    osmtools.de
                  </ExternalLink>
                  <WikiLinkListTrafficSignValues value={value} inline={false} />
                </ContentTableCell>
                <ContentTableCell className="text-sm">
                  <TagGeometrySections value={value} />
                </ContentTableCell>
              </ContentTableRow>
            )
          })}
        </ContentTableBody>
      </ContentTable>
    </ContentPageLayout>
  )
}
