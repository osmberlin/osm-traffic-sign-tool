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
import { getGeometryLabel } from '@app/src/features/i18n/geometryLabels'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import { taginfoTrafficSignData } from '@internal/taginfo'
import { GEOMETRY_TYPES } from '@osm-traffic-signs/converter'
import { Link } from '@tanstack/react-router'
import { z } from 'zod'
import { WikiLinkListTrafficSignValues } from '../../_components/wiki/WikiLinkListTrafficSignValues'
import { TagComments } from './_components/TagComments'
import { TagRecommendations } from './_components/TagRecommendations'
import { TagSignImages } from './_components/TagSignImages'

const Schema = z.array(z.tuple([z.string(), z.number()]))

export default function TaginfoPage() {
  const data = Schema.parse(taginfoTrafficSignData)
  const lang = useCurrentLang()

  return (
    <ContentPageLayout>
      <h2 className="my-4 text-3xl font-light text-black uppercase">
        {m.taginfo_title_count({ count: String(data.length) })}
      </h2>
      <div className={proseLightClass}>
        <p>
          This page is to understand, debug and improve the traffic sign recommendation for traffic
          signs that are actually used by mappers today. The taginfo is for Germany and updated
          manually{' '}
          <ExternalLink
            href="https://github.com/osmberlin/osm-traffic-sign-tool/tree/main/data/taginfo"
            blank
          >
            using this script.
          </ExternalLink>{' '}
          The data is the sum of values for <code>traffic_sign</code>,{' '}
          <code>traffic_sign:forward</code>, <code>traffic_sign:backward</code>.
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
                    params={{ lang }}
                    search={{ signs: value }}
                    target="_blank"
                    className={linkStyle}
                  >
                    This tool
                  </Link>
                  <br />
                  <ExternalLink href={osmtoolsUrl(value)} blank>
                    osmtools.de
                  </ExternalLink>
                  <WikiLinkListTrafficSignValues value={value} inline={false} />
                </ContentTableCell>
                <ContentTableCell className="text-sm">
                  {GEOMETRY_TYPES.map((geometry, index) => {
                    return (
                      <div key={geometry}>
                        {index > 0 && <hr className="my-5" />}
                        <h4 className="mb-2 font-light uppercase">{getGeometryLabel(geometry)}</h4>
                        <TagRecommendations value={value} geometry={geometry} />
                        <TagComments value={value} geometry={geometry} />
                      </div>
                    )
                  })}
                </ContentTableCell>
              </ContentTableRow>
            )
          })}
        </ContentTableBody>
      </ContentTable>
    </ContentPageLayout>
  )
}
