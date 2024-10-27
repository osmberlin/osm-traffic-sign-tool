import { describe, expect, test } from 'vitest'
import { splitIntoSignValueParts } from './splitIntoSignValueParts.js'

describe('splitIntoSignValueParts()', () => {
  test(';,', () => {
    const result = splitIntoSignValueParts('a;b,c;d')
    expect(result).toMatchObject(['a', 'b', 'c', 'd'])
  })
  test('[,]', () => {
    const result = splitIntoSignValueParts('a[x,y]')
    expect(result).toMatchObject(['a[x,y]'])
  })
  test('complex', () => {
    const result = splitIntoSignValueParts('a;b,c[x,y];d,e,f[y,x]')
    expect(result).toMatchObject(['a', 'b', 'c[x,y]', 'd', 'e', 'f[y,x]'])
  })
  test('cleanup whitespace', () => {
    const result = splitIntoSignValueParts(' a ; b , c[x.y] ; d , e , f[y,x]')
    expect(result).toMatchObject(['a', 'b', 'c[x.y]', 'd', 'e', 'f[y,x]'])
  })
})
