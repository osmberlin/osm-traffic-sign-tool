import type { SignComentType } from '../../TrafficSignDataTypes.js'

/** Gemeinsamer Hinweis für offizielle „Ende“-Hauptzeichen (z. B. Zonenende). */
export const deEndeHauptzeichenOsmMappingComment: SignComentType = {
  lang: 'de',
  comment:
    '„Ende“-Verkehrszeichen werden in OpenStreetMap idealerweise als Node erfasst. Andernfalls sind sie oft nur implizit kartiert, indem die Geometrie der bisherigen Zone dort endet, wo das Schild steht.',
}
