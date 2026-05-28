import { ContentPageLayout } from '@app/app/_components/layout/ContentPageLayout'
import {
  ContentTable,
  ContentTableBody,
  ContentTableCell,
  ContentTableHead,
  ContentTableHeader,
  ContentTableRow,
  contentPreClass,
} from '@app/app/_components/layout/ContentTable'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import * as m from '@app/paraglide/messages'
import { catalogueHtmlLang } from '@app/src/features/routing/lang'
import { PackageSvgTrafficSign } from './PackageSvgTrafficSign'
import { PageProps } from './types'

export const PageAllApp = ({ countryPrefix, trafficSignData }: PageProps) => {
  const catalogueLangAttr = catalogueHtmlLang(countryPrefix)

  return (
    <ContentPageLayout>
      <h2 className="my-4 text-3xl font-light text-black uppercase">
        {m.page_all_signs_title({ count: String(trafficSignData.length) })}
      </h2>
      <p>
        {m.page_all_signs_intro()}{' '}
        <ExternalLink href="https://www.npmjs.com/package/@osm-traffic-signs/converter">
          {m.page_all_signs_package()}
        </ExternalLink>
        .
      </p>

      <ContentTable>
        <ContentTableHead>
          <ContentTableRow>
            <ContentTableHeader className="w-[18%]">
              {m.page_all_signs_sign_key()}
            </ContentTableHeader>
            <ContentTableHeader>{m.page_all_signs_raw_config()}</ContentTableHeader>
          </ContentTableRow>
        </ContentTableHead>
        <ContentTableBody>
          {trafficSignData.map((sign) => {
            return (
              <ContentTableRow key={sign.osmValuePart}>
                <ContentTableHeader className="space-y-3 text-center">
                  <code lang={catalogueLangAttr}>{sign.osmValuePart}</code>
                  <br />
                  <PackageSvgTrafficSign sign={sign} className="inline-block h-auto w-20" />
                </ContentTableHeader>
                <ContentTableCell lang={catalogueLangAttr}>
                  <pre className={contentPreClass}>{JSON.stringify(sign, undefined, 2)}</pre>
                </ContentTableCell>
              </ContentTableRow>
            )
          })}
        </ContentTableBody>
      </ContentTable>
    </ContentPageLayout>
  )
}
