import { ContentPageLayout } from '@app/app/_components/layout/ContentPageLayout'
import {
  ContentTable,
  ContentTableBody,
  ContentTableCell,
  ContentTableHead,
  ContentTableHeader,
  ContentTableRow,
} from '@app/app/_components/layout/ContentTable'
import { trafficSignsWiki } from '@internal/wiki'
import { SignStateType, trafficSignTagToSigns } from '@osm-traffic-signs/converter'
import { clsx } from 'clsx'
import { PackageSvgTrafficSign } from '../../_components/PackageSvgTrafficSign'
import { countryPrefix } from '../_contryPrefix.const'
import { Tablelize } from './_components/Tablelize'

export type WikiSign = (typeof trafficSignsWiki)[number]

export default function WikiPage() {
  const innerTrafficSignsWiki: (WikiSign & { toolSign?: SignStateType })[] =
    structuredClone(trafficSignsWiki)
  let missingSignCount = 0
  for (const sign of innerTrafficSignsWiki) {
    const cleanSign = sign.sign.replace('traffic_sign', '')
    sign.toolSign = trafficSignTagToSigns(cleanSign, countryPrefix).at(0)
    if (!sign.toolSign) {
      missingSignCount++
    }
  }

  return (
    <ContentPageLayout>
      <h2 className="my-4 text-3xl font-light text-black uppercase">
        All Wiki Signs {innerTrafficSignsWiki.length} — {missingSignCount} missing
      </h2>
      <p>
        This page is to understand, debug and improve the trafficSigns object that is the source of
        data for this app.
      </p>

      <ContentTable>
        <ContentTableHead>
          <ContentTableRow>
            <ContentTableHeader className="w-[12%]">Sign key</ContentTableHeader>
            <ContentTableHeader className="w-[44%]">Wiki Data</ContentTableHeader>
            <ContentTableHeader className="w-[44%]">Package Data</ContentTableHeader>
          </ContentTableRow>
        </ContentTableHead>
        <ContentTableBody>
          {innerTrafficSignsWiki.map((sign) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { toolSign, imageSvg: _, ...restsign } = sign
            return (
              <ContentTableRow
                key={sign.sign}
                className={clsx(sign?.toolSign ? '' : 'bg-amber-300')}
              >
                <ContentTableHeader className="space-y-3 text-center">
                  <code>{sign.sign}</code>
                </ContentTableHeader>
                <ContentTableCell className="relative">
                  {restsign ? (
                    <>
                      {sign?.imageSvg ? (
                        <img
                          height={100}
                          width={100}
                          src={sign?.imageSvg}
                          alt={sign.name}
                          className="absolute top-1 right-1 size-20"
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
                </ContentTableCell>
                <ContentTableCell className="relative">
                  {toolSign?.recodgnizedSign ? (
                    <>
                      <PackageSvgTrafficSign
                        sign={toolSign}
                        className="absolute top-1 right-1 size-20"
                      />
                      <Tablelize key={toolSign.osmValuePart} data={toolSign} />
                    </>
                  ) : (
                    <p className="text-center text-2xl font-semibold text-pink-700">MISSING</p>
                  )}
                </ContentTableCell>
              </ContentTableRow>
            )
          })}
        </ContentTableBody>
      </ContentTable>
    </ContentPageLayout>
  )
}
