# TILDA Playwright patterns (reference)

Canonical repo: **tilda-geo** `app/`. Trassenscout will align with these patterns when migrated to TanStack Start.

## Scripts

From `app/package.json` (typical):

- `e2e` → `playwright test --project=chromium`
- `e2e -- --ui` / `e2e -- --debug` → pass Playwright flags after `--`
- `e2e -- tests/smoke` → run a subset of specs

## Environment

| File              | Purpose                                                     |
| ----------------- | ----------------------------------------------------------- |
| Repo `.env`       | `VITE_PLAYWRIGHT_ENABLED=true`, DB, app config              |
| `app/.env.test`   | `TEST_OSM_USERNAME`, `TEST_OSM_PASSWORD` (OAuth setup only) |
| `RUN_OAUTH_E2E=1` | Gate real OSM login in `auth-setup.spec.ts`                 |

## Stubbed session flow

1. `createStubbedAdminSession(page, baseURL, { identityKey: route })` creates Prisma user + signed cookies.
2. `collectConsoleErrors` / `collectServerErrors` before `goto`.
3. Assert `main` visible and no blocking errors.
4. `cleanupStubbedSessionData('ADMIN', identityKey)` in route-scoped `afterEach`.

## Map

1. App: `firePlaywrightMapLoadedEvent()` on map load when `VITE_PLAYWRIGHT_ENABLED`.
2. Test: `waitForMapLoad(page)` listens for `mapLoaded` or falls back to `.maplibregl-canvas`.

## Smoke route list

`tests/fixtures/routes.ts` — `PUBLIC_SMOKE_ROUTES`, `ADMIN_ROUTES`, `ADMIN_REDIRECT_SMOKE_ROUTE`.
