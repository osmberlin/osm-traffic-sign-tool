import { ExternalLink } from '@app/app/_components/links/ExternalLink'

type Props = {
  osmKey: string
  lang?: 'DE' | 'US'
}

export const WikiLinkKey = ({ osmKey, lang = 'DE' }: Props) => {
  const wikiLink = 'https://wiki.openstreetmap.org/wiki/'
  const splitKeys: string[] = osmKey.split(':')

  const links = splitKeys.map((keyPart) => {
    const link = `${wikiLink}${lang}:Key:${keyPart}`
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
