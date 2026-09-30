/**
 * Minimal browser implementations of the iD helpers the field consumes via
 * `TrafficSignFieldAdapters`. Behavior mirrors iD's `modules/util` and
 * `modules/ui/combobox.js` closely enough for design work; it is NOT a
 * complete re-implementation.
 */
import { dispatch as d3_dispatch } from 'd3-dispatch'
import { select as d3_select } from 'd3-selection'
import type { ComboboxItem, D3Selection } from '../src/types.js'

// biome-ignore lint: intentionally loose, mirrors iD's untyped helpers
type AnySelection = any

export function utilGetSetValue(selection: AnySelection, value?: string) {
  if (value === undefined) return selection.property('value')
  selection.property('value', value)
  return selection
}

export function utilNoAuto(selection: AnySelection) {
  return selection
    .attr('autocomplete', 'new-password')
    .attr('autocorrect', 'off')
    .attr('autocapitalize', 'off')
    .attr('spellcheck', 'false')
}

export function utilRebind(target: AnySelection, source: AnySelection, ...events: string[]) {
  for (const event of events) {
    target[event] = (...args: unknown[]) => {
      const value = source[event].apply(source, args)
      return value === source ? target : value
    }
  }
  return target
}

export const utilTotalExtent = () => null

export const uiTooltip = () => {
  const tooltip = (_selection: AnySelection) => {}
  tooltip.placement = () => tooltip
  tooltip.title = () => tooltip
  return tooltip
}

const ICON_GLYPHS: Record<string, string> = {
  '#iD-operation-delete': '×', // ×
  '#iD-icon-out-link': '↗', // ↗
}

export const svgIcon = (id: string) => (selection: AnySelection) => {
  selection
    .append('span')
    .attr('class', 'icon preview-icon')
    .attr('aria-hidden', 'true')
    .text(ICON_GLYPHS[id] ?? '?')
}

export const t = (key: string, replacements?: Record<string, string>) =>
  replacements?.default ?? key

/** Just enough of iD's uiCombobox for the field: fetcher, accept, keyboard nav. */
export function uiCombobox(context: { container: () => AnySelection }, klass: string) {
  const dispatch = d3_dispatch('accept', 'cancel', 'update')
  let _fetcher: (query: string, callback: (items: ComboboxItem[]) => void) => void = (_q, cb) =>
    cb([])
  let _suggestions: ComboboxItem[] = []
  let _selectedIndex = -1
  let _input: AnySelection = null
  let _hideTimer: ReturnType<typeof setTimeout> | undefined

  const container = () => context.container()

  const combo = () => container().selectAll(`.combobox.combobox-${klass}`)

  const hide = () => {
    combo().remove()
    _selectedIndex = -1
  }

  const show = () => {
    hide()
    container()
      .append('div')
      .attr('class', `combobox combobox-${klass}`)
      .on('mousedown', (event: Event) => event.preventDefault())
    position()
  }

  const position = () => {
    const inputNode = _input?.node()
    const comboNode = combo().node()
    if (!inputNode || !comboNode) return
    const containerRect = container().node().getBoundingClientRect()
    const rect = inputNode.getBoundingClientRect()
    d3_select(comboNode)
      .style('position', 'absolute')
      .style('left', `${rect.left - containerRect.left}px`)
      .style('top', `${rect.bottom - containerRect.top}px`)
      .style('width', `${rect.width}px`)
  }

  const render = () => {
    if (_suggestions.length === 0) {
      hide()
      return
    }
    if (combo().empty()) show()

    const options = combo()
      .selectAll('.combobox-option')
      .data(_suggestions, (d: ComboboxItem) => d.value)

    options.exit().remove()

    const enter = options
      .enter()
      .append('a')
      .attr('class', 'combobox-option')
      .attr('title', (d: ComboboxItem) => d.title ?? null)
      .each(function (this: Element, d: ComboboxItem) {
        const labelSpan = d3_select(this).append('span').attr('class', 'combobox-option-label')
        if (d.display) {
          d.display(labelSpan as unknown as D3Selection)
        } else {
          labelSpan.text(d.value)
        }
      })
      .on('click', (event: Event, d: ComboboxItem) => {
        event.preventDefault()
        accept(d)
      })

    enter
      .merge(options)
      .classed('selected', (_d: ComboboxItem, i: number) => i === _selectedIndex)
      .order()

    position()
  }

  const accept = (d?: ComboboxItem) => {
    if (d) utilGetSetValue(_input, d.value)
    const value = utilGetSetValue(_input)
    if (value !== '') {
      dispatch.call(
        'accept',
        _input.node(),
        d ?? _suggestions.find((s) => s.value === value),
        value,
      )
    }
    hide()
  }

  const fetch = (query: string, thenRender = true) => {
    _fetcher(query, (items) => {
      _suggestions = items
      if (thenRender) render()
    })
  }

  const combobox = (input: AnySelection, _attachTo?: AnySelection) => {
    _input = input
    input
      .classed('combobox-input', true)
      .on('focus.combobox', () => fetch(utilGetSetValue(input)))
      .on('click.combobox', () => {
        if (combo().empty()) fetch(utilGetSetValue(input))
      })
      .on('blur.combobox', () => {
        _hideTimer = setTimeout(hide, 100)
      })
      .on('input.combobox', () => {
        _selectedIndex = -1
        fetch(utilGetSetValue(input))
      })
      .on('keydown.combobox', (event: KeyboardEvent) => {
        switch (event.key) {
          case 'ArrowDown':
          case 'ArrowUp': {
            event.preventDefault()
            if (combo().empty()) fetch(utilGetSetValue(input))
            const delta = event.key === 'ArrowDown' ? 1 : -1
            _selectedIndex = Math.max(0, Math.min(_selectedIndex + delta, _suggestions.length - 1))
            render()
            break
          }
          case 'Enter': {
            event.preventDefault()
            event.stopPropagation()
            accept(_selectedIndex >= 0 ? _suggestions[_selectedIndex] : undefined)
            break
          }
          case 'Escape':
            hide()
            break
        }
      })
  }

  combobox.fetcher = (fn: typeof _fetcher) => {
    _fetcher = fn
    return combobox
  }
  combobox.caseSensitive = (_v: boolean) => combobox
  combobox.minItems = (_n: number) => combobox
  combobox.on = (event: string, handler: (...args: unknown[]) => void) => {
    dispatch.on(event, handler)
    return combobox
  }
  combobox.off = () => {
    if (_hideTimer) clearTimeout(_hideTimer)
    hide()
  }

  return combobox
}
