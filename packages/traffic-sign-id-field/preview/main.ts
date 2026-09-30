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

const EXAMPLES = [
  'DE:274[30],1020-30',
  'DE:240',
  'DE:244.1,1022-10',
  'DE:city_limit',
  'DE:274[30];DE:everything-is-fine',
  '',
]

const appNode = document.querySelector('#app')
if (!appNode) throw new Error('missing #app')
const app = d3_select(appNode)

const context: TrafficSignFieldContext = {
  container: () => app as never,
  graph: () => ({ entity: () => ({ tags: {} }) }),
  cleanTagValue: (value: string) => value.trim(),
  asset: (path: string) => path,
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

let tags: Record<string, string | undefined> = { traffic_sign: EXAMPLES[0] }

const field = createTrafficSignField(
  { key: 'traffic_sign', type: 'trafficSign', safeid: 'traffic_sign' },
  context,
  adapters,
)

const formField = app.select('.form-field')

field.on('change', (change: Record<string, string | undefined>) => {
  tags = { ...tags, ...change }
  for (const key of Object.keys(tags)) {
    if (tags[key] === undefined) delete tags[key]
  }
  renderTagOutput()
})

formField.call(field as never)
field.tags(tags)

// --- Preview chrome: tag output + example buttons ---------------------------

const output = d3_select('#tag-output')

function renderTagOutput() {
  const value = tags.traffic_sign
  output.text(value ? `traffic_sign = ${value}` : '(no traffic_sign tag)')
}

const examples = d3_select('#examples')
for (const example of EXAMPLES) {
  examples
    .append('button')
    .attr('type', 'button')
    .attr('class', 'example')
    .text(example === '' ? '(empty)' : example)
    .on('click', () => {
      tags = example ? { traffic_sign: example } : {}
      field.tags(tags)
      renderTagOutput()
    })
}

renderTagOutput()
