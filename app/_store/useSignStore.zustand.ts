import { trafficSigns } from '@/data/trafficSigns'
import { TrafficSign } from '@/data/types'
import { create } from 'zustand'
import { buildUrlKey } from '../_components/signs/utils/urlKey/buildUrlKey'

export type TSignStore = {
  signStore: TrafficSign[]
  actions: { updateSignValues: (signKey: string, signValue: string) => void }
}

const useSignStore = create<TSignStore>()((set) => ({
  signStore: trafficSigns,
  actions: {
    updateSignValues: (signKey, signValue) => {
      set(({ signStore }) => {
        const signInStore = signStore.find((s) => s.signKey === signKey)
        if (!signInStore) return { signStore }

        signInStore.urlKey = buildUrlKey(signKey, signValue)
        signInStore.signValue = signValue

        return { signStore }
      })
    },
  },
}))

export const useSignStoreSigns = () => useSignStore((state) => state.signStore)

export const useSignStoreActions = () => useSignStore((state) => state.actions)
