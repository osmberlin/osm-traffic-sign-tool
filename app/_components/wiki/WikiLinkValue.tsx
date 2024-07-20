import { ExternalLink } from '../links/ExternalLink'

type Props = {
  osmKey: string
  osmValue: string | string[]
  lang?: 'DE' | 'US'
}

export const WikiLinkValue = ({ osmKey, osmValue, lang = 'DE' }: Props) => {
  const wikiLink = 'https://wiki.openstreetmap.org/wiki/'

  function prepareLinks(values: string[]) {
    return values.map((valuePart) => {
      if (osmKey === 'traffic_sign' && !valuePart.startsWith('DE:')) {
        valuePart = `DE:${valuePart}`
      }
      const link = `${wikiLink}${lang}:Tag:${osmKey}=${valuePart}`
      return {
        link,
        valuePart,
      }
    })
  }

  const orLinks = Array.isArray(osmValue) ? prepareLinks(osmValue) : []
  const semiLinks = typeof osmValue === 'string' ? prepareLinks(osmValue.split(';')) : []

  return (
    <>
      {orLinks.map(({ link, valuePart }, index) => (
        <span key={index}>
          <ExternalLink
            href={link}
            className="underline decoration-transparent underline-offset-4 hover:decoration-stone-400 hover:decoration-1"
            blank
          >
            {valuePart}
          </ExternalLink>
          {index < orLinks.length - 1 && (
            <>
              {' '}
              <em>or</em>
            </>
          )}
        </span>
      ))}
      {semiLinks.map(({ link, valuePart }, index) => (
        <span key={index}>
          <ExternalLink
            href={link}
            className="underline decoration-transparent underline-offset-4 hover:decoration-stone-400 hover:decoration-1"
            blank
          >
            {valuePart}
          </ExternalLink>
          {index < semiLinks.length - 1 && ';'}
        </span>
      ))}
    </>
  )
}
