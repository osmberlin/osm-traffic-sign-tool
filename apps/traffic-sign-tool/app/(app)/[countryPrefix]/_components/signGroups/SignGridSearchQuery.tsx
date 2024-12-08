'use client'
import { useParamQ } from '@app/app/_store/useParamQ.nuqs'
import { useParamQCountActions } from '@app/app/_store/useParamQCount.zustand'
import { SignType } from '@osm-traffic-signs/converter'
import { useEffect, useMemo } from 'react'
import { SignGrid } from './SignGrid'

type Props = { trafficSignData: SignType[] }

export const SignGridSearchQuery = ({ trafficSignData }: Props) => {
  const { paramQ } = useParamQ()
  const { setParamQCount } = useParamQCountActions()

  const searchSigns = useMemo(() => {
    const result = trafficSignData.filter((sign) => {
      if (!paramQ) return true
      const term = paramQ.toLocaleLowerCase()

      // Let's keep it simple for now and search on a partial object
      const { image: _, catalogue: __, ...searchObject } = sign
      return JSON.stringify(searchObject, undefined, 0).toLocaleLowerCase().includes(term)
    })
    return result
  }, [paramQ, trafficSignData])

  useEffect(() => {
    setParamQCount(searchSigns.length)
  }, [searchSigns, setParamQCount])

  if (!paramQ) return null

  return <SignGrid headline="Suchergebnisse" signs={searchSigns} />
}
