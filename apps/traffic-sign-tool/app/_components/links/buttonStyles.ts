export const buttonStyle =
  'inline-flex items-center rounded-full border border-transparent bg-violet-600 px-3 py-1.5 text-xs font-regular text-white shadow-xs enabled:hover:bg-violet-800 focus:outline-hidden focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:text-gray-900'

export const buttonStyleSecondary =
  'inline-flex items-center rounded-full border border-violet-50 bg-violet-200 px-3 py-1.5 text-xs font-regular text-violet-700 enabled:hover:bg-violet-300 focus:outline-hidden focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:text-gray-900'

/** Shared surface for compact stone pill controls (language switcher, info toggles, …). */
export const stonePillSurface =
  'rounded-full bg-stone-700/90 shadow-lg ring-1 ring-stone-600/80 backdrop-blur-sm hover:bg-stone-600'

export const stonePillFocus =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-800'

export const stonePillButton = `inline-flex items-center text-stone-100 ${stonePillSurface} ${stonePillFocus}`

export const stonePillWarningSurface =
  'rounded-full bg-orange-200 shadow-lg ring-1 ring-orange-400 hover:bg-orange-300 text-orange-900'
