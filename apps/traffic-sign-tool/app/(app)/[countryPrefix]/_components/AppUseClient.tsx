'use client'
import { ResultColumn } from './ResultColumn'
import { SelectedSignsColumn } from './SelectedSignsColumn'
import { SignSelectionColumn } from './SignSelectionColumn'

export const AppUseClient = () => {
  return (
    <main className="flex gap-4">
      <section className="relative rounded bg-stone-300 px-6 py-4">
        <SignSelectionColumn />
      </section>

      <section className="relative w-56 flex-none rounded bg-stone-300 py-4">
        <h2 className="mb-4 text-center text-lg font-light uppercase">Selected Signs</h2>

        <SelectedSignsColumn />
      </section>

      <section className="relative w-96 flex-none rounded bg-stone-900 px-4 py-4 text-stone-100">
        <ResultColumn />
      </section>
    </main>
  )
}
