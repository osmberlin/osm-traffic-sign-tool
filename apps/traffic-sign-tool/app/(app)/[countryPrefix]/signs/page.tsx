import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@app/app/_components/catalyst/table'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import trafficSignsWiki from '@monorepo/data/wiki/parseWiki/trafficSignsWiki.json'
import { countryPrefixes, trafficSignData } from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'
import Image from 'next/image'

export async function generateStaticParams() {
  return countryPrefixes.map((prefx) => ({
    countryPrefix: prefx,
  }))
}

export default function SignsPage() {
  return (
    <article className="rounded bg-stone-300 px-6 py-4">
      <h2 className="my-4 text-3xl font-light uppercase text-black">
        All signs {trafficSignData.length}
      </h2>
      <p>
        This page is to understand, debug and improve the trafficSigns object that is the source of
        data for this app.{' '}
        <ExternalLink href="https://github.com/osmberlin/osm-traffic-sign-tool/issues/2" blank>
          Learn more…
        </ExternalLink>
      </p>

      <Table className="mt-10">
        <TableHead>
          <TableRow>
            <TableHeader>Sign key</TableHeader>
            <TableHeader>Sign data from this app</TableHeader>
            <TableHeader>Sign data parsed from the wiki</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {trafficSignData.map((sign) => {
            return (
              <TableRow
                key={sign.osmValuePart}
                className={clsx(sign?.image?.svgPath ? '' : 'bg-amber-300')}
              >
                <TableHeader className="space-y-3 text-center align-top">
                  <code>{sign.osmValuePart}</code>
                  <br />
                  {sign?.image?.svgPath ? (
                    <Image
                      height={100}
                      width={100}
                      src={sign.image.svgPath}
                      alt={sign.name}
                      className="inline-block h-auto w-20"
                    />
                  ) : (
                    <span className="inline-block text-amber-700">Missing</span>
                  )}
                </TableHeader>
                <TableCell>
                  <pre className="w-96 overflow-y-scroll py-1 text-sm leading-4">
                    {JSON.stringify(
                      sign,
                      (key, value) => {
                        if (key === 'wikiData') return undefined // Remove the key from the output
                        return value
                      },
                      2,
                    )}
                  </pre>
                </TableCell>
                <TableCell>
                  <pre className="w-96 overflow-scroll">
                    {JSON.stringify(
                      trafficSignsWiki.find((wikiSign) => wikiSign.sign === sign.osmValuePart),
                      undefined,
                      2,
                    )}
                  </pre>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </article>
  )
}
