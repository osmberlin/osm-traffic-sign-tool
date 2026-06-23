---
paths: "**/*-store.ts", "**/*-store.tsx", "**/stores/**/*.ts", "**/stores/**/*.tsx"
---

# Zustand v5 (FMC)

Project uses **Zustand v5**. API details: https://zustand.docs.pmnd.rs/llms.txt

## File naming

- Store files: `{domain}-store.ts` (kebab-case), e.g. `map-filters-store.ts`
- One concern per file; colocate with the feature
- Do **not** name files `store.ts`, `useFooStore.ts`, or `zustand.ts`

## Exports

- **Never export** the `create()` hook (`useMapFiltersStore`)
- Export only: `useAppliedFilters`, `useMapFiltersActions`, etc.

## Store shape

```typescript
interface MapFiltersStore {
  applied: string[]
  actions: {
    addFilter: (filter: string) => void
  }
}

const useMapFiltersStore = create<MapFiltersStore>()((set) => ({
  applied: [],
  actions: {
    addFilter: (filter) => set((state) => ({ applied: [...state.applied, filter] })),
  },
}))

export const useAppliedFilters = () => useMapFiltersStore((s) => s.applied)
export const useMapFiltersActions = () => useMapFiltersStore((s) => s.actions)
```

## TypeScript

```typescript
/* ❌ */
const useStore = create<MyStore>((set) => ({ ... }))

/* ✅ */
const useStore = create<MyStore>()((set) => ({ ... }))
```

## Selectors

```typescript
/* ❌ — new object every time */
const { a, b } = useStore((s) => ({ a: s.a, b: s.b }))

/* ✅ — atomic hooks (preferred) */
const a = useA()
const b = useB()

/* ✅ — rare multi-field need */
import { useShallow } from 'zustand/shallow'
const { a, b } = useStore(useShallow((s) => ({ a: s.a, b: s.b })))
```

## Persist

```typescript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
```

SSR/hydration: see official **Setup with Next.js** / **SSR and Hydration** in llms.txt — do not invent one-off patterns.

## State ownership

| Need                   | Use                    |
| ---------------------- | ---------------------- |
| Server/API data        | TanStack Query         |
| URL state              | nuqs                   |
| Client UI global state | Zustand (`*-store.ts`) |
