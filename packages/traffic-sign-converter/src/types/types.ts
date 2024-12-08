// https://twitter.com/mattpocockuk/status/1653403198885904387
export type Prettify<T> = { [K in keyof T]: T[K] } & {}
