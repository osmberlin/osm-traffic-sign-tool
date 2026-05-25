/** All `valuePrompt.format` values used in sign data definitions. */
export const valuePromptFormats = [
  'integer',
  'float',
  'opening_hours',
  'time_restriction',
] as const

export type ValuePromptFormat = (typeof valuePromptFormats)[number]

export type NumericValuePromptFormat = Extract<ValuePromptFormat, 'integer' | 'float'>

export type OpeningHoursValuePromptFormat = Extract<
  ValuePromptFormat,
  'opening_hours' | 'time_restriction'
>

/** HTML `<input>` attributes for each value-prompt format. */
export type ValuePromptInputAttributes = {
  type: 'number' | 'text'
  step?: string
}

export const valuePromptInputFormats = {
  integer: { type: 'number' },
  float: { type: 'number', step: '0.1' },
  opening_hours: { type: 'text' },
  time_restriction: { type: 'text' },
} as const satisfies Record<ValuePromptFormat, ValuePromptInputAttributes>

export const getValuePromptInputAttributes = (
  format: ValuePromptFormat,
): ValuePromptInputAttributes => valuePromptInputFormats[format]

export const isOpeningHoursValuePromptFormat = (
  format: string,
): format is OpeningHoursValuePromptFormat =>
  format === 'opening_hours' || format === 'time_restriction'
