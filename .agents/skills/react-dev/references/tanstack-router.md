# TanStack Router — TypeScript only

**Routing behavior and layout** (loaders, React Query, `ssr`, `validateSearch`, thin routes, API routes) → skill `tanstack-start-conventions`.

Docs: [TanStack Router](https://tanstack.com/router/latest/docs/framework/react/overview) · [llms.txt](https://tanstack.com/llms.txt)

## Typed hooks with `createFileRoute`

Inside a route’s component, use the route’s static API for inference:

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$userId')({
  component: UserPage,
  validateSearch: userSearchSchema,
  loader: async ({ params }) => {
    /* ... */
  },
})

function UserPage() {
  const { userId } = Route.useParams()
  const search = Route.useSearch()
  const data = Route.useLoaderData() // prefer Query patterns per conventions skill
}
```

## `from` for cross-route typing

When using shared hooks outside the route file:

```typescript
import { useParams, useSearch } from '@tanstack/react-router'
import { Route as userRoute } from '@/routes/users/$userId'

const { userId } = useParams({ from: userRoute.id })
const { tab } = useSearch({ from: userRoute.id })
```

## Search params

- UI routes: Zod `validateSearch` on the route — see `tanstack-start-conventions` / `params-search-ui-vs-api.md`
- **Router `router.tsx`:** required `parseSearch` / `stringifySearch` (pretty JSON + per-param encodings) — `tanstack-start-conventions` / `router-search-serialization.md`
- **nuqs:** only when a shared component already requires it — skill `nuqs`

## Router type registration

Register the router for global link/search inference (app `router.tsx`):

```typescript
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
```

## Do not duplicate here

- Loader vs `useLoaderData` vs `useSuspenseQuery`
- `createServerFn` / `*.functions.ts`
- Selective `ssr`
- Auth `beforeLoad`

All of the above are in `tanstack-start-conventions` and related skills.
