# Add German Traffic Sign

This skill teaches the agent how to research and implement a new German traffic sign into the OSM Traffic Sign Tools project, ensuring data accuracy and SVG optimization.

## When to use this skill

- User provides a GitHub issue about a missing traffic sign.
- User asks to add a specific German traffic sign (e.g., "add sign 1049-13").
- User mentions implementing a new Verkehrszeichen, Zusatzzeichen.
- Keywords: "Verkehrszeichen", "Zusatzzeichen", "Gefahrzeichen", "Vorschriftzeichen", "sign implementation".

## Instructions

### Step 1: Research Sign Information

#### Primary Source: OSM Wiki

- **Main list**: https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland
- **Individual sign pages**: Check specific pages for tagging logic (e.g., [DE:244.1](https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign%3DDE:244.1)).

#### Fallback Source: Wikipedia

- **Wikipedia list**: https://de.wikipedia.org/wiki/Bildtafel_der_Verkehrszeichen_in_der_Bundesrepublik_Deutschland_seit_2017
- Find the SVG image URL on Wikimedia Commons.

#### Data to Collect:

- **Sign ID**: Official number (e.g., `274`, `1040-30`).
- **Names**: Official name ("Zeichen XXX") and a clear descriptive name.
- **SVG Source**: **CRITICAL**: Use the URL to the Wikimedia **File page** (e.g., `https://commons.wikimedia.org/wiki/File:Zeichen_274.svg`), NOT a direct link to a rendered PNG.
- **OSM Tags**: Identify `uniqueTags`, `accessTags`, and `highwayValues`.

### Step 2: Determine Sign Category

Select the correct file in `packages/traffic-sign-converter/src/data-definitions/DE/data/`:

- `hazard.ts`, `infrastructure.ts`, `traffic_ban.ts`, `speed_*.ts`, `overtaking.ts`, `notice.ts`, `exceptions_*.ts`, `conditions_*.ts`, `surface.ts`, `numbers.ts`.

### Step 3: Add Sign Definition

Reference `packages/traffic-sign-converter/src/data-definitions/TrafficSignDataTypes.ts` for schema.

```typescript
{
  osmValuePart: '274',
  signId: '274',
  name: 'Zeichen 274',
  descriptiveName: 'Zulässige Höchstgeschwindigkeit',
  kind: 'traffic_sign',
  tagRecommendations: {
    uniqueTags: [{ key: 'maxspeed', value: '$' }],
    highwayValues: ['residential'],
  },
  valuePrompt: {
    prompt: 'Geschwindigkeit',
    defaultValue: '50',
    format: 'integer'
  },
  catalogue: {
    visibility: 'highlight', // See Visibility Decision Guide
    signCategory: 'speed',
  },
  image: {
    sourceUrl: 'https://...',
    licence: 'Public Domain' // or 'CC-0'
  },
}
```

### Step 3a: Configurable Signs with Bracket Notation and Explicit IDs (Optional)

Some signs exist in multiple variants with different values (e.g., speed zones, incline percentages). These use bracket notation `[value]` for flexibility combined with explicit IDs for common values.

#### Pattern A: Explicit IDs Redirect to Bracket (RECOMMENDED)

Use when the sign has many possible values but only a few common explicit IDs exist. Add the most common values as explicit IDs and uncommon values with brackets. Add redirects for all official IDs so the tool redirects them to the bracket notation.

**Example: Sign 110 (Steigung / Incline)**

```typescript
// 1. Bracket sign with valuePrompt (catch-all for any value)
{
  osmValuePart: '110[10]',
  signId: '110',
  signValue: 10,
  valuePrompt: {
    prompt: 'Steigung in Prozent ohne Einheit',
    defaultValue: '10',
    format: 'integer',
  },
  redirects: [
    { from: '110-11', to: '110[11]' },  // Less common explicit IDs redirect to bracket
    { from: '110-12', to: '110[12]' },
    // ... etc for uncommon values
  ],
  // ... other fields
}

// 2. Common explicit ID signs (NO redirects on these)
{
  osmValuePart: '110-10',
  signId: '110-10',
  // NO redirects property - stays as explicit ID
  // ... other fields
}
```

