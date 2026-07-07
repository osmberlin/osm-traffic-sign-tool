/**
 * Generate the checked-in per-country MapLibre sprite sheets from the registry `ok` entries.
 *
 *   src/data/sprites/trafficsigns_<cc>.json      (+ .png)      pixelRatio 1
 *   src/data/sprites/trafficsigns_<cc>@2x.json   (+ @2x.png)   pixelRatio 2
 *   src/data/sprites/manifest.json               which sheets exist (+ unsupported icons)
 *
 * Each candidate icon is first render-probed in an isolated subprocess so a native resvg panic
 * on a corrupt source SVG can't abort the whole build; failures are skipped and recorded.
 *
 * Deterministic output (stable order, fixed compression) so `git status` stays clean.
 * Run: `bun run sprites:generate` (regenerates the registry inputs on the fly).
 */
import { resolve } from 'node:path'
import type { RegistryCountry, SpriteManifest } from '../src/registry/types.ts'
import { buildRegistry, svgPath } from './buildRegistry.ts'
import { buildSpriteSheet, type SpriteIcon } from './buildSpriteSheet.ts'

const SPRITES_DIR = resolve(import.meta.dir, '../src/data/sprites')
const PROBE = resolve(import.meta.dir, 'probeSvg.ts')
const BASE_HEIGHT_PX = 24
const PROBE_CONCURRENCY = 8
const RATIOS = [
  { ratio: 1, suffix: '' },
  { ratio: 2, suffix: '@2x' },
] as const

// Sentinel icons so a generated sheet is drop-in for Panoramax's `0_many` / `0_unknown` keys.
const SENTINELS: SpriteIcon[] = [
  {
    key: '0_unknown',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#e8e8e8" stroke="#9aa0a6" stroke-width="2"/><text x="24" y="34" font-family="sans-serif" font-size="30" font-weight="700" text-anchor="middle" fill="#5f6368">?</text></svg>`,
  },
  {
    key: '0_many',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect x="9" y="13" width="26" height="26" rx="4" fill="#f4f4f4" stroke="#9aa0a6" stroke-width="2"/><rect x="15" y="9" width="26" height="26" rx="4" fill="#e8e8e8" stroke="#5f6368" stroke-width="2"/></svg>`,
  },
]

/** Render-probe SVG files in an isolated subprocess; returns the set of paths that failed. */
async function probeFailures(paths: string[]): Promise<Set<string>> {
  const failures = new Set<string>()
  for (let i = 0; i < paths.length; i += PROBE_CONCURRENCY) {
    const batch = paths.slice(i, i + PROBE_CONCURRENCY)
    const results = await Promise.all(
      batch.map(async (path) => {
        const proc = Bun.spawn(['bun', PROBE, path], { stdout: 'ignore', stderr: 'ignore' })
        return { path, code: await proc.exited }
      }),
    )
    for (const { path, code } of results) if (code !== 0) failures.add(path)
  }
  return failures
}

const { byCountry } = await buildRegistry()

const manifest: SpriteManifest = { sheets: [] }

for (const country of byCountry) {
  const okEntries = country.entries.filter((entry) => entry.status === 'ok')
  if (okEntries.length === 0) continue

  // Dedupe: several detection classes can share one osmValue → one sprite key.
  const candidates: { key: string; path: string }[] = []
  const seen = new Set<string>()
  for (const entry of okEntries) {
    const key = entry.spriteKey!
    if (seen.has(key)) continue
    seen.add(key)
    candidates.push({ key, path: svgPath(country.country, entry.svgName!) })
  }

  const failedPaths = await probeFailures(candidates.map((c) => c.path))
  const unsupportedKeys: string[] = []
  const icons: SpriteIcon[] = [...SENTINELS]
  for (const c of candidates) {
    if (failedPaths.has(c.path)) {
      unsupportedKeys.push(c.key)
      continue
    }
    icons.push({ key: c.key, svg: await Bun.file(c.path).text() })
  }
  unsupportedKeys.sort()

  const baseName = `trafficsigns_${country.country.toLowerCase()}`
  for (const { ratio, suffix } of RATIOS) {
    const { png, index } = buildSpriteSheet(icons, {
      pixelRatio: ratio,
      baseHeightPx: BASE_HEIGHT_PX,
    })
    await Bun.write(resolve(SPRITES_DIR, `${baseName}${suffix}.png`), png)
    await Bun.write(
      resolve(SPRITES_DIR, `${baseName}${suffix}.json`),
      `${JSON.stringify(index, null, 2)}\n`,
    )
  }

  manifest.sheets.push({
    country: country.country as RegistryCountry,
    spriteBaseName: baseName,
    keyCount: icons.length,
    unsupportedKeys,
  })
  const skipped = unsupportedKeys.length
    ? ` (skipped ${unsupportedKeys.length}: ${unsupportedKeys.join(', ')})`
    : ''
  console.log(`${country.country}: ${icons.length} icons → ${baseName}(.json/.png + @2x)${skipped}`)
}

manifest.sheets.sort((a, b) => a.country.localeCompare(b.country))
await Bun.write(resolve(SPRITES_DIR, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Wrote manifest with ${manifest.sheets.length} sheets.`)
