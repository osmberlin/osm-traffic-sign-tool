import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import taginfoTrafficSignData from '@monorepo/data/taginfo/taginfoTrafficSignData.json'
import { countryPrefixes } from '@osm-traffic-signs/converter'
import { z } from 'zod'
import { TagRecommendations } from './_components/TagRecommendations'
import { TagSignImages } from './_components/TagSignImages'

export async function generateStaticParams() {
  return countryPrefixes.map((prefx) => ({
    countryPrefix: prefx,
  }))
}

const Schema = z.array(z.tuple([z.string(), z.number()]))

export default function TaginfoPage() {
  const data = Schema.parse(taginfoTrafficSignData)

  return (
    <main className="rounded bg-stone-300 px-6 py-4">
      <h2 className="my-4 flex items-center gap-3 text-3xl font-light uppercase text-black">
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

      <table className="mt-10 min-w-full">
        <thead className="border-white-300 border-b-2 bg-white/20">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-stone-900 sm:pl-6"
            >
              Sign key
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">
              Images
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">
              Usage number from taginfo
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">
              Links
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">
              Tag recommendations
            </th>
          </tr>
        </thead>
        <tbody className="divide-white-200 divide-y-4">
          {data.map(([value, usageCount]) => {
            return (
              <tr key={value}>
                <th className="py-4 pl-4 pr-3 text-left text-sm text-stone-900 sm:pl-6">
                  <code>{value}</code>
                </th>
                <td className="whitespace-nowrap px-3 py-4 text-right text-stone-900">
                  {usageCount.toLocaleString()} &times;
                </td>
                <td className="px-3 py-4 text-sm text-stone-900">
                  <TagSignImages value={value} />
                </td>
                <td className="px-3 py-4 text-sm text-stone-500">
                  <ExternalLink href={`/DE?signs=${value}`}>This tool</ExternalLink>
                  <br />
                  <ExternalLink
                    href={`https://osmtools.de/traffic_signs/?sign=?signs=${value.replace('DE:', '')}`}
                  >
                    osmtools.de
                  </ExternalLink>
                </td>
                <td className="px-3 py-4 text-sm text-stone-900">
                  <TagRecommendations value={value} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  )
}
