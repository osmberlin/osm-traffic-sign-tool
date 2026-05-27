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
import { catalogueHtmlLang } from '@app/src/features/routing/lang'
import { SignStateType } from '@osm-traffic-signs/converter'
import { WikiSign } from '../page'

const isImageUrl = (value: string) => /^(https?:|data:image\/)/i.test(value)

export const Tablelize = ({ data }: { data: Partial<SignStateType> | Partial<WikiSign> }) => {
  const catalogueLangAttr = catalogueHtmlLang('DE')

  return (
    <ContentTable className="mt-3" lang={catalogueLangAttr}>
      <ContentTableHead>
        <ContentTableRow>
          <ContentTableHeader className="w-[30%]">key</ContentTableHeader>
          <ContentTableHeader>value</ContentTableHeader>
        </ContentTableRow>
      </ContentTableHead>
      <ContentTableBody>
        {Object.entries(data).map(([key, value]) => {
          if (!key) return null
          return (
            <ContentTableRow key={key}>
              <ContentTableCell>
                <strong>{key}</strong>
              </ContentTableCell>
              <ContentTableCell>
                {typeof value === 'boolean' ? (
                  JSON.stringify(value)
                ) : Array.isArray(value) || typeof value === 'object' ? (
                  <pre className={contentPreClass}>
                    <code>{JSON.stringify(value, undefined, 1)}</code>
                  </pre>
                ) : key.toLocaleLowerCase().includes('url') ? (
                  <ExternalLink href={String(value)} blank>
                    {String(value)}
                  </ExternalLink>
                ) : isImageUrl(String(value)) ? (
                  <img src={String(value)} height={50} width={50} alt={key} />
                ) : (
                  String(value)
                )}
              </ContentTableCell>
            </ContentTableRow>
          )
        })}
      </ContentTableBody>
    </ContentTable>
  )
}
