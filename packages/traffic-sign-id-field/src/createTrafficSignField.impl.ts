import type { CountryPrefixType, SignStateType, SignType } from '@osm-traffic-signs/converter'
import { dispatch as d3_dispatch } from 'd3-dispatch'
import { drag as d3_drag } from 'd3-drag'
import { select as d3_select } from 'd3-selection'
import { buildToolUrl } from './buildToolUrl.js'
import { resolveCountryPrefix } from './resolveCountryPrefix.js'
import { searchCatalogue } from './searchCatalogue.js'
import { isSignExcludedByCompatibility } from './signCompatibility.js'
import { parseTagToSigns, serializeSignsToTag } from './signValue.js'
import type {
  ComboboxItem,
  ConverterModule,
  D3Selection,
  SignRowData,
  TrafficSignFieldAdapters,
  TrafficSignFieldContext,
  TrafficSignFieldDefinition,
} from './types.js'

const SIGN_VALUE_DEBOUNCE_MS = 300

const hasValuePrompt = (
  sign: SignStateType,
): sign is SignStateType & { valuePrompt: NonNullable<SignStateType['valuePrompt']> } =>
  sign.recodgnizedSign && 'valuePrompt' in sign && !!sign.valuePrompt

export const createTrafficSignField = (
  field: TrafficSignFieldDefinition,
  context: TrafficSignFieldContext,
  adapters: TrafficSignFieldAdapters,
) => {
  const dispatch = d3_dispatch('change')
  const {
    uiCombobox,
    utilGetSetValue,
    utilNoAuto,
    utilRebind,
    svgIcon,
    t,
    loadConverter,
    loadCountryCatalogue,
    getSvgAssetUrl,
  } = adapters

  let _formField = d3_select(null) as unknown as D3Selection
  let _container = d3_select(null) as unknown as D3Selection
  let _list = d3_select(null) as unknown as D3Selection
  let _addRow = d3_select(null) as unknown as D3Selection
  let _input = d3_select(null) as unknown as D3Selection
  let _entityIDs: string[] = []
  let _tags: Record<string, string | string[] | undefined> = {}
  let _signs: SignStateType[] = []
  let _countryPrefix: CountryPrefixType | undefined
  let _catalogue: SignType[] | null = null
  let _converter: ConverterModule | null = null
  let _readyPromise: Promise<void> | null = null
  const _signValueUpdateTimers = new Map<number, ReturnType<typeof setTimeout>>()

  const _combobox = uiCombobox(context, 'traffic-sign-' + (field.safeid || field.key))

  const ensureReady = () => {
    _readyPromise ??= loadConverter().then(async (converter) => {
      _converter = converter
    })
    return _readyPromise
  }

  const loadCatalogue = async (countryPrefix: CountryPrefixType | undefined) => {
    if (!countryPrefix) {
      _catalogue = null
      return
    }

    try {
      const mod = await loadCountryCatalogue(countryPrefix)
      _catalogue = mod.trafficSignData
    } catch {
      _catalogue = null
    }
  }

  const getTagValue = () => {
    const value = _tags[field.key]
    return Array.isArray(value) ? undefined : value
  }

  const translate = (key: string, fallback: string) => t(key, { default: fallback })

  const dispatchTagChange = (signs: SignStateType[]) => {
    if (!_converter) return
    _signs = signs
    renderSignRows()
    renderToolLink()
    const nextValue = serializeSignsToTag(_converter, signs, _countryPrefix)
    const change: Record<string, string | undefined> = {
      [field.key]: nextValue,
    }
    dispatch.call('change', trafficSign, change)
  }

  const syncFromTags = async () => {
    await ensureReady()
    if (!_converter) return

    const tagValue = getTagValue()
    _countryPrefix = await resolveCountryPrefix({
      tagValue,
      entityIDs: _entityIDs,
      context,
      adapters,
      converter: _converter,
    })

    await loadCatalogue(_countryPrefix)
    _signs = parseTagToSigns(_converter, tagValue, _countryPrefix)
    renderSignRows()
    renderToolLink()
    renderOrderHint()
  }

  const getSignLabel = (sign: SignStateType) => {
    if ('descriptiveName' in sign && sign.descriptiveName) return sign.descriptiveName
    if ('name' in sign && sign.name) return sign.name
    return sign.osmValuePart
  }

  // Row title. Unrecognized signs would just repeat the raw code from the
  // code line below — show a translated "Unknown sign" instead.
  const getSignTitle = (sign: SignStateType) => {
    if (!sign.recodgnizedSign) {
      return translate('traffic_sign_field.unknown_sign', 'Unknown sign')
    }
    return getSignLabel(sign)
  }

  // Hover text: the long description when we have one, the official name otherwise.
  const getSignHoverText = (sign: SignStateType) => {
    if (!sign.recodgnizedSign) {
      return translate('traffic_sign_field.unknown_sign', 'Unknown sign')
    }
    if ('description' in sign && sign.description) return sign.description
    if ('name' in sign && sign.name) return sign.name
    return getSignLabel(sign)
  }

  const getSignSvgName = (sign: SignStateType) => {
    if (!_converter || !_countryPrefix) return null
    if (sign.svgName) return sign.svgName
    return _converter.createSvgImportname(_countryPrefix, sign.osmValuePart)
  }

  const getCommittedSignValue = (
    sign: SignStateType & { valuePrompt: { defaultValue?: string | number } },
  ) => {
    if ('signValue' in sign && sign.signValue !== undefined && sign.signValue !== '') {
      return sign.signValue
    }
    return sign.valuePrompt.defaultValue ?? ''
  }

  const cancelPendingSignValueUpdate = (index: number) => {
    const pending = _signValueUpdateTimers.get(index)
    if (pending) {
      clearTimeout(pending)
      _signValueUpdateTimers.delete(index)
    }
  }

  const updateSignValue = (index: number, newValue: string) => {
    if (!_converter) return

    const sign = _signs[index]
    if (!sign || !hasValuePrompt(sign)) return

    const { signId } = _converter.splitSignIdSignValue(sign.osmValuePart)
    const defaultValue = sign.valuePrompt.defaultValue
    const newOrFallbackValue = newValue ? newValue : defaultValue

    const updated = {
      ...sign,
      signValue: newValue,
      osmValuePart: _converter.combineSignIdSignValue(signId, newOrFallbackValue),
    } as SignStateType

    _signs = _signs.map((entry, entryIndex) => (entryIndex === index ? updated : entry))
    dispatchTagChange(_signs)
  }

  const updateSignValueDebounced = (index: number, newValue: string) => {
    cancelPendingSignValueUpdate(index)
    _signValueUpdateTimers.set(
      index,
      setTimeout(() => {
        _signValueUpdateTimers.delete(index)
        updateSignValue(index, newValue)
      }, SIGN_VALUE_DEBOUNCE_MS),
    )
  }

  const removeSign = (index: number) => {
    cancelPendingSignValueUpdate(index)
    _signs = _signs.filter((_, i) => i !== index)
    dispatchTagChange(_signs)
  }

  const moveSign = (index: number, delta: number) => {
    const target = index + delta
    if (target < 0 || target >= _signs.length) return
    const next = [..._signs]
    const [moved] = next.splice(index, 1)
    if (!moved) return
    next.splice(target, 0, moved)
    _signs = next
    dispatchTagChange(_signs)
    const handle = _list.selectAll('.traffic-sign-row__drag').nodes()[target]
    handle?.focus()
  }

  const renderToolLink = () => {
    if (_formField.empty()) return

    const button = _formField.select('.field-label').selectAll('.traffic-sign-tool-link').data([0])
    const merged = (button.enter() as D3Selection)
      .insert('button', '.remove-icon')
      .attr('type', 'button')
      .attr('class', 'traffic-sign-tool-link')
      .attr('title', translate('traffic_sign_field.open_tool', 'Open in Traffic Sign Tool'))
      .call(svgIcon('#iD-icon-out-link'))
      .on('click', (event: Event) => {
        event.preventDefault()
        event.stopPropagation()
        if (!_countryPrefix) return
        const tagValue = getTagValue() || ''
        window.open(buildToolUrl({ countryPrefix: _countryPrefix, tagValue }), '_blank', 'noopener')
      })
      .merge(button as D3Selection)

    if (!_countryPrefix) {
      merged.style('display', 'none')
      return
    }

    merged.style('display', null)
  }

  const renderOrderHint = () => {
    if (_formField.empty()) return

    const body = _formField.select('.tag-reference-body')
    if (body.empty()) return

    const hint = body.selectAll('.traffic-sign-order-hint').data([0])
    ;(hint.enter() as D3Selection)
      .append('p')
      .attr('class', 'tag-reference-description traffic-sign-order-hint')
      .merge(hint as D3Selection)
      .text(
        translate(
          'traffic_sign_field.order_hint',
          'Signs are read top to bottom. The top sign is the main sign.',
        ),
      )
  }

  const renderValuePrompt = (bodySelection: D3Selection, row: SignRowData) => {
    const promptData = hasValuePrompt(row.sign) ? [row] : []
    const prompt = bodySelection.selectAll('.traffic-sign-row__value-prompt').data(promptData)

    prompt.exit().remove()

    const enter = prompt.enter().append('label').attr('class', 'traffic-sign-row__value-prompt')

    enter.append('span').attr('class', 'traffic-sign-row__value-label')

    enter
      .append('input')
      .attr('type', 'text')
      .attr('class', 'traffic-sign-row__value-input')
      .call(utilNoAuto)
      .on('input', function (event: Event, d: unknown) {
        const rowData = d as SignRowData
        const input = event.target as HTMLInputElement
        updateSignValueDebounced(rowData.index, input.value)
      })
      .on('blur', function (event: Event, d: unknown) {
        const rowData = d as SignRowData
        const input = event.target as HTMLInputElement
        cancelPendingSignValueUpdate(rowData.index)
        updateSignValue(rowData.index, input.value)
      })

    const merged = enter.merge(prompt as D3Selection)

    merged
      .select('.traffic-sign-row__value-label')
      .text((rowData: SignRowData) => {
        if (!hasValuePrompt(rowData.sign)) return ''
        return `${rowData.sign.valuePrompt.prompt}:`
      })
      .attr('title', (rowData: SignRowData) =>
        hasValuePrompt(rowData.sign) ? rowData.sign.valuePrompt.prompt : null,
      )

    merged.select('.traffic-sign-row__value-input').each(function (rowData: SignRowData) {
      if (!hasValuePrompt(rowData.sign) || !_converter) return

      const input = d3_select(this) as unknown as D3Selection
      const inputNode = input.node() as HTMLInputElement
      const { type, step } = _converter.getValuePromptInputAttributes(
        rowData.sign.valuePrompt.format,
      )
      const committedValue = getCommittedSignValue(rowData.sign)

      input
        .attr('type', type)
        .attr('step', step ?? null)
        .attr('id', `${field.domId || field.key}-value-${rowData.index}`)

      if (document.activeElement !== inputNode) {
        input.property('value', committedValue)
      }
    })
  }

  // Key rows on the sign id (not the full `osmValuePart`) so typing in the
  // value prompt — which rewrites `osmValuePart` — reuses the DOM node and
  // keeps the input focused.
  const getRowKey = (row: SignRowData) => {
    const signId = 'signId' in row.sign && row.sign.signId
    return (signId || row.sign.osmValuePart) + ':' + row.index
  }

  const renderSignRows = () => {
    if (_list.empty()) return

    const emptyHint = _list
      .selectAll('.traffic-sign-empty')
      .data(_signs.length === 0 ? [0] : []) as unknown as D3Selection
    emptyHint.exit().remove()
    ;(emptyHint.enter() as D3Selection)
      .append('li')
      .attr('class', 'traffic-sign-empty')
      .text(
        translate(
          'traffic_sign_field.empty',
          'No signs yet. Search below by name or sign ID to add one.',
        ),
      )

    const rows = _list.selectAll<HTMLElement, SignRowData>('.traffic-sign-row').data(
      _signs.map((sign, index) => ({ index, sign })),
      getRowKey,
    )

    rows.exit().remove()

    const enter = rows
      .enter()
      .append('li')
      .attr('class', 'traffic-sign-row chip')
      .each(function (row) {
        const rowSelection = d3_select(this) as unknown as D3Selection

        rowSelection
          .append('button')
          .attr('type', 'button')
          .attr('class', 'traffic-sign-row__drag')
          .attr('title', translate('traffic_sign_field.drag', 'Drag or use arrow keys to reorder'))
          .attr(
            'aria-label',
            translate('traffic_sign_field.drag', 'Drag or use arrow keys to reorder'),
          )
          .text('⋮⋮')
          .on('keydown', (event: Event, d: unknown) => {
            const keyboardEvent = event as KeyboardEvent
            if (keyboardEvent.key !== 'ArrowUp' && keyboardEvent.key !== 'ArrowDown') return
            keyboardEvent.preventDefault()
            keyboardEvent.stopPropagation()
            moveSign((d as SignRowData).index, keyboardEvent.key === 'ArrowUp' ? -1 : 1)
          })

        const figure = rowSelection.append('figure').attr('class', 'traffic-sign-row__icon')

        if (row.sign.recodgnizedSign && _countryPrefix) {
          const svgName = getSignSvgName(row.sign)
          if (svgName) {
            figure
              .append('img')
              .attr('class', 'traffic-sign-row__img')
              .attr('src', getSvgAssetUrl(_countryPrefix, svgName))
              .attr('alt', getSignLabel(row.sign))
          }
        } else {
          figure.append('span').attr('class', 'traffic-sign-row__unknown').text('?')
        }

        const body = rowSelection.append('div').attr('class', 'traffic-sign-row__body')
        body.append('div').attr('class', 'traffic-sign-row__title').text(getSignTitle(row.sign))
        const meta = body.append('div').attr('class', 'traffic-sign-row__meta')
        meta.append('code').attr('class', 'traffic-sign-row__code').text(row.sign.osmValuePart)

        rowSelection
          .append('button')
          .attr('type', 'button')
          .attr('class', 'traffic-sign-row__remove remove-icon')
          .attr('title', translate('icons.remove', 'remove'))
          .call(svgIcon('#iD-operation-delete'))
          .on('click', (event: Event, d: unknown) => {
            event.preventDefault()
            event.stopPropagation()
            removeSign((d as SignRowData).index)
          })
      })

    const merged = enter.merge(rows as unknown as D3Selection)

    // `select()` propagates the (re-bound) row datum down to the child
    // elements, which keeps the datum-based event handlers above current.
    merged.select('.traffic-sign-row__drag')
    merged.select('.traffic-sign-row__remove')

    merged.attr('title', (row: SignRowData) => getSignHoverText(row.sign))

    merged.select('.traffic-sign-row__title').text((row: SignRowData) => getSignTitle(row.sign))

    merged.select('.traffic-sign-row__code').text((row: SignRowData) => row.sign.osmValuePart)

    merged.select('.traffic-sign-row__img').attr('src', (row: SignRowData) => {
      if (!row.sign.recodgnizedSign || !_countryPrefix) return null
      const svgName = getSignSvgName(row.sign)
      return svgName ? getSvgAssetUrl(_countryPrefix, svgName) : null
    })

    merged.each(function (row: SignRowData) {
      renderValuePrompt(
        d3_select(this).select('.traffic-sign-row__meta') as unknown as D3Selection,
        row,
      )
    })

    registerDragAndDrop(merged)
  }

  const registerDragAndDrop = (selection: D3Selection) => {
    let dragOrigin: { x: number; y: number } | undefined
    let targetIndex: number | null = null

    selection.call(
      d3_drag<HTMLElement, SignRowData>()
        .on('start', function (event) {
          dragOrigin = { x: event.x, y: event.y }
          targetIndex = null
        })
        .on('drag', function (event) {
          const row = d3_select(this)
          const rowNode = row.node() as HTMLElement
          const x = event.x - dragOrigin!.x
          const y = event.y - dragOrigin!.y

          if (!row.classed('dragging') && Math.sqrt(x * x + y * y) <= 5) {
            return
          }

          const index = selection.nodes().indexOf(rowNode)
          row.classed('dragging', true)
          targetIndex = null

          _list.selectAll('.traffic-sign-row').style('transform', function (_row, index2) {
            const rowNode = this as HTMLElement
            if (index === index2) {
              return `translate(${x}px, ${y}px)`
            }
            if (index2 > index && event.y > rowNode.offsetTop) {
              targetIndex = targetIndex === null || index2 > targetIndex ? index2 : targetIndex
              return 'translateY(-100%)'
            }
            if (index2 < index && event.y < rowNode.offsetTop + rowNode.offsetHeight) {
              targetIndex = targetIndex === null || index2 < targetIndex ? index2 : targetIndex
              return 'translateY(100%)'
            }
            return null
          })
        })
        .on('end', function () {
          if (!d3_select(this).classed('dragging')) return

          const index = selection.nodes().indexOf(this)
          d3_select(this).classed('dragging', false)
          _list.selectAll('.traffic-sign-row').style('transform', null)

          if (typeof targetIndex === 'number' && index !== targetIndex) {
            const next = [..._signs]
            const [moved] = next.splice(index, 1)
            if (moved) {
              next.splice(targetIndex, 0, moved)
              _signs = next
              dispatchTagChange(_signs)
            }
          }

          dragOrigin = undefined
          targetIndex = null
        }) as unknown as (sel: D3Selection) => void,
    )
  }

  const addSignValue = (rawValue: string) => {
    const value = context.cleanTagValue(rawValue.trim())
    if (!value || !_converter || !_countryPrefix) return

    let parsed = parseTagToSigns(_converter, value, _countryPrefix)

    // The user typed a search term (e.g. a sign name) and pressed Enter
    // without picking a suggestion: add the best catalogue match instead of
    // an unrecognized raw value. Unknown codes still fall through unchanged.
    if (parsed.length > 0 && parsed.every((sign) => !sign.recodgnizedSign) && _catalogue) {
      const [bestMatch] = searchCatalogue(_catalogue, value, {
        exclude: (sign) => isSignExcludedByCompatibility(sign, _signs),
      })
      if (bestMatch) {
        parsed = parseTagToSigns(_converter, bestMatch.osmValuePart, _countryPrefix)
      } else if (searchCatalogue(_catalogue, value).length > 0) {
        // The only matches are incompatible with the existing signs — adding
        // the raw text as an unknown sign would be worse than doing nothing.
        return
      }
    }

    if (parsed.length === 0) return

    _signs = [..._signs, ...parsed]
    utilGetSetValue(_input, '')
    dispatchTagChange(_signs)
  }

  const toComboboxItem = (sign: SignType): ComboboxItem => {
    const title = sign.descriptiveName || sign.name
    return {
      key: sign.osmValuePart,
      value: sign.osmValuePart,
      title: sign.description || sign.name || title,
      display: (selection: D3Selection) => {
        const option = selection.append('span').attr('class', 'traffic-sign-option')

        if (_converter && _countryPrefix) {
          const svgName = _converter.createSvgImportname(_countryPrefix, sign.osmValuePart)
          if (svgName) {
            option
              .append('img')
              .attr('class', 'traffic-sign-option__img')
              .attr('src', getSvgAssetUrl(_countryPrefix, svgName))
              .attr('alt', '')
              .attr('loading', 'lazy')
              .attr('decoding', 'async')
              .on('error', function (this: Element) {
                this.remove()
              })
          }
        }

        const body = option.append('span').attr('class', 'traffic-sign-option__body')
        body.append('span').attr('class', 'traffic-sign-option__title').text(title)
        body.append('code').attr('class', 'traffic-sign-option__code').text(sign.osmValuePart)
      },
    }
  }

  const initCombobox = (input: D3Selection, attachTo: D3Selection) => {
    if (_combobox.off) {
      _combobox.off(context)
    }

    input.call(
      _combobox
        .caseSensitive(true)
        .minItems(1)
        .fetcher((query, callback) => {
          if (!_catalogue) {
            callback([])
            return
          }
          const results = searchCatalogue(_catalogue, query, {
            exclude: (sign) => isSignExcludedByCompatibility(sign, _signs),
          })
          callback(results.map(toComboboxItem))
        }) as unknown as (sel: D3Selection) => void,
      attachTo,
    )
  }

  function trafficSign(selection: D3Selection) {
    void ensureReady().then(() => {
      _formField = selection

      _container = selection.selectAll('.form-field-input-wrap').data([0])
      _container = (_container.enter() as D3Selection)
        .append('div')
        .attr('class', 'form-field-input-wrap form-field-input-traffic-sign')
        .merge(_container)

      _list = _container.selectAll('.traffic-sign-list').data([0])
      _list = (_list.enter() as D3Selection)
        .append('ul')
        .attr('class', 'traffic-sign-list chiplist full-line-chips')
        .merge(_list)

      _addRow = _container.selectAll('.traffic-sign-add-row').data([0])
      _addRow = (_addRow.enter() as D3Selection)
        .append('div')
        .attr('class', 'traffic-sign-add-row')
        .merge(_addRow)

      _input = _addRow.selectAll('input').data([0])
      _input = (_input.enter() as D3Selection)
        .append('input')
        .attr('type', 'text')
        .attr('dir', 'auto')
        .attr('id', field.domId || undefined)
        .attr('placeholder', translate('traffic_sign_field.add_sign', 'Add sign…'))
        .merge(_input)
        .call(utilNoAuto)
        .call(initCombobox, _container)

      _input
        .on('change', () => addSignValue(utilGetSetValue(_input)))
        .on('keydown.field', (event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            _input.node()?.blur()
            event.stopPropagation()
          }
        })
        .on('focus', () => _container.classed('active', true))
        .on('blur', () => _container.classed('active', false))

      _combobox.on('accept', (d?: ComboboxItem) => {
        addSignValue(d?.value ?? utilGetSetValue(_input))
        window.setTimeout(() => _input.node()?.focus(), 10)
      })

      void syncFromTags()
    })
  }

  trafficSign.tags = function (tags: Record<string, string | string[] | undefined>) {
    _tags = tags
    void syncFromTags()
    return trafficSign
  }

  trafficSign.entityIDs = function (entityIDs: string[]) {
    _entityIDs = entityIDs
    return trafficSign
  }

  trafficSign.focus = function () {
    _input.node()?.focus()
    return trafficSign
  }

  return utilRebind(trafficSign, dispatch, 'on')
}
