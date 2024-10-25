'use client'
import { useParamQ } from '@app/app/_store/useParamQ.nuqs'
import { useParamQCountActions } from '@app/app/_store/useParamQCount.zustand'
import { useParamSigns } from '@app/app/_store/useParamSigns.nuqs'
import { useEffect, useMemo } from 'react'
import { SignGrid } from './SignGrid'

export const SignGridSearchQuery = () => {
  const { paramSigns } = useParamSigns()
  const { paramQ } = useParamQ()
  const { setParamQCount } = useParamQCountActions()

  const searchSigns = useMemo(() => {
    return paramSigns.filter((sign) => {
      if (!paramQ) return true
      if (sign.recodgnizedSign === false) return true
      return (
        sign.osmValuePart.toLocaleLowerCase().includes(paramQ) ||
        sign.descriptiveName?.toLocaleLowerCase()?.includes(paramQ) ||
        sign.description?.toLocaleLowerCase()?.includes(paramQ)
      )
    })
  }, [paramQ, paramSigns])

  useEffect(() => {
    setParamQCount(searchSigns.length)
  }, [searchSigns, setParamQCount])

  if (!paramQ || !searchSigns.length) return null

  return <SignGrid headline="Suchergebnisse" signs={searchSigns} />
}
