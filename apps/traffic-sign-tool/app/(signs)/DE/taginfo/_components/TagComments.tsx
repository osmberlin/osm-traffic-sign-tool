'use client'
import { useCountryPrefixWithFallback } from '@app/app/(signs)/_components/store/CountryPrefixContext'
import { WikiLinkify } from '@app/app/(signs)/_components/wiki/WikiLinkify'
import { signsToComments, trafficSignTagToSigns } from '@osm-traffic-signs/converter'

type Props = { value: string }

// Weitgehend ein Duplikat von apps/traffic-sign-tool/app/(app)/[countryPrefix]/_components/results/ResultComments.tsx
export const TagComments = ({ value }: Props) => {
  const { countryPrefix } = useCountryPrefixWithFallback()
  const signs = trafficSignTagToSigns(value, countryPrefix)
  const signsCommentsMap = signsToComments(signs)

  return (
    <div className="break-all">
      {Array.from(signsCommentsMap).map(([signKey, signComments]) => {
        return (
          <div key={signKey} className="gap-2 px-2 font-serif">
            <h3 className="font-bold">
              Zeichen <code>{signKey}</code>:
            </h3>
            <ul className="space-y-2">
              {signComments.map(({ tagReference, important, comment }) => {
                return (
                  <li key={comment} className={important ? 'text-amber-800' : ''}>
                    {tagReference && (
                      <p>
                        <code>{tagReference}</code>
                      </p>
                    )}
                    <WikiLinkify text={comment} />
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
