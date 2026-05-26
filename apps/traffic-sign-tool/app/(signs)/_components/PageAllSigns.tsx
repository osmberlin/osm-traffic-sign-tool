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
import { PackageSvgTrafficSign } from './PackageSvgTrafficSign'
import { CountryPrefixProvider } from './store/CountryPrefixContext'
import { PageProps } from './types'

export const PageAllApp = ({ countryPrefix, trafficSignData }: PageProps) => {
  return (
    <CountryPrefixProvider countryPrefix={countryPrefix}>
      <ContentPageLayout>
        <h2 className="my-4 text-3xl font-light text-black uppercase">
          Full sign list {trafficSignData.length}
        </h2>
        <p>
          All the signs that are defined in this tool and{' '}
          <ExternalLink href="https://www.npmjs.com/package/@osm-traffic-signs/converter">
            the NPM package that it is using
          </ExternalLink>
          .
        </p>

        <ContentTable>
          <ContentTableHead>
            <ContentTableRow>
              <ContentTableHeader className="w-[18%]">Sign key</ContentTableHeader>
              <ContentTableHeader>Raw sign config data</ContentTableHeader>
            </ContentTableRow>
          </ContentTableHead>
          <ContentTableBody>
            {trafficSignData.map((sign) => {
              return (
                <ContentTableRow key={sign.osmValuePart}>
                  <ContentTableHeader className="space-y-3 text-center">
                    <code>{sign.osmValuePart}</code>
                    <br />
                    <PackageSvgTrafficSign sign={sign} className="inline-block h-auto w-20" />
                  </ContentTableHeader>
                  <ContentTableCell>
                    <pre className={contentPreClass}>{JSON.stringify(sign, undefined, 2)}</pre>
                  </ContentTableCell>
                </ContentTableRow>
              )
            })}
          </ContentTableBody>
        </ContentTable>
      </ContentPageLayout>
    </CountryPrefixProvider>
  )
}
