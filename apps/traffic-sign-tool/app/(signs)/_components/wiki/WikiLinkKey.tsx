import { ExternalLink } from '@app/app/_components/links/ExternalLink'
import { buildOsmWikiKeyUrl, type CountryPrefixType } from '@osm-traffic-signs/converter'

type Props = {
  osmKey: string
  lang: CountryPrefixType
}

export const WikiLinkKey = ({ osmKey, lang }: Props) => {
  const splitKeys: string[] = osmKey.split(':')

  const links = splitKeys.map((keyPart) => {
    const link = buildOsmWikiKeyUrl(lang, keyPart)
    return {
      link,
      keyPart,
    }
  })

  return (
    <>
      {links.map(({ link, keyPart }, index) => (
        <ExternalLink
          key={index}
          href={link}
          className="underline decoration-transparent underline-offset-4 hover:decoration-stone-400 hover:decoration-1"
          blank
        >
          {keyPart}
          {index < links.length - 1 && ':'}
        </ExternalLink>
      ))}
    </>
  )
}
