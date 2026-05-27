import { useParamFocus } from '@app/app/(signs)/_components/store/useParamFocus.search'
import { useParamQ } from '@app/app/(signs)/_components/store/useParamQ.search'
import { useParamQCountActions } from '@app/app/(signs)/_components/store/useParamQCount.zustand'
import * as m from '@app/paraglide/messages'
import { filterSignsByFocus, SignType } from '@osm-traffic-signs/converter'
import { useEffect } from 'react'
import { SignGrid } from './SignGrid'

type Props = { trafficSignData: SignType[] }

export const SignGridSearchQuery = ({ trafficSignData }: Props) => {
  const { paramQ } = useParamQ()
  const { focuses } = useParamFocus()
  const { setParamQCount } = useParamQCountActions()

  const focusFilteredData = filterSignsByFocus(trafficSignData, focuses)

  const searchSigns = focusFilteredData.filter((sign) => {
    if (!paramQ) return true
    const term = paramQ.toLocaleLowerCase()

    // Let's keep it simple for now and search on a partial object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { image: _image, catalogue: _catalogue, ...searchObject } = sign
    const searchObjectWithRedirects = {
      ...searchObject,
      redirects: sign.redirects?.map((r) => r.from).join(' '),
    }
    return JSON.stringify(searchObjectWithRedirects, undefined, 0)
      .toLocaleLowerCase()
      .includes(term)
  })

  useEffect(() => {
    setParamQCount(searchSigns.length)
  }, [searchSigns, setParamQCount])

  if (!paramQ) return null

  return <SignGrid headline={m.search_results()} signs={searchSigns} />
}
