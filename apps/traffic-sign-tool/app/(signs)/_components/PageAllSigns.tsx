import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@app/app/_components/catalyst/table'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import { PackageSvgTrafficSign } from './PackageSvgTrafficSign'
import { CountryPrefixProvider } from './store/CountryPrefixContext'
import { PageProps } from './types'

export const PageAllApp = ({ countryPrefix, trafficSignData }: PageProps) => {
  return (
    <CountryPrefixProvider countryPrefix={countryPrefix}>
      <article className="rounded-sm bg-stone-300 px-6 py-4">
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

        <Table className="mt-10">
          <TableHead>
            <TableRow>
              <TableHeader>Sign key</TableHeader>
              <TableHeader>Raw sign data</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {trafficSignData.map((sign) => {
              return (
                <TableRow key={sign.osmValuePart}>
                  <TableHeader className="space-y-3 text-center align-top">
                    <code>{sign.osmValuePart}</code>
                    <br />
                    <PackageSvgTrafficSign sign={sign} className="inline-block h-auto w-20" />
                  </TableHeader>
                  <TableCell className="align-top">
                    <pre className="w-full overflow-x-scroll leading-tight">
                      {JSON.stringify(sign, undefined, 2)}
                    </pre>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </article>
    </CountryPrefixProvider>
  )
}
