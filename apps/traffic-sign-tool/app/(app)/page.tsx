'use client'
import { Route } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Redirect() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const url = new URL('/DE', window.location.href)
    for (const [key, value] of params) {
      url.searchParams.append(key, value)
    }
    router.push(url.toString() as Route)
  }, [params, router])

  return null
}
