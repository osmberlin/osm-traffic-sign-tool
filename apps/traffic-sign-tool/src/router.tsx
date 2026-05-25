import { RouterPending } from '@app/src/components/RouterPending'
import { routerSearch } from '@app/src/features/searchParams/routerSearch'
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export const router = createRouter({
  defaultPreload: 'intent',
  defaultPendingComponent: RouterPending,
  defaultPendingMinMs: 250,
  defaultPendingMs: 100,
  parseSearch: routerSearch.parse,
  routeTree,
  scrollRestoration: true,
  stringifySearch: routerSearch.stringify,
  trailingSlash: 'never',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
