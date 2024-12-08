import { countries, countryDefinitions, trafficSignTagToSigns } from '@osm-traffic-signs/converter'
import { CheckCombinationTable } from './_components/CheckCombinationTable'

export async function generateStaticParams() {
  return countries.map((prefx) => ({
    countryPrefix: prefx,
  }))
}

export default async function SignsPage({
  params: { countryPrefix },
}: {
  params: Awaited<ReturnType<typeof generateStaticParams>>[number]
}) {
  const trafficSignData = countryDefinitions[countryPrefix]
  const primarySigns = trafficSignData.filter((sign) => sign.kind === 'traffic_sign')
  const modifierSigns = trafficSignData.filter((sign) => sign.kind !== 'traffic_sign')

  const list = primarySigns
    .map((sign) => {
      if (sign?.compatibility?.canReceiveModifiers === false) {
        return [trafficSignTagToSigns(sign.osmValuePart, countryPrefix)]
      }
      const signPlusModifierSigns = modifierSigns.map((modifierSign) => {
        return trafficSignTagToSigns(
          [sign.osmValuePart, modifierSign.osmValuePart].join(','),
          countryPrefix,
        )
      })
      return signPlusModifierSigns
    })
    .flat()

  return (
    <article className="rounded bg-stone-300 px-6 py-4">
      <h2 className="my-4 text-3xl font-light uppercase text-black">
        Check primary sign & modifier sign list combinations ({list.length.toLocaleString('de-DE')})
      </h2>
      <p>
        Each primary sign ({primarySigns.length.toLocaleString('de-DE')}) combined with each
        modifier sign ({modifierSigns.length.toLocaleString('de-DE')})
      </p>

      <CheckCombinationTable list={list} />
    </article>
  )
}
