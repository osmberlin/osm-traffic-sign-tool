import { buildTaginfoSignGithubIssueUrl } from '@app/app/(signs)/_components/PageTaginfoComparison/taginfoComparisonIssueFormat'
import { getTrafficSignWikiLinkParts } from '@app/app/(signs)/_components/wiki/wikiLinkTrafficSignParts'
import { WikiLinkTrafficSignValueItem } from '@app/app/(signs)/_components/wiki/WikiLinkTrafficSignValueItem'
import { buttonStyle } from '@app/app/_components/links/buttonStyles'
import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import { linkStyle } from '@app/app/_components/links/linkStyles'
import { osmtoolsUrl } from '@app/app/_components/links/osmtoolsUrl'
import * as m from '@app/paraglide/messages'
import type { CountryPrefixType } from '@osm-traffic-signs/converter'
import { Link } from '@tanstack/react-router'
import { clsx } from 'clsx'

type Props = {
  value: string
  usageCount: number
  countryPrefix: CountryPrefixType
}

const actionListClassName = 'list-disc space-y-1 pl-4'

export const TaginfoRowActions = ({ value, usageCount, countryPrefix }: Props) => {
  return (
    <div className="space-y-3">
      <ul className={actionListClassName}>
        <li>
          <Link
            to="/$lang"
            params={{ lang: countryPrefix }}
            search={{ signs: value }}
            target="_blank"
            className={linkStyle}
          >
            {m.taginfo_this_tool_link()}
          </Link>
        </li>
        <li>
          <ExternalLink href={osmtoolsUrl(value, countryPrefix)} blank className={linkStyle}>
            osmtools.de
          </ExternalLink>
        </li>
        {getTrafficSignWikiLinkParts(value, countryPrefix).map(({ key, osmValue }) => (
          <WikiLinkTrafficSignValueItem
            key={key}
            osmValue={osmValue}
            linkLabel={m.taginfo_osm_wiki_link()}
          />
        ))}
      </ul>
      <ExternalLink
        href={buildTaginfoSignGithubIssueUrl(value, usageCount, countryPrefix)}
        className={clsx(buttonStyle, 'w-fit whitespace-nowrap')}
        blank
      >
        {m.wiki_open_github_issue()}
      </ExternalLink>
    </div>
  )
}
