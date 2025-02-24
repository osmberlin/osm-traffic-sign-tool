import { countries, countryDefinitions } from '@osm-traffic-signs/converter'
import { ResultColumn } from './_components/ResultColumn'
import { SelectedSignsColumn } from './_components/SelectedSignsColumn'
import { SignSelectionColumn } from './_components/SignSelectionColumn'

export async function generateStaticParams() {
  return countries.map((prefx) => ({
    countryPrefix: prefx,
  }))
}

export default function App({
  params: { countryPrefix },
}: {
  params: Awaited<ReturnType<typeof generateStaticParams>>[number]
}) {
  const trafficSignData = countryDefinitions[countryPrefix]

  return (
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
  )
}
