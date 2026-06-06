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
import { linkStyle } from '@app/app/_components/links/linkStyles'
import { catalogueHtmlLang } from '@app/src/features/routing/lang'
import { useCurrentLang } from '@app/src/features/routing/useCurrentLang'
import type { WikiSign } from '@internal/wiki'
import { SignStateType } from '@osm-traffic-signs/converter'
import clsx from 'clsx'

const isImageUrl = (value: string) => /^(https?:|data:image\/)/i.test(value)

const hiddenComparisonKeys = new Set(['recodgnizedSign'])

type Props = {
  data: Partial<SignStateType> | Partial<WikiSign>
  compact?: boolean
}

export const WikiComparisonTablelize = ({ data, compact = false }: Props) => {
  const countryPrefix = useCurrentLang()
  const catalogueLangAttr = catalogueHtmlLang(countryPrefix)

  const cellClassName = compact ? '!px-2 !py-0.5' : undefined
  const preClassName = compact
    ? 'whitespace-pre-wrap break-words text-[11px] leading-tight'
    : contentPreClass

  return (
    <ContentTable
      className={compact ? '!mt-1 text-xs leading-tight' : '!mt-3'}
      lang={catalogueLangAttr}
    >
      {!compact ? (
        <ContentTableHead>
          <ContentTableRow>
            <ContentTableHeader className="w-[30%]">key</ContentTableHeader>
            <ContentTableHeader>value</ContentTableHeader>
          </ContentTableRow>
        </ContentTableHead>
      ) : null}
      <ContentTableBody>
        {Object.entries(data).map(([key, value]) => {
          if (!key || hiddenComparisonKeys.has(key)) return null
          return (
            <ContentTableRow key={key}>
              <ContentTableCell className={cellClassName}>
                <strong className={compact ? 'text-xs font-medium' : undefined}>{key}</strong>
              </ContentTableCell>
              <ContentTableCell className={cellClassName}>
                {typeof value === 'boolean' ? (
                  JSON.stringify(value)
                ) : Array.isArray(value) || typeof value === 'object' ? (
                  <pre className={preClassName}>
                    <code>{JSON.stringify(value, undefined, 1)}</code>
                  </pre>
                ) : key.toLocaleLowerCase().includes('url') ? (
                  <ExternalLink
                    href={String(value)}
                    blank
                    className={clsx(linkStyle, compact && 'text-xs')}
                  >
                    {String(value)}
                  </ExternalLink>
                ) : isImageUrl(String(value)) ? (
                  <img
                    src={String(value)}
                    alt={key}
                    className={compact ? 'h-8 w-8 object-contain' : 'h-12 w-12 object-contain'}
                  />
                ) : (
                  <span className={compact ? 'text-xs leading-tight' : undefined}>
                    {String(value)}
                  </span>
                )}
              </ContentTableCell>
            </ContentTableRow>
          )
        })}
      </ContentTableBody>
    </ContentTable>
  )
}