#### Pattern B: Bracket Values Redirect to Explicit ID (Alternative)

Use when a specific bracket value should normalize to an explicit ID.

**Example: Sign 274.1 (Tempo-Zone)**

```typescript
// 1. Bracket sign with valuePrompt (for non-30 values)
{
  osmValuePart: '274.1[47]',
  signId: '274.1',
  signValue: 47,
  valuePrompt: {
    prompt: 'Geschwindigkeit in km/h ohne Einheit',
    defaultValue: '47',
    format: 'integer',
  },
  // NO redirects here
}

// 2. Explicit ID for common value (WITH redirect from bracket)
{
  osmValuePart: '274.1',
  signId: '274.1',
  redirects: [{ from: '274.1[30]', to: '274.1' }],  // Bracket value redirects to explicit
  // ... other fields
}
```

### Step 4: Add Tests for Special Interactions (Optional)

If the research in Step 1 revealed special tagging logic when this sign is combined with others (e.g., specific `access` tag overrides or complex conditional tagging), add a test case in `packages/traffic-sign-converter/src/signsToTags/signsToTags.test.ts`.

#### When to add a test:

- The OSM Wiki mentions non-trivial interactions with other signs (e.g., "In combination with X, it means Y").
- The interaction is not already covered by existing generic logic.
- **Do not** add tests for every sign; only for those with documented special behavior.

#### Example:

```typescript
test('Merged access tags for specific combination', () => {
  const signs = signsStateByDescriptiveName('DE', data, ['Sign Name A', 'Sign Name B'])
  const result = signsToTags(signs, 'DE')
  expect(result.get('vehicle')).toBe('destination')
})
```

### Step 5: Visibility Decision Guide

Analyze sign frequency:

- **`'highlight'`**: Common signs (speed limits, parking, bike lanes, stop signs).
- **`'search_only'`**: Rare, specialized, deprecated, or object-marking signs (guide posts, lamp markers).

### Step 6: Process and Build

1. **Build**: Run `bun script-new-svg.ts` from root (uses incremental mode - only downloads new SVGs).
2. **Verify Errors**: Read `packages/internal_svgs/src/download-errors/downloadErrors_DE.json`.
3. **Lint**: Use the `read_lints` tool to check for TypeScript errors in the modified file.

**Note**: For full refresh of all SVGs (re-downloads everything), use `bun script-refresh-all-svg.ts` manually when needed.

### Step 7: Testing

1. **Start dev server separately**: Run `cd apps/traffic-sign-tool && pnpm run dev` (runs on **port 3001**).
2. Navigate to `http://localhost:3001/?signs=DE:<ID>`.
3. Verify SVG rendering, tags, and modifier compatibility.

### Step 8: Final Summary Output

Output ONLY this format:

```markdown
**Signs added:**

- [ ] **DE:<ID> - <Descriptive Name>**
      Dev: http://localhost:3001/?signs=DE:<ID>
      Prod: https://trafficsigns.osm-verkehrswende.org/?signs=DE:<ID>

**Relevant combinations:**

- [ ] **DE:<ID>,DE:<MODIFIER_ID>**
      Dev: http://localhost:3001/?signs=DE:<ID>,DE:<MODIFIER_ID>
      Prod: https://trafficsigns.osm-verkehrswende.org/?signs=DE:<ID>,DE:<MODIFIER_ID>
```

## Troubleshooting

- **Build Failure**: Ensure `tagRecommendations` is provided (use `{}` if empty).
- **SVG Missing**: Verify `sourceUrl` points to a Wikimedia `File:` page.
- **Sign Not in UI**: Ensure data file is exported in `packages/traffic-sign-converter/src/data-definitions/DE/trafficSignDataDE.ts`.
