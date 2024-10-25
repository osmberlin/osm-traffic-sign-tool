import { useCountryPrefix } from '@app/app/_store/utils/useCountryPrefix'
import { ExternalLink } from '../links/ExternalLink'

type Props = {
  osmKey: string
  osmValue: string | string[]
}

const wikiLink = 'https://wiki.openstreetmap.org/wiki'

export const wikiLinkClasses =
  'underline decoration-transparent underline-offset-4 hover:decoration-stone-400 hover:decoration-1'

export const WikiLinkValue = ({ osmKey, osmValue }: Props) => {
  const countryPrefix = useCountryPrefix()

  function prepareLinks(values: string[] | undefined) {
    if (!values) return []
    return values.map((valuePart) => {
      const link = `${wikiLink}/${countryPrefix}:Tag:${osmKey}=${valuePart}`

      return {
        link,
        valuePart,
      }
    })
  }

  const orLinks = typeof osmValue === 'string' ? [] : prepareLinks(osmValue)
  const semiLinks = typeof osmValue === 'string' ? prepareLinks(osmValue.split(';')) : []

  return (
    <>
      {orLinks.map(({ link, valuePart }, index) => (
        <span key={index}>
          <ExternalLink href={link} className={wikiLinkClasses} blank>
            {valuePart}
          </ExternalLink>
          {index < orLinks.length - 1 && (
            <>
              {' '}
              <em>or</em>{' '}
            </>
          )}
        </span>
      ))}
      {semiLinks.map(({ link, valuePart }, index) => (
        <span key={index}>
          <ExternalLink href={link} className={wikiLinkClasses} blank>
            {valuePart}
          </ExternalLink>
          {index < semiLinks.length - 1 && ';'}
        </span>
      ))}
    </>
  )
}
