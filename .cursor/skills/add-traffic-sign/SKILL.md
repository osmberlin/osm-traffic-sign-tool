# Add German Traffic Sign

Add a new German traffic sign to the OSM Traffic Sign Tools project based on a GitHub issue or user request.

## When to use this skill

- User provides a GitHub issue about a missing traffic sign
- User asks to add a specific German traffic sign (e.g., "add sign 1049-13")
- User mentions implementing a new Verkehrszeichen, Zusatzzeichen

## Step 1: Research Sign Information

### Primary Source: OSM Wiki

Start by researching the sign on the OSM wiki main list:

- **Main list**: https://wiki.openstreetmap.org/wiki/DE:Verkehrszeichen_in_Deutschland
- Look for specific sections like Zusatzzeichen, Gefahrzeichen, Vorschriftzeichen, etc.
- **Individual sign pages**: Navigate to specific sign wiki pages (e.g., `https://wiki.openstreetmap.org/wiki/DE:Tag:traffic_sign=DE:274`) for detailed tagging information

From the wiki, collect:

- **Sign ID**: Official number (e.g., `274`, `1040-30`, `220-10`)
- **Official Name**: "Zeichen XXX" format
- **Descriptive Name**: What the sign means
- **SVG Source**: Check for SVG file link on wiki (usually from wiki.openstreetmap.org or commons.wikimedia.org)
- **Tagging recommendations**: What OSM tags should be set (e.g., `maxspeed=30`, `access=no`, etc.)
- **Modifiers**: Can this sign receive modifier signs? (e.g., time restrictions, vehicle type exceptions)

### Fallback Source: Wikipedia

If the OSM wiki doesn't have the sign or SVG:

- **Wikipedia list**: https://de.wikipedia.org/wiki/Bildtafel_der_Verkehrszeichen_in_der_Bundesrepublik_Deutschland_seit_2017
- Search for the sign ID (e.g., "Zusatzzeichen 1049-13")
- Find the SVG image URL (usually de.wikipedia.org or commons.wikimedia.org)

## Step 2: Determine Sign Configuration File

Sign definitions are organized by category in `packages/traffic-sign-converter/src/data-definitions/DE/data/`

| File                            | Category            | Examples                                                          |
| ------------------------------- | ------------------- | ----------------------------------------------------------------- |
| `hazard.ts`                     | Gefahrzeichen       | Warning signs: curves, children, falling rocks, railway crossings |
| `infrastructure.ts`             | Infrastructure      | Bicycle lanes, sidewalks, parking areas                           |
| `traffic_ban.ts`                | Prohibitions        | No entry, vehicle restrictions, access bans                       |
| `speed_maxspeed_start.ts`       | Speed limits        | Maximum speed signs with values                                   |
| `speed_maxspeed_end.ts`         | Speed limit ends    | End of speed restriction                                          |
| `speed_minspeed_start.ts`       | Minimum speed       | Minimum speed requirements                                        |
| `speed_minspeed_end.ts`         | Min speed ends      | End of minimum speed                                              |
| `speed_zones.ts`                | Speed zones         | Tempo 30 Zone, traffic calming zones                              |
| `overtaking.ts`                 | Overtaking          | Overtaking prohibitions                                           |
| `notice.ts`                     | Information         | Informational/guidance signs                                      |
| `exceptions__thing_allowed.ts`  | Exception modifiers | "Bicycles allowed" additions                                      |
| `conditions__only_for_thing.ts` | Condition modifiers | "Only for trucks" restrictions                                    |
| `conditions__time.ts`           | Time conditions     | Time-based restrictions                                           |
| `conditions__other.ts`          | Other conditions    | Other condition modifiers                                         |
| `surface.ts`                    | Surface signs       | Surface-related warnings/info                                     |
| `numbers.ts`                    | Numbers             | Numeric indicators                                                |

**Note**: If unclear, signs can be added to the MISC section at the bottom of `trafficSignDataDE.ts`

## Step 3: Add Sign Definition

Add the sign object to the appropriate data file. Use this TypeScript structure:

```typescript
{
  // REQUIRED: Identification
  osmValuePart: '274',              // Sign ID for traffic_sign tag
  signId: '274',                    // Official sign number
  name: 'Zeichen 274',              // Official name format
  descriptiveName: 'Zulässige Höchstgeschwindigkeit',  // Human-readable
  description: null,                // Optional longer description
  kind: 'traffic_sign',             // or 'exception_modifier' or 'condition_modifier'

  // REQUIRED: Tag recommendations (can be empty {})
  tagRecommendations: {
    // Tags to set on the OSM object:
    uniqueTags: [
      { key: 'maxspeed', value: '$' }  // $ = use signValue
      // OR
      { key: 'oneway', value: 'yes' }  // Fixed value
    ],
    // Suggested highway types:
    highwayValues: ['cycleway', 'footway'],
    // Access restrictions:
    accessTags: [
      { key: 'vehicle', value: 'no' }
    ],
  },

  // OPTIONAL: For signs with numeric/text values
  valuePrompt: {
    prompt: 'Höchstgeschwindigkeit',
    defaultValue: '50',
    format: 'integer'  // Options: 'integer', 'float', 'opening_hours', 'time_restriction'
  },

  // OPTIONAL: Modifier compatibility
  compatibility: {
    canReceiveModifiers: true,       // Can have additional signs?
    incompatibleModifiers: ['1234']  // Specific exclusions by signId
  },

  // OPTIONAL: User guidance
  comments: [
    {
      comment: 'Important notes for mappers',
      important: true,  // Optional: highlights in UI
      tagReference: 'highway=stop'  // Optional: related tag
    }
  ],

  // REQUIRED: Catalogue metadata
  catalogue: {
    visibility: 'highlight',     // See Step 4 decision guide
    signCategory: 'speed',       // See TrafficSignDataTypes.ts for all categories
  },

  // REQUIRED: Image source
  image: {
    sourceUrl: 'https://wiki.openstreetmap.org/wiki/File:Zeichen_274.svg',
    licence: 'Public Domain'  // or 'CC-0'
  },
}
```

