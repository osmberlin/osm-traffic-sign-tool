import { ResultColumn } from './PageApp/ResultColumn'
import { SelectedSignsColumn } from './PageApp/SelectedSignsColumn'
import { SignSelectionColumn } from './PageApp/SignSelectionColumn'
import { CountryPrefixProvider } from './store/CountryPrefixContext'
import { PageProps } from './types'

export const PageApp = ({ countryPrefix, trafficSignData }: PageProps) => {
  return (
    <CountryPrefixProvider countryPrefix={countryPrefix}>
      <article className="flex flex-col gap-4 md:flex-row">
        <section className="relative rounded-sm bg-stone-300 px-6 py-4">
          <SignSelectionColumn trafficSignData={trafficSignData} />
        </section>
        <section className="relative flex-none rounded-sm bg-stone-300 py-4 md:w-60">
          <h2 className="mb-4 text-center text-lg font-light uppercase">Selected Signs</h2>
          <SelectedSignsColumn />
        </section>
        <section className="relative flex-none rounded-sm border border-white bg-stone-900 px-4 py-4 text-stone-100 md:w-96 md:border-0">
          <ResultColumn />
        </section>
      </article>
    </CountryPrefixProvider>
  )
}
