/** Light stone surfaces: dark readable text, subtle code chips */
export const proseLightClass =
  'prose prose-sm prose-stone max-w-none ' +
  'prose-code:rounded prose-code:bg-stone-200 prose-code:px-1 prose-code:text-stone-900 ' +
  'prose-code:before:content-none prose-code:after:content-none ' +
  'prose-a:underline prose-a:decoration-stone-700 prose-a:underline-offset-4 prose-a:hover:decoration-stone-900'

/** Dark stone-900 surfaces: light readable text */
export const proseDarkClass =
  'prose prose-sm prose-invert max-w-none ' +
  'prose-code:rounded prose-code:bg-white/10 prose-code:px-1 prose-code:text-stone-100 ' +
  'prose-code:before:content-none prose-code:after:content-none ' +
  'prose-a:underline prose-a:decoration-stone-400 prose-a:underline-offset-4 prose-a:hover:decoration-stone-200'

/** Bare inline code outside prose blocks (table keys, Tag component) */
export const inlineCodeClass = 'rounded bg-stone-200 px-1 font-mono text-sm text-stone-900'

/** Keep micromark `<p>` inline so a trailing translate pill sits at the end of the sentence. */
export const commentWithTranslateInlineClass = '[&_p]:m-0 [&_p]:inline'

/** Shared notes / optional-tag list typography (CommentsList, OptionalTagsMap). */
export const notesListClassName =
  'prose-code:bg-white/10 prose-code:rounded prose-code:px-0.5 prose-white prose-a:underline prose-a:decoration-stone-700 prose-a:underline-offset-4 prose-a:hover:decoration-stone-400 prose-a:hover:decoration-1 prose-code:whitespace-nowrap [&_code]:font-serif [&_code]:text-sm space-y-2 pl-5 font-serif text-sm font-normal break-words text-stone-300'
