'use client'
import { useParamFocus } from '@app/app/(signs)/_components/store/useParamFocus.search'
import { useParamQ } from '@app/app/(signs)/_components/store/useParamQ.search'
import { useParamQCountActions } from '@app/app/(signs)/_components/store/useParamQCount.zustand'
import { SignType } from '@osm-traffic-signs/converter'
import { useEffect, useMemo } from 'react'
import { filterSignsByFocus } from './focusFilter'
import { SignGrid } from './SignGrid'

type Props = { trafficSignData: SignType[] }

export const SignGridSearchQuery = ({ trafficSignData }: Props) => {
  const { paramQ } = useParamQ()
  const { focuses } = useParamFocus()
  const { setParamQCount } = useParamQCountActions()

  const focusFilteredData = useMemo(
    () => filterSignsByFocus(trafficSignData, focuses),
    [trafficSignData, focuses],
  )

  const searchSigns = useMemo(() => {
    const result = focusFilteredData.filter((sign) => {
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
    return result
  }, [paramQ, focusFilteredData])

  useEffect(() => {
    setParamQCount(searchSigns.length)
  }, [searchSigns, setParamQCount])

  if (!paramQ) return null

  return <SignGrid headline="Suchergebnisse" signs={searchSigns} />
}
