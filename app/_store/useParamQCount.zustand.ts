import { create } from 'zustand'

export type TParamQCount = {
  paramQCount: number | undefined
  actions: { setParamQCount: (count: number) => void }
}

const useParamQCount = create<TParamQCount>()((set) => ({
  paramQCount: undefined,
  actions: {
    setParamQCount: (count) => {
      set({ paramQCount: count })
    },
  },
}))

export const useParamQCountNumber = () => useParamQCount((state) => state.paramQCount)

export const useParamQCountActions = () => useParamQCount((state) => state.actions)