### Key patterns

- `kind: 'traffic_sign'` = main signs (blue, red, yellow triangles)
- `kind: 'exception_modifier'` = "X allowed" additions (e.g., bicycles free)
- `kind: 'condition_modifier'` = conditions (time, weather, vehicle type)
- `value: '$'` in uniqueTags means substitute the signValue
- `canReceiveModifiers: false` = sign must stand alone

## Step 4: Visibility Decision Guide

For the `catalogue.visibility` field, the agent must:

1. Analyze the sign's importance and frequency of use
2. Check how similar/related signs in the same category are configured
3. Make an intelligent decision based on:
   - Is this commonly seen in the field?
   - Would mappers frequently search for it?
   - Is it a specialized or rare variant?

### Guidelines

- **`'highlight'`** → Common signs mappers frequently need (e.g., common speed limits, parking signs, bike lanes, stop signs)
- **`'search_only'`** → Rare, specialized, deprecated, or object-marking signs (e.g., specialized industrial signs, rare variants, guide posts, lamp markers)

### Decision Process

1. Look at existing signs in the same category file
2. Check their visibility settings
3. Compare the new sign's likely usage frequency
4. Choose accordingly and document reasoning if uncertain

## Step 5: Download SVG and Check Errors

Run the build script from repository root:

```bash
bun script-new-svg.ts
```

### What this script does automatically

1. Builds traffic-sign-converter package
2. Downloads SVGs from `image.sourceUrl` via Wikimedia API
3. Optimizes with SVGO
4. Saves to `packages/internal_svgs/src/data-svgs/DE/svgs/`
5. Generates TypeScript exports
6. Rebuilds converter package
7. Starts dev server

### Error checking (automatic)

After running, automatically check for download errors:

- Read `packages/internal_svgs/src/tmp/downloadErrors_DE.json` (if missing, there are no errors)
- If file exists and has content, report errors with details and suggest fixes
- If file doesn't exist or is empty, downloads succeeded

## Step 6: Testing

The script starts dev server on **port 3001**. Verify:

1. Navigate to http://localhost:3001
2. Search for sign by ID or name
3. Check:
   - ✓ SVG displays correctly
   - ✓ Sign name and description accurate
   - ✓ Tag recommendations match OSM wiki
   - ✓ Value prompt appears and works (if applicable)
   - ✓ Modifier compatibility behaves correctly

## Step 7: GitHub Summary Output

After successfully adding signs, output ONLY this concise format:

```markdown
**Signs added:**

- [ ] **DE:274[30] - Zulässige Höchstgeschwindigkeit**
      Dev: http://localhost:3001/?signs=DE:274[30]
      Prod: https://trafficsigns.osm-verkehrswende.org/?signs=DE:274[30]

- [ ] **DE:1040-30[16-18] - Zeitliche Beschränkung**
      Dev: http://localhost:3001/?signs=DE:1040-30[16-18]
      Prod: https://trafficsigns.osm-verkehrswende.org/?signs=DE:1040-30[16-18]

**Relevant combinations:**

- [ ] **DE:274[30],DE:1040-30[16-18]**
      Dev: http://localhost:3001/?signs=DE:274[30],DE:1040-30[16-18]
      Prod: https://trafficsigns.osm-verkehrswende.org/?signs=DE:274[30],DE:1040-30[16-18]
```

### Output rules

- List ONLY sign IDs, names, and links
- NO explanatory text or commentary
- Dev: port 3001
- Prod: https://trafficsigns.osm-verkehrswende.org/
- Include relevant combinations (main sign + common modifiers)
- Use `?signs=` query parameter format

## Step 8: Troubleshooting

### SVG not downloading

- Verify `sourceUrl` accessible (try in browser)
- Must be File: page URL, not wiki article
- Check error file for specifics
- Try alternative source (Wikipedia vs OSM wiki)

### Sign doesn't appear

- Ensure data file exports the array
- Check `trafficSignDataDE.ts` imports your data file
- Rebuild: `bun script-new-svg.ts`

### Wrong tag recommendations

- Review individual sign wiki page (not just list)
- Check similar existing signs in codebase
- Document complex cases in `comments` array

### Wrong category/grouping

- Adjust `catalogue.signCategory` to match purpose
- Reconsider `visibility` based on similar signs

### TypeScript errors

- Reference `TrafficSignDataTypes.ts` for exact types
- All SignType objects must match `TrafficSignType` or `ModifierSignType`
- `tagRecommendations` is required (use `{}` if empty)

## Step 9: File Reference

| Path                                                                           | Purpose                                  |
| ------------------------------------------------------------------------------ | ---------------------------------------- |
| `packages/traffic-sign-converter/src/data-definitions/DE/data/*.ts`            | Sign definitions by category             |
| `packages/traffic-sign-converter/src/data-definitions/TrafficSignDataTypes.ts` | TypeScript type definitions              |
| `packages/traffic-sign-converter/src/data-definitions/DE/trafficSignDataDE.ts` | Main aggregator                          |
| `script-new-svg.ts`                                                            | Build + download + test script           |
| `packages/internal_svgs/src/tmp/downloadErrors_DE.json`                        | Download error log (check automatically) |
