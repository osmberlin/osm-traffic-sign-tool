import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@app/app/_components/catalyst/table'
import { trafficSignsWiki } from '@internal/wiki'
import { countries, SignStateType, trafficSignTagToSigns } from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'
import Image from 'next/image'
import { PackageSvgTrafficSign } from '../_components/PackageSvgTrafficSign'
import { Tablelize } from './_components/Tablelize'

export async function generateStaticParams() {
  return countries.map((prefx) => ({
    countryPrefix: prefx,
  }))
}

export type WikiSign = (typeof trafficSignsWiki)[number]

export default async function WikiPage({
  params: { countryPrefix },
}: {
  params: Awaited<ReturnType<typeof generateStaticParams>>[number]
}) {
  const innerTrafficSignsWiki: (WikiSign & { toolSign?: SignStateType })[] = trafficSignsWiki
  let missingSignCount = 0
  for (const sign of innerTrafficSignsWiki) {
    const cleanSign = sign.sign.replace('traffic_sign', '')
    sign.toolSign = trafficSignTagToSigns(cleanSign, countryPrefix).at(0)
    if (!sign.toolSign) {
      missingSignCount++
    }
  }

  return (
    <article className="rounded bg-stone-300 px-6 py-4">
      <h2 className="my-4 text-3xl font-light uppercase text-black">
        All Wiki Signs {innerTrafficSignsWiki.length} — {missingSignCount} missing
      </h2>
      <p>
        This page is to understand, debug and improve the trafficSigns object that is the source of
        data for this app.
      </p>

      <Table className="mt-10">
        <TableHead>
          <TableRow>
            <TableHeader>Sign key</TableHeader>
            <TableHeader>Wiki Data</TableHeader>
            <TableHeader>Package Data</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {innerTrafficSignsWiki.map((sign) => {
            const { toolSign, imageSvg: _, ...restsign } = sign
            return (
              <TableRow key={sign.sign} className={clsx(sign?.toolSign ? '' : 'bg-amber-300')}>
                <TableHeader className="space-y-3 text-center align-top">
                  <code>{sign.sign}</code>
                </TableHeader>
                <TableCell className="relative align-top">
                  <div className="w-96 overflow-x-scroll">
                    {restsign ? (
                      <>
                        {sign?.imageSvg ? (
                          <Image
                            height={100}
                            width={100}
                            src={sign?.imageSvg}
                            alt={sign.name}
                            className="absolute right-1 top-1 size-20"
                            title="Image from source URL"
                          />
                        ) : (
                          <span className="inline-block text-amber-700">Missing</span>
                        )}
                        <Tablelize key={restsign.sign} data={restsign} />
                      </>
                    ) : (
                      <small className="text-amber-700">MISSING</small>
                    )}
                  </div>
                </TableCell>
                <TableCell className="relative align-top">
                  {toolSign?.recodgnizedSign ? (
                    <div className="w-96 overflow-x-scroll">
                      <PackageSvgTrafficSign
                        sign={toolSign}
                        className="absolute right-1 top-1 size-20"
                      />
                      <Tablelize key={toolSign.osmValuePart} data={toolSign} />
                    </div>
                  ) : (
                    <p className="text-center text-2xl font-semibold text-pink-700">MISSING</p>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </article>
  )
}
