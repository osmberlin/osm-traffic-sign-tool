---
name: playwright-skill
description: E2E testing and ad-hoc browser automation for TanStack Start apps (FMC/TILDA). Use @playwright/test in the project for suites; this skill for smoke tests, stubbed auth, map hooks, console/server error checks, and quick /tmp scripts. Not for Next.js.
---

**Path resolution:** Discover `$SKILL_DIR` from where this file was loaded (plugin, global `~/.claude/skills/`, or project `.agents/skills/`).

**Read the project’s `tests/README.md` first** — env vars, Docker, and scripts live there.

**Related FMC skills:** `tanstack-start-migration` (post-migration smoke), `tanstack-start-auth` (sessions), `tanstack-start-conventions`.

---

## Official docs (fetch; do not duplicate)

Playwright has **no** official `llms.txt` ([request closed](https://github.com/microsoft/playwright/issues/39895)).

| Topic                        | URL                                                                 |
| ---------------------------- | ------------------------------------------------------------------- |
| Intro & writing tests        | https://playwright.dev/docs/intro                                   |
| Locators (`getByRole`, etc.) | https://playwright.dev/docs/locators                                |
| Test configuration           | https://playwright.dev/docs/test-configuration                      |
| Best practices               | https://playwright.dev/docs/best-practices                          |
| CI                           | https://playwright.dev/docs/ci                                      |
| Agents (CLI)                 | https://playwright.dev/docs/getting-started-cli                     |
| Agents (MCP)                 | https://playwright.dev/docs/getting-started-mcp                     |
| TanStack doc index           | https://tanstack.com/llms.txt                                       |
| TanStack Start e2e examples  | https://github.com/TanStack/router/tree/main/e2e/react-start        |
| Map interactions (optional)  | https://mapgrab.github.io/docs/getting-started/stage-two/playwright |

---

## Two modes

| Mode                    | When                                      | Where                                                                |
| ----------------------- | ----------------------------------------- | -------------------------------------------------------------------- |
| **Project E2E**         | Suites, CI, regression                    | `@playwright/test` in `tests/*.spec.ts`, repo `playwright.config.ts` |
| **Ad-hoc** (this skill) | Screenshots, quick checks, external sites | `/tmp/playwright-test-*.js` via `run.js`                             |

For in-repo work, **prefer project E2E**. Use ad-hoc only when the user wants a one-off script without committing tests.

**Exploration:** Prefer [Playwright MCP](https://playwright.dev/docs/getting-started-mcp) over pasting large API snippets into the skill.

---

## TanStack Start — `playwright.config.ts`

Reference implementation: **tilda-geo** `app/playwright.config.ts`.

### Environment loading

Load env **before** `defineConfig` so `webServer` gets `DATABASE_*` etc.:

```typescript
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env') }) // repo
dotenv.config({ path: path.resolve(__dirname, '.env') }) // app (optional)
dotenv.config({ path: path.resolve(__dirname, '.env.test') }) // test-only
```

### Server tiers

| Tier              | Use                           | `webServer.command`                         | Notes                                                                                                             |
| ----------------- | ----------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Local / smoke** | Fast feedback (TILDA default) | `bun run dev`                               | Vite dev, e.g. `http://127.0.0.1:5173`                                                                            |
| **CI / release**  | Production-like               | `bun run build && bun run start`            | Set `PORT` / `VITE_SERVER_PORT` like [TanStack e2e](https://github.com/TanStack/router/tree/main/e2e/react-start) |
| **Preview**       | Built assets + SSR preview    | `bun run build && bun run preview --port …` | TanStack `vite preview` mode                                                                                      |

**Docker / DB:** If the app needs Postgres or tiles, start compose **outside** Playwright (`docker compose up db tiles -d`). Do not cram compose into `webServer.command` unless CI already proves it works.

**Shared DB:** Use `workers: 1` or `test.describe.configure({ mode: 'serial' })` when tests create/delete the same DB rows (stubbed auth).

### Minimal config (TILDA-style smoke)

```typescript
import { defineConfig, devices } from '@playwright/test'

const baseURL = 'http://127.0.0.1:5173'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'bun run dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
```

Copy the full template from `playwright.config.ts.template` in this skill directory.

---

## FMC / TILDA patterns

Canonical paths in **tilda-geo** (`app/`):

| Concern                 | Location                                          |
| ----------------------- | ------------------------------------------------- |
| Config                  | `playwright.config.ts`                            |
| Setup docs              | `tests/README.md`                                 |
| Smoke (public routes)   | `tests/smoke/public-routes.spec.ts`               |
| Stubbed admin auth      | `tests/pages/admin.stubbed-auth.spec.ts`          |
| Auth fixtures           | `tests/fixtures/auth.ts`                          |
| Console / server errors | `tests/utils/console.ts`, `tests/utils/server.ts` |
| Map wait helpers        | `tests/utils/maps.ts`                             |
| App test hooks          | `src/components/shared/utils/playwright.ts`       |

### `VITE_PLAYWRIGHT_ENABLED`

In repo `.env` (see `.env.example`):

```bash
VITE_PLAYWRIGHT_ENABLED=true
```

Enables test IDs and map signals **only** in E2E — not in production HTML.

### App hooks (`playwright.ts`)

```typescript
import { createIsomorphicFn } from '@tanstack/react-start'

export function playwrightTestId(testId: string) {
  return import.meta.env.VITE_PLAYWRIGHT_ENABLED === 'true' ? testId : undefined
}

export const firePlaywrightMapLoadedEvent = createIsomorphicFn()
  .server(() => {})
  .client(() => {
    if (import.meta.env.VITE_PLAYWRIGHT_ENABLED !== 'true') return
    window.dispatchEvent(new CustomEvent('mapLoaded'))
    window.__mapLoaded = true
  })
```

Call `firePlaywrightMapLoadedEvent()` from the map `onLoad` handler. Tests use `tests/utils/maps.ts` (`waitForMapLoad`, `verifyMapRendered`).

For **click/drag on map canvas**, consider [MapGrab](https://mapgrab.github.io/docs/getting-started/stage-two/playwright) (used in legacy Trassenscout surveys; adopt when migrating those flows to Start).

### Smoke tests (post-migration)

After **Next → TanStack Start**, add or run smoke specs:

1. `page.goto(route)` with `baseURL`
2. Assert pathname unchanged (no crash redirect)
3. `expect(page.locator('main').first()).toBeVisible()`
4. `expectNoConsoleErrors(page)` (see utils)

Route lists live in `tests/fixtures/routes.ts`. Run: `bun run e2e -- tests/smoke`.

### Auth

| Strategy               | When                    | TILDA                                                                                           |
| ---------------------- | ----------------------- | ----------------------------------------------------------------------------------------------- |
| **Stubbed DB session** | Most admin / role tests | `createStubbedAdminSession(page, baseURL, { identityKey })` — Better Auth cookies + Prisma user |
| **Real OAuth**         | Rare                    | `auth-setup.spec.ts` only if `RUN_OAUTH_E2E=1` + `TEST_OSM_*` in `.env.test`                    |

**Parallel safety:** Stubbed admin suites use `mode: 'serial'` and **nested** `test.describe` per route so `afterEach` cleanup does not delete another worker’s session (`cleanupStubbedSessionData`).

### Quality helpers

Before `goto`, attach collectors; after navigation, assert:

- **Console:** `collectConsoleErrors` → filter `KNOWN_ACCEPTABLE_ERRORS` → fail on `error`
- **Server:** `collectServerErrors(page, baseURL)` — same-origin 5xx and `requestfailed`

Extend allowlists in the util files when a known benign error appears.

### Locators

Prefer `getByRole`, `getByLabel`, `getByText`. Use `playwrightTestId('…')` only when roles are insufficient. Avoid brittle CSS chains.

---

## Project E2E workflow

**`package.json` script** (TILDA convention):

```json
"e2e": "playwright test --project=chromium"
```

- `bun run e2e` → chromium project (default local/CI run)
- `bun run e2e -- --ui` / `bun run e2e -- --debug` → pass Playwright flags after `--`
- `bun run e2e -- tests/smoke` → subset of specs

```bash
bun add -d @playwright/test dotenv
bunx playwright install chromium
# Start DB/tiles if required (see tests/README.md)
bun run e2e
bun run e2e -- tests/smoke
bun run e2e -- --ui
bun run e2e -- --debug
```

Write tests in `tests/**/*.spec.ts` with TypeScript. Use web-first assertions (`expect(locator).toBeVisible()`).

---

## Ad-hoc automation (skill runner)

**Setup (once):**

```bash
cd $SKILL_DIR && bun run setup
```

**Workflow:**

1. For localhost: detect dev servers first:

   ```bash
   cd $SKILL_DIR && bun -e "require('./lib/helpers').detectDevServers().then(s => console.log(JSON.stringify(s)))"
   ```

2. Write script to `/tmp/playwright-test-*.js` (never commit ad-hoc scripts to the skill dir).
3. Parameterize `TARGET_URL` at the top.
4. Run: `cd $SKILL_DIR && bun run.js /tmp/playwright-test-*.js`

**Headers** (identify automated traffic):

```bash
PW_HEADER_NAME=X-Automated-By PW_HEADER_VALUE=playwright-skill \
  cd $SKILL_DIR && bun run.js /tmp/my-script.js
```

Multiple headers: `PW_EXTRA_HEADERS='{"X-Automated-By":"playwright-skill"}'`.

**Defaults:** Use `headless: false` for ad-hoc unless the user asks for headless. Prefer semantic locators in ad-hoc scripts too.

**Helpers** (`lib/helpers.js`): `detectDevServers`, `createContext` / `getExtraHeadersFromEnv`, `takeScreenshot`. Avoid custom retry click helpers — use Playwright auto-waiting.

---

## Checklist (new Start app E2E)

- [ ] `playwright.config.ts` with layered dotenv and `baseURL` matching Vite port
- [ ] `tests/README.md` documents compose, `.env.test`, and bun scripts
- [ ] `VITE_PLAYWRIGHT_ENABLED` + `src/.../playwright.ts` hooks
- [ ] `tests/smoke/` for public routes after migration
- [ ] Stubbed auth fixtures if admin routes need login
- [ ] `collectConsoleErrors` / `collectServerErrors` on critical suites
- [ ] Map: `mapLoaded` event + `waitForMapLoad` (MapGrab if clicking the map)

---

## When to use what

| Need                                | Tool                        |
| ----------------------------------- | --------------------------- |
| Committed regression / CI           | `@playwright/test` in repo  |
| Post–TanStack Start migration smoke | `tests/smoke/` + this skill |
| Quick screenshot / external site    | Ad-hoc `run.js`             |
| Interactive exploration             | Playwright MCP              |
