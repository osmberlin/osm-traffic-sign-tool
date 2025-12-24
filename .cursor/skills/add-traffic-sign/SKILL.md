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

### Step 4: Visibility Decision Guide

Analyze sign frequency:

- **`'highlight'`**: Common signs (speed limits, parking, bike lanes, stop signs).
- **`'search_only'`**: Rare, specialized, deprecated, or object-marking signs (guide posts, lamp markers).

### Step 5: Process and Build

1. **Build**: Run `bun script-new-svg.ts` from root.
2. **Verify Errors**: Read `packages/internal_svgs/src/tmp/downloadErrors_DE.json`.
3. **Lint**: Use the `read_lints` tool to check for TypeScript errors in the modified file.

### Step 6: Testing

1. Script starts dev server on **port 3001**.
2. Navigate to `http://localhost:3001/?signs=DE:<ID>`.
3. Verify SVG rendering, tags, and modifier compatibility.

### Step 7: Final Summary Output

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
