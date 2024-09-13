import { alternativeKeyFormats } from '@/data/alternativeKeyFormats'
import { useRef } from 'react'
import { splitUrlKey } from '../_components/signs/utils/urlKey/splitUrlKey'
import { useParamSigns } from './useParamSigns.nuqs'
import { useSignStoreActions } from './useSignStore.zustand'

export const useInitialize = () => {
  const { paramSigns, setParamSigns } = useParamSigns()
  const { updateSignValues } = useSignStoreActions()

  // Run only once
  const firstRender = useRef<boolean>(true)
  if (firstRender.current === false) return

  // Part 1: Normalize `sign` param values
  // When someone deep links into the app using an alternative key format, we update it to follow the pattern that we use internally
  const newParamSigns = paramSigns
    .map((urlKey) => {
      const transformedUrlKey = alternativeKeyFormats.get(urlKey)
      if (transformedUrlKey) {
        return transformedUrlKey
      }
      return urlKey
    })
    .filter(Boolean)

  setParamSigns(newParamSigns)

  // Part 2: Update the store values
  // Custom values need to applied to the store initially
  paramSigns.forEach((urlKey) => {
    const { signKey, signValue } = splitUrlKey(urlKey)
    if (signValue) {
      updateSignValues(signKey, signValue)
    }
  })

  firstRender.current = false
}
