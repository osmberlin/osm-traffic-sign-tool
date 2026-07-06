---
name: zustand-state-management
description: |
  FMC conventions for Zustand v5 in React: file naming, custom-hook-only exports, atomic selectors, actions namespace, small focused stores. Use when adding or reviewing client global state, or debugging unnecessary re-renders and SSR/persist hydration issues.

  Not for server/async data (TanStack Query) or URL state (nuqs). For API details, middleware, slices, and migration, use the official llms.txt index below.
user-invocable: true
---

**LLM reference:** Fetch [llms.txt](https://zustand.docs.pmnd.rs/llms.txt) for the documentation index and latest API. Full docs: [llms-full.txt](https://zustand.docs.pmnd.rs/llms-full.txt). Human-readable docs: [zustand.docs.pmnd.rs](https://zustand.docs.pmnd.rs/).

**Core mental model:** [Working with Zustand](https://tkdodo.eu/blog/working-with-zustand) (Dominik Dorfmeister) — export custom hooks only, atomic selectors, `actions` namespace, event-style actions, many small stores, combine with Query/URL via custom hooks.

**Version:** Zustand **v5** (`create<T>()()`, `useShallow` from `zustand/shallow`). Pin `zustand@^5` in the app; check [migrating to v5](https://zustand.docs.pmnd.rs/reference/migrations/migrating-to-v5) when upgrading.

---

## When to use Zustand

| Use Zustand for                                                            | Use something else for                      |
| -------------------------------------------------------------------------- | ------------------------------------------- |
| Client UI state shared across components (panels, map tools, wizard steps) | Server data → **TanStack Query**            |
| Ephemeral client prefs not in the URL                                      | Shareable/bookmarkable state → **nuqs**     |
| Small, synchronous client state                                            | Auth session → app auth skill / Better Auth |

Most app state is server or URL state. Add a Zustand store only when you need client-global state that is not already covered.

---

## File and export naming

**One store file = one concern.** Colocate with the feature (see `tanstack-start-conventions`).

| Item                       | Convention                                                            | Example                                          |
| -------------------------- | --------------------------------------------------------------------- | ------------------------------------------------ |
| **File**                   | `{domain}-store.ts` (kebab-case, `-store` suffix)                     | `map-filters-store.ts`                           |
| **Folder**                 | Next to the feature, e.g. `src/features/map/`                         | not a single global `stores/` dump unless shared |
| **State type**             | `{Domain}Store` (PascalCase interface)                                | `MapFiltersStore`                                |
| **Internal `create` hook** | `use{Domain}Store` — **never exported**                               | `useMapFiltersStore`                             |
| **Exported hooks**         | `use{Slice}` for state primitives; `use{Domain}Actions` for `actions` | `useAppliedFilters`, `useMapFiltersActions`      |

**Do not use:** `store.ts`, `state.ts`, `zustand.ts`, or `useMapFiltersStore.ts` (filename must not imply exporting the raw store). Do not put unrelated domains in one file.

**Persist storage key** (if used): unique string aligned with the file, e.g. `fmc-map-filters` for `map-filters-store.ts`. See llms.txt → `persist`.

---

## Canonical store shape

```typescript
import { create } from 'zustand'

interface MapFiltersStore {
  applied: string[]
  actions: {
    addFilter: (filter: string) => void
    clearFilters: () => void
  }
}

const useMapFiltersStore = create<MapFiltersStore>()((set) => ({
  applied: [],
  actions: {
    addFilter: (filter) =>
      set((state) => (state.applied.includes(filter) ? state : { applied: [...state.applied, filter] })),
    clearFilters: () => set({ applied: [] }),
  },
}))

export const useAppliedFilters = () => useMapFiltersStore((state) => state.applied)

export const useMapFiltersActions = () => useMapFiltersStore((state) => state.actions)
```

**TypeScript:** Always `create<StoreType>()((set) => …)` (double parentheses), even without middleware — see llms.txt → beginner TypeScript guide.

**In components:**

```tsx
const filters = useAppliedFilters()
const { addFilter } = useMapFiltersActions() // actions object is stable; destructuring is fine
```

---

## Practices (from Tkdodo + Zustand docs)

### 1. Only export custom hooks

Keep `useMapFiltersStore` private. Consumers must not call `useStore()` without a selector — that subscribes to the **entire** store and re-renders on any change.

```typescript
// ❌ if exported: subscribes to everything
const { applied } = useMapFiltersStore()
```

### 2. Prefer atomic selectors

Selectors are compared with **strict equality**. Returning a new object/array every time always counts as a change.

```typescript
// ❌ new object every render
useMapFiltersStore((s) => ({ applied: s.applied, count: s.applied.length }))

// ✅ separate hooks (preferred)
export const useAppliedFilters = () => useMapFiltersStore((s) => s.applied)
export const useAppliedFilterCount = () => useMapFiltersStore((s) => s.applied.length)
```

If two primitives are needed together rarely, use `useShallow` — see llms.txt → prevent rerenders with useShallow:

```typescript
import { useShallow } from 'zustand/shallow'

const { applied, count } = useMapFiltersStore(useShallow((s) => ({ applied: s.applied, count: s.applied.length })))
```

Prefer atomic hooks over `useShallow` when practical.

### 3. Separate `actions` from state

Put mutators under `actions`. The `actions` reference never changes, so `useMapFiltersActions()` is one stable subscription; destructuring `addFilter` inside a component is safe.

### 4. Model actions as events, not setters

Name and implement **commands** in the store (`addFilter`, `closePanel`), not `setApplied` from components. Business logic stays in the store; components call actions.

### 5. Many small stores

Prefer several `{domain}-store.ts` files over one app-wide store. Combine at the edges with custom hooks:

```typescript
export const useCurrentUserProfile = () => {
  const userId = useCredentialsStore((s) => s.currentUserId)
  return useUsersStore((s) => (userId ? s.users[userId] : undefined))
}
```

Avoid the slices pattern unless you have a strong reason — TypeScript gets heavy; see llms.txt → slices pattern. Tkdodo’s default is separate stores.

### 6. Combine with TanStack Query / URL state

```typescript
export const useFilteredTodos = () => {
  const filters = useAppliedFilters()
  return useQuery({
    queryKey: ['todos', filters],
    queryFn: () => getTodos(filters),
  })
}
```

Filters live in Zustand; server list lives in Query. URL filters belong in nuqs, not duplicated in Zustand.

### 7. Idempotent updates (optional)

When inputs fire often (resize, observers), return previous state from `set` when nothing effectively changed so subscribers are not notified:

```typescript
updateSize: (next) =>
  set((state) =>
    state.size.width === next.width && state.size.height === next.height ? state : { size: next },
  ),
```

---

## Critical rules

### Always

- `create<T>()()` in TypeScript
- Export **only** named selector hooks + `use{Domain}Actions`
- Atomic selectors returning primitives (or stable references)
- `actions` namespace for mutators
- Immutable updates via `set`; use updater form `set((state) => …)` for derived patches
- Unique `persist` `name` per store
- For Next.js / SSR + `persist`: follow llms.txt → **Setup with Next.js** / **SSR and Hydration** (hydration gate or official SSR-safe patterns)

### Never

- Export the raw `use*Store` from `create`
- `useStore()` with no selector (whole-store subscription)
- Object/array selectors without `useShallow`
- Zustand for server-fetched data
- Mutate state in place inside `set`
- Duplicate URL state in Zustand when nuqs already owns it

---

## Common pitfalls (short)

| Symptom                        | Likely cause                                     | Fix                                            |
| ------------------------------ | ------------------------------------------------ | ---------------------------------------------- |
| Re-render on unrelated updates | Whole-store subscription or object selector      | Atomic exported hooks                          |
| Maximum update depth exceeded  | Object selector creating new reference each time | Atomic hooks or `useShallow`                   |
| Next.js hydration mismatch     | `persist` + SSR                                  | llms.txt Next.js / SSR guides                  |
| Middleware types break         | `create<T>(…)` single parens                     | `create<T>()(…)`                               |
| Wrong persist import           | Importing from `'zustand'`                       | `import { persist } from 'zustand/middleware'` |

---

## Delegate to llms.txt

Do not duplicate full API docs in this skill. Fetch llms.txt when you need:

- **Middleware:** `persist`, `devtools`, `immer`, combining middlewares
- **Patterns:** slices, reset state, vanilla store, testing, flux-style reducers
- **Integrations:** Next.js, URL hash, Maps/Sets
- **Migration:** v4 → v5 (`useShallow` import paths, etc.)

Official guides worth opening directly: [Updating state](https://zustand.docs.pmnd.rs/learn/guides/updating-state), [Flux inspired practice](https://zustand.docs.pmnd.rs/learn/guides/flux-inspired-practice).

---

## Related skills

| Topic           | Skill                        |
| --------------- | ---------------------------- |
| App layout, SSR | `tanstack-start-conventions` |
| URL query state | `nuqs`                       |
