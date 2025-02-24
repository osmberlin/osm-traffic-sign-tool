'use client'
import { Route } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { countryPrefixFallback } from './_components/store/CountryPrefixContext'

export default function Redirect() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const url = new URL(`/${countryPrefixFallback}}`, window.location.href)
    for (const [key, value] of params) {
      url.searchParams.append(key, value)
    }
    router.push(url.toString() as Route)
  }, [params, router])

  return null
}
