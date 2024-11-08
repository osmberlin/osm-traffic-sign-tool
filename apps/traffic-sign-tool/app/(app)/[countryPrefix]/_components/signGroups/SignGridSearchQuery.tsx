'use client'
import { useParamQ } from '@app/app/_store/useParamQ.nuqs'
import { useParamQCountActions } from '@app/app/_store/useParamQCount.zustand'
import { trafficSignData } from '@osm-traffic-signs/converter'
import { useEffect, useMemo } from 'react'
import { SignGrid } from './SignGrid'

export const SignGridSearchQuery = () => {
  const { paramQ } = useParamQ()
  const { setParamQCount } = useParamQCountActions()

  const searchSigns = useMemo(() => {
    const result = trafficSignData.filter((sign) => {
      if (!paramQ) return true
      return (
        sign.osmValuePart.toLocaleLowerCase().includes(paramQ) ||
        sign.descriptiveName?.toLocaleLowerCase()?.includes(paramQ) ||
        sign.description?.toLocaleLowerCase()?.includes(paramQ)
      )
    })
    return result
  }, [paramQ])

  useEffect(() => {
    setParamQCount(searchSigns.length)
  }, [searchSigns, setParamQCount])

  if (!paramQ || !searchSigns.length) return null

  return <SignGrid headline="Suchergebnisse" signs={searchSigns} />
}
