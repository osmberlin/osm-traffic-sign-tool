# Better Alternatives to useEffect

For **useEffect**, prefer named function expressions at the call site (see the main skill). The same idea helps named **useMemo** / **useCallback** callbacks when the logic is non-obvious.

## 1. Calculate During Render (Derived State)

For values derived from props or state, compute during render — do not mirror into state with an Effect.

**Canonical bad/good example:** [Anti-Patterns §1](./anti-patterns.md#1-redundant-state-for-derived-values).

**When to use:** The value is a pure function of existing props/state.

---

## 2. useMemo for Expensive Calculations

When computation is genuinely expensive and React Compiler is off (or not helping), memoize:

```tsx
import { useMemo } from 'react'

function TodoList({ todos, filter }) {
  const visibleTodos = useMemo(
    function filterVisibleTodos() {
      return getFilteredTodos(todos, filter)
    },
    [todos, filter],
  )
}
```

**Canonical bad/good example:** [Anti-Patterns §2](./anti-patterns.md#2-filteringtransforming-data-in-effect).

**How to know if it's expensive:** Profile with `console.time` around the calculation; if consistently > ~1ms, consider memoizing.

**React Compiler:** With [React Compiler](https://react.dev/learn/react-compiler) enabled, prefer plain render-time calculation first; add manual `useMemo` only when profiling shows a need.

---

## 3. Key Prop to Reset State

To reset ALL state when a prop changes, use key:

```tsx
// Parent passes userId as key
function ProfilePage({ userId }) {
  return (
    <Profile
      userId={userId}
      key={userId} // Different userId = different component instance
    />
  )
}

function Profile({ userId }) {
  // All state here resets when userId changes
  const [comment, setComment] = useState('')
  const [likes, setLikes] = useState([])
}
```

**When to use**: You want a "fresh start" when an identity prop changes.

**Canonical example:** [Anti-Patterns §3](./anti-patterns.md#3-resetting-state-on-prop-change).

---

## 4. Store ID Instead of Object

To preserve selection when list changes:

```tsx
// BAD: Storing object that needs Effect to "adjust"
function List({ items }) {
  const [selection, setSelection] = useState(null)

  useEffect(() => {
    setSelection(null) // Reset when items change
  }, [items])
}

// GOOD: Store ID, derive object
function List({ items }) {
  const [selectedId, setSelectedId] = useState(null)

  // Derived - no Effect needed
  const selection = items.find((item) => item.id === selectedId) ?? null
}
```

**Benefit**: If item with selectedId exists in new list, selection preserved.

---

## 5. Event Handlers for User Actions

User clicks/submits/drags should be handled in event handlers, not Effects:

```tsx
// Event handler knows exactly what happened
function ProductPage({ product, addToCart }) {
  function handleBuyClick() {
    addToCart(product)
    showNotification(`Added ${product.name}!`)
    analytics.track('product_added', { id: product.id })
  }

  function handleCheckoutClick() {
    addToCart(product)
    showNotification(`Added ${product.name}!`)
    navigateTo('/checkout')
  }
}
```

**Shared logic**: Extract a function, call from both handlers:

```tsx
function buyProduct() {
  addToCart(product)
  showNotification(`Added ${product.name}!`)
}

function handleBuyClick() {
  buyProduct()
}
function handleCheckoutClick() {
  buyProduct()
  navigateTo('/checkout')
}
```

**Canonical example:** [Anti-Patterns §4](./anti-patterns.md#4-event-specific-logic-in-effect).

---

## 6. useSyncExternalStore for External Stores

For subscribing to external data (browser APIs, third-party stores), prefer `useSyncExternalStore` over a manual Effect + `useState`:

```tsx
import { useSyncExternalStore } from 'react'

function subscribe(callback) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine, // Client value
    () => true, // Server value (SSR)
  )
}
```

---

## 7. Lifting State Up

When two components need synchronized state, lift it to common ancestor:

```tsx
// Instead of syncing via Effects between siblings
function Parent() {
  const [value, setValue] = useState('')

  return (
    <>
      <Input value={value} onChange={setValue} />
      <Preview value={value} />
    </>
  )
}
```

---

## 8. Custom Hooks for Data Fetching

Extract fetch logic with proper cleanup:

```tsx
function useData(url) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(
    function fetchDataFromUrl() {
      const controller = new AbortController()
      setLoading(true)

      fetch(url, { signal: controller.signal })
        .then((res) => res.json())
        .then((json) => {
          setData(json)
          setError(null)
        })
        .catch((err) => {
          if (err.name !== 'AbortError') setError(err)
        })
        .finally(() => {
          setLoading(false)
        })

      return function abortFetchDataFromUrl() {
        controller.abort()
      }
    },
    [url],
  )

  return { data, error, loading }
}

// Usage
function SearchResults({ query }) {
  const { data, error, loading } = useData(`/api/search?q=${query}`)
}
```

**Better:** Use framework data fetching (TanStack Query, SWR, route loaders, etc.).

**Race conditions:** See [Anti-Patterns §8](./anti-patterns.md#8-fetching-without-cleanup-race-condition) for `ignore` flag vs `AbortController`.

---

## 9. useEffectEvent for Non-Reactive Effect Logic

Use when an Effect’s **setup** should not re-run for every prop change, but the callback must still read **latest** values (timers, listeners, connections).

```tsx
import { useEffect, useEffectEvent } from 'react'

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme) // theme is latest; does not re-connect
  })

  useEffect(
    function connectToChatRoom() {
      const connection = createConnection(roomId)
      connection.on('connected', onConnected)
      connection.connect()
      return function disconnectFromChatRoom() {
        connection.disconnect()
      }
    },
    [roomId], // theme omitted — read via onConnected
  )
}
```

**Rules:**

- Name Effect Events after user-visible events (`onConnected`, `onTick`), not lifecycle (`onMount`).
- Declare next to the Effect that uses them; do not pass to children or other hooks.
- Do not use to skip dependencies that should re-run the Effect.

Docs: [Separating Events from Effects](https://react.dev/learn/separating-events-from-effects) · [`useEffectEvent`](https://react.dev/reference/react/useEffectEvent).

---

## Summary: When to Use What

| Need                           | Solution                                                 |
| ------------------------------ | -------------------------------------------------------- |
| Value from props/state         | Calculate during render                                  |
| Expensive calculation          | Render-time calc; `useMemo` if profiling requires it     |
| Reset all state on prop change | `key` prop                                               |
| Respond to user action         | Event handler                                            |
| Sync with external system      | Named `useEffect` with cleanup                           |
| Latest props in stable Effect  | `useEffectEvent` (non-reactive slice only)               |
| Subscribe to external store    | `useSyncExternalStore`                                   |
| Share state between components | Lift state up                                            |
| Fetch data                     | Framework / custom hook with cleanup (`AbortController`) |
