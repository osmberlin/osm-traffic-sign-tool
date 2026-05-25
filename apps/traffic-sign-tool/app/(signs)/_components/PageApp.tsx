import { ResultColumn } from './PageApp/ResultColumn'
import { SelectedSignsColumn } from './PageApp/SelectedSignsColumn'
import { FocusFilterRow } from './PageApp/signGroups/FocusFilterRow'
import { SignSelectionColumn } from './PageApp/SignSelectionColumn'
import { CountryPrefixProvider } from './store/CountryPrefixContext'
import { PageProps } from './types'

export const PageApp = ({ countryPrefix, trafficSignData }: PageProps) => {
  return (
    <CountryPrefixProvider countryPrefix={countryPrefix}>
      <div className="flex w-full flex-col gap-4">
        <FocusFilterRow />
        <article className="flex w-full flex-col gap-4 md:grid md:grid-cols-[minmax(0,1fr)_12rem_18rem] lg:grid-cols-[minmax(0,1fr)_15rem_24rem]">
          <section className="@container/sign-selection relative min-w-0 rounded-sm bg-stone-300 px-6 py-4 @max-sm/sign-selection:px-4">
            <SignSelectionColumn trafficSignData={trafficSignData} />
          </section>
          <section className="relative min-w-0 rounded-sm bg-stone-300 py-4">
            <h2 className="mb-4 text-center text-lg font-light uppercase">Selected Signs</h2>
            <SelectedSignsColumn />
          </section>
          <section className="relative min-w-0 rounded-sm border border-white bg-stone-900 px-4 py-4 text-stone-100 md:border-0">
            <ResultColumn />
          </section>
        </article>
      </div>
    </CountryPrefixProvider>
  )
}
