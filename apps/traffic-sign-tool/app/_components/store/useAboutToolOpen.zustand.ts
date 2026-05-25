import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TAboutToolOpen = {
  isOpen: boolean
  actions: { setIsOpen: (isOpen: boolean) => void }
}

const useAboutToolOpenStore = create<TAboutToolOpen>()(
  persist(
    (set) => ({
      isOpen: true,
      actions: {
        setIsOpen: (isOpen) => {
          set({ isOpen })
        },
      },
    }),
    {
      name: 'osm-traffic-sign-tool:about-tool-open',
      partialize: (state) => ({ isOpen: state.isOpen }),
    },
  ),
)

export const useAboutToolOpen = () => useAboutToolOpenStore((state) => state.isOpen)

export const useAboutToolOpenActions = () => useAboutToolOpenStore((state) => state.actions)
