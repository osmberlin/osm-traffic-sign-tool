'use client'
import { useParamQ } from '@/app/_store/useParamQ.nuqs'
import { useParamQCountActions } from '@/app/_store/useParamQCount.zustand'
import { TSignStore } from '@/app/_store/useSignStore.zustand'
import { useEffect, useMemo } from 'react'
import { SignGrid } from './SignGrid'

type Props = {
  signStore: TSignStore['signStore']
}

export const SignGridSearchQuery = ({ signStore }: Props) => {
  const { paramQ } = useParamQ()
  const { setParamQCount } = useParamQCountActions()
  const searchSigns = useMemo(() => {
    return signStore.filter((sign) => {
      if (!paramQ) return true
      return (
        sign.signKey.toLocaleLowerCase().includes(paramQ) ||
        sign.descriptiveName?.toLocaleLowerCase()?.includes(paramQ) ||
        sign.description?.toLocaleLowerCase()?.includes(paramQ)
      )
    })
  }, [paramQ, signStore])

  useEffect(() => {
    setParamQCount(searchSigns.length)
  }, [searchSigns, setParamQCount])

  if (!paramQ || !searchSigns.length) return null
  return <SignGrid headline="Suchergebnisse" signs={searchSigns} />
}
