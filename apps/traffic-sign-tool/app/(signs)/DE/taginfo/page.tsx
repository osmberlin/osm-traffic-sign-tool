import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import { linkStyle } from '@app/app/_components/links/linkStyles'
import { osmtoolsUrl } from '@app/app/_components/links/osmtoolsUrl'
import { taginfoTrafficSignData } from '@internal/taginfo'
import { countries } from '@osm-traffic-signs/converter'
import Link from 'next/link'
import { z } from 'zod'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../_components/catalyst/table'
import { WikiLinkListTrafficSignValues } from '../../_components/wiki/WikiLinkListTrafficSignValues'
import { TagComments } from './_components/TagComments'
import { TagRecommendations } from './_components/TagRecommendations'
import { TagSignImages } from './_components/TagSignImages'

export async function generateStaticParams() {
  return countries.map((prefx) => ({
    countryPrefix: prefx,
  }))
}

const Schema = z.array(z.tuple([z.string(), z.number()]))

export default function TaginfoPage() {
  const data = Schema.parse(taginfoTrafficSignData)

  return (
    <article className="rounded-sm bg-stone-300 px-6 py-4">
      <h2 className="my-4 text-3xl font-light text-black uppercase">
        Taginfo traffic sign values {data.length}
      </h2>
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

      <Table className="mt-10">
        <TableHead>
          <TableRow>
            <TableHeader>Sign key</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader>Signs</TableHeader>
            <TableHeader>Links</TableHeader>
            <TableHeader>Tag recommendations, comments</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(([value, usageCount]) => {
            return (
              <TableRow key={value}>
                <TableHeader className="w-40 break-all">
                  <code>{value}</code>
                </TableHeader>
                <TableCell className="w-20 text-right whitespace-nowrap">
                  {usageCount.toLocaleString()} &times;
                </TableCell>
                <TableCell className="w-60 text-sm">
                  <TagSignImages value={value} />
                </TableCell>
                <TableCell className="w-20 text-sm">
                  <Link
                    href={{
                      pathname: '/DE',
                      search: new URLSearchParams({ signs: value }).toString(),
                    }}
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
                </TableCell>
                <TableCell className="max-w-20 text-sm">
                  <TagRecommendations value={value} />
                  <hr className="my-5" />
                  <TagComments value={value} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </article>
  )
}
