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
  test('quoted strings with commas', () => {
    const result = splitIntoSignValueParts('a,"b,c",d')
    expect(result).toMatchObject(['a', '"b,c"', 'd'])
  })
  test('quoted free-text sign', () => {
    const result = splitIntoSignValueParts('244.1,"Kfz-Verkehr frei"')
    expect(result).toMatchObject(['244.1', '"Kfz-Verkehr frei"'])
  })
  test('mixed brackets and quotes', () => {
    const result = splitIntoSignValueParts('274[60],"Kfz frei"')
    expect(result).toMatchObject(['274[60]', '"Kfz frei"'])
  })
})
