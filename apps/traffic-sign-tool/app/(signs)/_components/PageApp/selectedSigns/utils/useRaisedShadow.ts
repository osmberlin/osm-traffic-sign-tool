'use client'
import { animate, MotionValue, useMotionValue } from 'framer-motion'
import { useEffect } from 'react'

const inactiveShadow = '0px 0px 0px rgba(0,0,0,0.8)'

// Thanks to the example code by framer motion
export function useRaisedShadow(value: MotionValue<number>) {
  const boxShadow = useMotionValue(inactiveShadow)

  useEffect(() => {
    let isActive = false
    const onChange = (latest: number) => {
      const wasActive = isActive
      if (latest === 0) {
        isActive = false
        if (isActive !== wasActive) {
          animate(boxShadow, inactiveShadow)
        }
      } else {
        isActive = true
        if (isActive !== wasActive) {
          animate(boxShadow, '5px 5px 10px rgba(0,0,0,0.3)')
        }
      }
    }
    const unsubscribeOnChange = value.on('change', onChange)

    return () => {
      unsubscribeOnChange()
    }
  }, [value, boxShadow])

  return boxShadow
}
