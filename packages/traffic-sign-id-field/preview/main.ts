/**
 * Standalone design preview for the traffic sign field.
 * Runs the exact same field implementation and CSS that iD loads, with
 * lightweight stand-ins for iD's helpers (see adapters.ts).
 */
import { select as d3_select } from 'd3-selection'
import { createTrafficSignField } from '../src/createTrafficSignField.impl.js'
import type { TrafficSignFieldAdapters, TrafficSignFieldContext } from '../src/types.js'
import '../src/id-field.css'
import './preview.css'
import {
  svgIcon,
  t,
  uiCombobox,
  uiTooltip,
  utilGetSetValue,
  utilNoAuto,
  utilRebind,
  utilTotalExtent,
} from './adapters.js'

type Tags = Record<string, string | undefined>

// Each example is the "downloaded" version of a way; change its sign in the field to see
// the suggested tags (e.g. DE:237 → DE:240 on the cycleway).
const EXAMPLES: { label: string; tags: Tags }[] = [
  {
    label: 'Cycleway, DE:237',
    tags: { highway: 'cycleway', bicycle: 'designated', traffic_sign: 'DE:237' },
  },
  {
    label: 'Path, DE:241 (not normalized)',
    tags: {
      highway: 'path',
      bicycle: 'designated',
      foot: 'designated',
      segregated: 'yes',
      traffic_sign: 'DE:241',
    },
  },
  {
    label: 'Road, DE:274[30],1020-30',
    tags: { highway: 'residential', traffic_sign: 'DE:274[30],1020-30' },
  },
  {
    label: 'Road, DE:244.1,1022-10',
    tags: { highway: 'residential', traffic_sign: 'DE:244.1,1022-10' },
  },
  { label: 'Road, DE:city_limit', tags: { highway: 'residential', traffic_sign: 'DE:city_limit' } },
  {
    label: 'Road, unknown sign',
    tags: { highway: 'residential', traffic_sign: 'DE:274[30];DE:everything-is-fine' },
  },
  { label: 'Road, no sign', tags: { highway: 'residential' } },
]

const appNode = document.querySelector('#app')
if (!appNode) throw new Error('missing #app')
const app = d3_select(appNode)

const withoutEmpty = (tags: Tags) =>
  Object.fromEntries(Object.entries(tags).filter(([, value]) => value !== undefined)) as Record<
    string,
    string
  >

let baseTags: Tags = EXAMPLES[0]!.tags
let tags: Tags = { ...baseTags }

const context: TrafficSignFieldContext = {
  container: () => app as never,
  graph: () => ({ entity: () => ({ tags: withoutEmpty(tags) }) }),
  cleanTagValue: (value: string) => value.trim(),
  asset: (path: string) => path,
  // The "downloaded" version, which the tag suggestions compare with
  history: () => ({ base: () => ({ hasEntity: () => ({ tags: withoutEmpty(baseTags) }) }) }),
}

const adapters: TrafficSignFieldAdapters = {
  uiCombobox: uiCombobox as never,
  utilRebind: utilRebind as never,
  utilGetSetValue: utilGetSetValue as never,
  utilNoAuto: utilNoAuto as never,
  utilTotalExtent: utilTotalExtent as never,
  uiTooltip: uiTooltip as never,
  svgIcon: svgIcon as never,
  t: t as never,
  countryCoder: { iso1A2Code: () => 'DE' },
  loadConverter: () => import('../../traffic-sign-converter/src/idFieldBrowser.js') as never,
  // Vite needs statically analyzable imports; add countries here as they land.
  loadCountryCatalogue: ((countryPrefix: string) => {
    const catalogues: Record<string, () => Promise<unknown>> = {
      DE: () => import('../../traffic-sign-converter/src/data/DE.js'),
    }
    const load = catalogues[countryPrefix]
    if (!load) return Promise.reject(new Error(`no preview catalogue for ${countryPrefix}`))
    return load()
  }) as never,
  getSvgAssetUrl: (countryPrefix, svgName) => `/${countryPrefix}/svgs/${svgName}.svg`,
}

const field = createTrafficSignField(
  { key: 'traffic_sign', type: 'trafficSign', safeid: 'traffic_sign' },
  context,
  adapters,
)

const formField = app.select('.form-field')

// Like iD: apply the change, then hand the new tags back to the field
field.on('change', (change: Tags) => {
  tags = withoutEmpty({ ...tags, ...change })
  field.tags(tags)
  renderTagOutput()
})

field.entityIDs(['w1'])
formField.call(field as never)
field.tags(tags)

// --- Preview chrome: tag output + example buttons ---------------------------

const output = d3_select('#tag-output')

function renderTagOutput() {
  const lines = Object.entries(withoutEmpty(tags)).map(([key, value]) => `${key}=${value}`)
  output.text(lines.length ? lines.join('\n') : '(no tags)')
}

const examples = d3_select('#examples')
for (const example of EXAMPLES) {
  examples
    .append('button')
    .attr('type', 'button')
    .attr('class', 'example')
    .text(example.label)
    .on('click', () => {
      baseTags = example.tags
      tags = { ...baseTags }
      // A new feature: forget the sign history, like iD does when the selection changes
      field.entityIDs([])
      field.entityIDs(['w1'])
      field.tags(tags)
      renderTagOutput()
    })
}

renderTagOutput()
