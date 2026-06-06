# Fix Sign Combination QA Issues

This skill teaches the agent how to resolve feedback from the Sign combinations QA page (`/DE/check-sign-combinations`).

## When to use this skill

- GitHub issue labeled `combination-qa`.
- User reports wrong OSM tags for a primary + modifier combination.
- User reports a combination that should be blocked but is currently allowed.
- User confirms a combination is allowed and tagging is correct (OK task).
- Keywords: "combination QA", "incompatibleModifiers", "canReceiveModifiers", "confirmedModifiers", "Not OK", "Invalid combination", "OK".

## Issue task types

| Reviewer status | Meaning | Typical fix |
|-----------------|---------|-------------|
| **OK** | Combination is allowed and tag output verified | Add or update `compatibility.confirmedModifiers[<modifierSignId>]` on the primary sign with the confirmation date |
| **Not OK** | Combination is allowed but tag output is wrong | Update `tagRecommendations` on primary/modifier and/or add `signsToTags` test |
| **Invalid combination** | Combination should not be allowed | Update primary `compatibility` (`incompatibleModifiers` or `canReceiveModifiers: false`) |

Each issue task includes:

- Combined tag value (e.g. `DE:237,DE:1020-12`)
- Primary and modifier sign IDs / descriptive names (and `osmValuePart` when shown)
- Current converter tag output
- Reviewer notes (Not OK / Invalid) or confirmation date (OK)

## Instructions

### Step 1: Understand the task (no app required)

1. Read the combined tag value and **current converter tags** from the issue body — that is the baseline to fix or confirm.
2. Compare with reviewer notes and OSM wiki guidance for both signs.
3. Optionally re-run the converter locally (see **CLI helpers** below) after you know what should change.

Also read [`.cursor/skills/add-traffic-sign/SKILL.md`](../add-traffic-sign/SKILL.md) for general sign config conventions.

**Do not start the traffic-sign-tool dev server** for combination QA — the converter package and tests are enough.

### Step 2: Fix **Not OK** tasks (wrong tags)

1. Locate primary and modifier sign objects in `packages/traffic-sign-converter/src/data-definitions/DE/data/`.
2. Schema reference: `packages/traffic-sign-converter/src/data-definitions/TrafficSignDataTypes.ts` (`tagRecommendations`).
3. Adjust `tagRecommendations` on the sign(s) that drive the wrong output. Common fields:
   - `uniqueTags`, `accessTags`, `highwayValues`, `conditionalTags`
4. If wiki documents non-trivial interaction between the two signs, add a targeted test in `packages/traffic-sign-converter/src/signsToTags/signsToTags.test.ts`:

```typescript
test('Combined tags for specific primary + modifier', () => {
  const signs = signsStateByDescriptiveName('DE', data, ['Primary Name', 'Modifier Name'])
  const result = signsToTags(signs, 'DE')
  expect(result.get('maxspeed')).toBe('30')
})
```

5. Run converter tests: `cd packages/traffic-sign-converter && bun test`.

### Step 3: Apply **OK** tasks (record QA confirmation)

1. Find the **primary** traffic sign config entry.
2. Add or update `compatibility.confirmedModifiers` with the modifier `signId` from the task as key and the **confirmation date** from the issue as value (`YYYY-MM-DD`).
3. Preserve existing `incompatibleModifiers` and `canReceiveModifiers` — only add/update the confirmation entry.
4. No tag-output change is expected unless the current converter tags in the task look wrong (treat as **Not OK** instead).

Example:

```typescript
compatibility: {
  incompatibleModifiers: ['1020-12'], // keep existing entries
  confirmedModifiers: {
    '1010-12': '2026-06-06',
  },
},
```

### Step 4: Fix **Invalid combination** tasks (should be blocked)

1. Find the **primary** traffic sign config entry (first sign in the combination).
2. Choose the narrowest compatibility change:
   - **Specific modifier only**: add modifier `signId` to `compatibility.incompatibleModifiers` on the primary sign.
   - **No modifiers at all**: set `compatibility.canReceiveModifiers: false` on the primary sign.
3. Confirm compatibility in config (CLI below) — the QA page treats a pair as blocked when `canReceiveModifiers === false` or the modifier `signId` is listed in `incompatibleModifiers`.
4. Run converter tests.

Example:

```typescript
compatibility: {
  incompatibleModifiers: ['1020-12'], // append; do not remove existing entries
},
```

### Step 5: Verify (no app required)

1. **Tags (Not OK tasks)** — re-run the combination tag helper; output should match reviewer expectation.
2. **Compatibility (Invalid tasks)** — re-run the compatibility helper; `blocked` should be `true` with the expected reason.
3. **Regression** — `cd packages/traffic-sign-converter && bun test`.

