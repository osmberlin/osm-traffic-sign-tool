import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@app/app/_components/catalyst/table'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import { trafficSignsWiki } from '@internal/wiki'
import { countryPrefixes, SignType, trafficSignData } from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'
import Image from 'next/image'

export async function generateStaticParams() {
  return countryPrefixes.map((prefx) => ({
    countryPrefix: prefx,
  }))
}

type WikiSign = (typeof trafficSignsWiki)[number]

const Tablelize = ({ data }: { data: SignType | WikiSign }) => {
  return (
    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeader>key</TableHeader>
          <TableHeader>value</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(data).map(([key, value]) => {
          if (!key) return null
          return (
            <TableRow key={key}>
              <TableCell className="w-40">
                <strong>{key}</strong>
              </TableCell>
              <TableCell>
                {Array.isArray(value) ? (
                  JSON.stringify(value, undefined, 2)
                ) : key.toLocaleLowerCase().includes('url') ? (
                  <ExternalLink href={value} blank>
                    {value}
                  </ExternalLink>
                ) : key.toLocaleLowerCase().includes('svg') ? (
                  <Image src={value} height={50} width={50} alt={key} />
                ) : (
                  value
                )}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default function SignsPage() {
  const toolSigns: (SignType & { wiki?: WikiSign })[] = structuredClone(trafficSignData)

  for (const sign of toolSigns) {
    const wiki = trafficSignsWiki.find((wikiSign) => wikiSign.sign.includes(sign.osmValuePart))
    sign.wiki = wiki
  }
  const missingInTool = trafficSignsWiki.filter(
    (sign) => !toolSigns.some((s) => s.wiki?.sign === sign.sign),
  )

  return (
    <article className="rounded bg-stone-300 px-6 py-4">
      <h2 className="my-4 text-3xl font-light uppercase text-black">
        Wiki Signs Missing in Tool Signs {missingInTool.length}
      </h2>
      <details>
        <summary>Anzeigen</summary>
        {missingInTool.map((sign) => (
          <Tablelize key={sign.sign} data={sign} />
        ))}
      </details>

      <hr className="my-10" />

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
          {toolSigns.map((sign) => {
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
                <TableCell className="align-top">
                  <pre className="w-96 overflow-y-scroll py-1 text-sm leading-4">
                    {JSON.stringify(sign, undefined, 2)}
                  </pre>
                </TableCell>
                <TableCell className="align-top">
                  <div className="w-96 overflow-x-scroll">
                    {/* {JSON.stringify(sign.wiki, undefined, 2)} */}
                    {sign.wiki ? (
                      <Tablelize key={sign.wiki?.sign} data={sign.wiki} />
                    ) : (
                      <small className="text-amber-700">MISSING</small>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </article>
  )
}