Optional: if you added a focused test in Step 2, that test is the long-term guard — you do not need manual CLI checks for that case again.

### Step 6: Open PR

- Start the PR description with `**[Cursor Agent]**`, include `Closes #<issue-number>` (auto-closes the source issue on merge), then `Automated catalogue update for #<issue-number>.`
- Summarize which sign config files changed and why.
- Mention any new `signsToTags` tests.
- Prefix any issue comments with `**[Cursor Agent]**`; do not write as the submitter.

See [`.cursor/rules/github-agent-attribution.mdc`](../rules/github-agent-attribution.mdc).

## CLI helpers

Run from repo root.

**Important:** `PRIMARY` must match the catalogue **`osmValuePart` exactly** (e.g. `237`, `274.1`, `274[47]`). A bare sign number like `274` often fails lookup when the config uses bracket notation — use the value from the issue task or from the tag script’s `recognized:` output. For compatibility checks, `MODIFIER` is also matched by `osmValuePart`, but blocking uses the modifier’s **`signId`** inside `incompatibleModifiers`.

Set `TAG` to the issue’s combined value **without** country prefixes (e.g. `237,1020-12` for `DE:237,DE:1020-12`).

### Combined tag output

```bash
cd packages/traffic-sign-converter && TAG='237,1020-12' bun -e "
import { trafficSignTagToSigns, signsToTags } from './src/index.ts'
const signs = trafficSignTagToSigns(process.env.TAG!, 'DE')
console.log('recognized:', signs.filter(s => s.recodgnizedSign).map(s => s.osmValuePart))
console.log('tags:', Object.fromEntries(signsToTags(signs, 'DE')))
"
```

Use `recognized:` to confirm the exact `osmValuePart` values before running the compatibility helper.

### Compatibility / blocked state (matches QA page rules)

Example: sign **237** (Radweg) blocks modifier **1020-12** via `incompatibleModifiers`.

```bash
cd packages/traffic-sign-converter && PRIMARY='237' MODIFIER='1020-12' bun -e "
import { countryDefinitions } from './src/index.ts'
const data = countryDefinitions.DE
const primary = data.find(s => s.osmValuePart === process.env.PRIMARY && s.kind === 'traffic_sign')
const modifier = data.find(s => s.osmValuePart === process.env.MODIFIER && s.kind !== 'traffic_sign')
if (!primary || !modifier) {
  console.log({ blocked: true, reason: 'unknown sign', primaryFound: Boolean(primary), modifierFound: Boolean(modifier) })
  process.exit(0)
}
if (primary.compatibility?.canReceiveModifiers === false) { console.log({ blocked: true, reason: 'no_modifiers' }); process.exit(0) }
if (primary.compatibility?.incompatibleModifiers?.includes(modifier.signId)) {
  console.log({ blocked: true, reason: 'incompatible_modifier' }); process.exit(0)
}
console.log({ blocked: false })
"
```

Expected for `237` + `1020-12`: `{ blocked: true, reason: 'incompatible_modifier' }`.  
Expected for `237` + `1010-12`: `{ blocked: false }`.

For a single-sign primary with no modifiers (`canReceiveModifiers: false`), use only `PRIMARY`:

```bash
cd packages/traffic-sign-converter && PRIMARY='306' bun -e "
import { countryDefinitions } from './src/index.ts'
const primary = countryDefinitions.DE.find(s => s.osmValuePart === process.env.PRIMARY && s.kind === 'traffic_sign')
console.log({ canReceiveModifiers: primary?.compatibility?.canReceiveModifiers !== false, incompatibleModifiers: primary?.compatibility?.incompatibleModifiers ?? [] })
"
```

Expected: `{ canReceiveModifiers: false, incompatibleModifiers: [] }`.

## Troubleshooting

- **Wrong sign edited**: Combination fixes usually target the **primary** for compatibility, but tag fixes may require changes on either sign.
- **Compatibility still allowed after incompatibleModifiers**: Confirm you used the modifier's `signId` value, not `osmValuePart`, unless they match.
- **Compatibility helper returns `unknown sign`**: `PRIMARY`/`MODIFIER` must match catalogue `osmValuePart` exactly — run the tag helper first and copy values from `recognized:` (e.g. use `274[47]`, not `274`).
- **CLI tags differ from issue body**: You may be on stale built output — edits are in `src/`; tests import source via vitest. Re-run the inline script after saving config changes (no build step needed for `bun -e` with `./src/index.ts`).
- **Large issue with many tasks**: Batch related fixes by primary sign file; run tests after each batch.
