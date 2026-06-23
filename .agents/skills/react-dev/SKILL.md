---
name: react-dev
version: 3.0.0
description: >-
  React 19 + TypeScript for FMC TanStack Start apps: typed components, events,
  generics, ref-as-prop, Compiler-first memoization, and useEffect discipline
  (naming, when not to use Effect, alternatives). Use when typing React
  components/hooks/events, or writing/reviewing useEffect, useEffectEvent,
  derived state, data-fetch effects, or eslint-plugin-react-hooks effect rules.
  Not for routing/server boundaries (see tanstack-start-* skills).
---

**LLM reference:** [react.dev/llms.txt](https://react.dev/llms.txt) · [tanstack.com/llms.txt](https://tanstack.com/llms.txt) · Key effect page: [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

# React + TypeScript (FMC)

Type-safe React = compile-time guarantees. This skill covers **TypeScript patterns** agents often get wrong and **useEffect discipline** (naming, scope, when to skip). Routing and server I/O live in sibling skills (below).

## When to use

- Typing props, children, refs, event handlers
- Generic/reusable components (`Table<T>`, discriminated unions)
- React 19 APIs (`use()`, ref as prop) — **typing** only
- Writing or reviewing `useEffect`, `useEffectEvent`, effect cleanup, derived state
- Reviewing TS or effects in components under `components/`

**Not here:** route loaders, `createServerFn`, SSR, Zustand → see [Related skills](#related-skills).

## FMC stack (required)

| Requirement        | Rule                                                                                                                                                                                                                                                                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React 19**       | Target 19.x; no `forwardRef` / `useFormState` in new code                                                                                                                                                                                                                                                                                 |
| **React Compiler** | Enabled in the app build — auto-memoization is the default                                                                                                                                                                                                                                                                                |
| **Lint**           | **Oxlint** + React Compiler rules via `eslint-plugin-react-hooks` v7+ as a **jsPlugin** (e.g. namespace `react-hooks-js` — `react-hooks` is reserved in oxlint). See [oxc plugins](https://oxc.rs/docs/guide/usage/linter/plugins.html), preset [oxlint-config-react-hooks-js](https://github.com/eai04191/oxlint-config-react-hooks-js). |
| **Memoization**    | Do **not** add `useMemo` / `useCallback` / `memo` by default; add only when profiling or a lint rule requires it                                                                                                                                                                                                                          |
| **TanStack Start** | Isomorphic by default; server I/O via `createServerFn` in `*.functions.ts` — **no** `'use server'` / `'use client'`                                                                                                                                                                                                                       |
| **Data fetching**  | Route loaders + React Query — not `useEffect` fetch (see `tanstack-start-conventions`)                                                                                                                                                                                                                                                    |

Docs: [React Compiler](https://react.dev/learn/react-compiler.md) · [eslint-plugin-react-hooks](https://react.dev/reference/eslint-plugin-react-hooks.md) · [Rules of React](https://react.dev/reference/rules.md)

## Related skills

| Topic                            | Skill                        |
| -------------------------------- | ---------------------------- |
| Routes, layout, loaders, SSR     | `tanstack-start-conventions` |
| Next → Start, `createServerFn`   | `tanstack-start-migration`   |
| Client stores                    | `zustand-state-management`   |
| URL state (prefer router search) | `nuqs`                       |

## Component props

Extend native elements with `ComponentPropsWithoutRef`:

```typescript
type ButtonProps = {
  variant: 'primary' | 'secondary';
} & React.ComponentPropsWithoutRef<'button'>;

function Button({ variant, children, ...props }: ButtonProps) {
  return <button className={variant} {...props}>{children}</button>;
}
```

**Children:** `React.ReactNode` (renderable). Single element: `React.ReactElement`. Avoid `JSX.Element` for `children`.

**Variant props** — discriminated unions:

```typescript
type ButtonProps =
  | { variant: 'link'; href: string }
  | { variant: 'button'; onClick: () => void };

function Button(props: ButtonProps) {
  if (props.variant === 'link') return <a href={props.href}>Link</a>;
  return <button onClick={props.onClick}>Button</button>;
}
```

More: [Using TypeScript](https://react.dev/learn/typescript.md) · [generic-components.md](examples/generic-components.md)

## ref as prop (React 19)

Prefer `ref` as a normal prop — avoid new `forwardRef`:

```typescript
type InputProps = {
  ref?: React.Ref<HTMLInputElement>;
  label: string;
} & React.ComponentPropsWithoutRef<'input'>;

function Input({ ref, label, ...props }: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} {...props} />
    </div>
  );
}
```

Details: [react-19-patterns.md](references/react-19-patterns.md) · [Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs.md)

## Event handlers

Use **specific** event types so `currentTarget` is typed:

| Event        | Type                                    |
| ------------ | --------------------------------------- |
| Click        | `React.MouseEvent<HTMLButtonElement>`   |
| Submit       | `React.FormEvent<HTMLFormElement>`      |
| Input change | `React.ChangeEvent<HTMLInputElement>`   |
| Key down     | `React.KeyboardEvent<HTMLInputElement>` |

```typescript
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const data = new FormData(e.currentTarget)
}
```

Full table + generics: [event-handlers.md](references/event-handlers.md) · [Responding to Events](https://react.dev/learn/responding-to-events.md)

## Hooks (typing only)

| Hook               | Typing note                                                                           |
| ------------------ | ------------------------------------------------------------------------------------- |
| `useState`         | Explicit type for `null` unions, empty arrays, unions: `useState<User \| null>(null)` |
| `useRef`           | DOM: `useRef<HTMLInputElement>(null)` + `?.` — mutable box: `useRef(0)`               |
| `useReducer`       | Discriminated union for `action`                                                      |
| `useContext`       | `createContext<T \| null>(null)` + throw in custom hook                               |
| Custom hook tuples | `return [value, toggle] as const`                                                     |

**Do not** document `useCallback`/`useMemo` defaults here — Compiler handles memoization. Imperative handles / external store: [hooks.md](references/hooks.md).

## useEffect — naming, scope, and when to skip

Effects are an **escape hatch** from React. They synchronize with **external systems**. If there is no external system involved, you usually should not use an Effect.

### Name every useEffect (strong recommendation)

**Always** pass a **named function expression** to `useEffect`, not an anonymous arrow. Treat this as the default style for new and edited code.

```tsx
// Avoid for useEffect (anonymous — hard to skim and debug)
useEffect(() => {
  document.title = `${count} items`
}, [count])

// Prefer — intent at the call site; named stacks in errors and DevTools
useEffect(
  function updateDocumentTitle() {
    document.title = `${count} items`
  },
  [count],
)
```

**Cleanup**: When teardown is non-trivial, prefer a named cleanup for symmetry and stack clarity:

```tsx
useEffect(function pollServerForUpdates() {
  const intervalId = setInterval(/* ... */, 5000);
  return function stopPollingServer() {
    clearInterval(intervalId);
  };
}, [serverId]);
```

The same readability applies to `useCallback`, `useMemo` factories, and reducers — but **useEffect** benefits most because timing, dependencies, and cleanup are the hardest to infer. **Custom hooks**: still name effects inside the hook.

### Indicators from naming (what to do next)

Naming is a **design review at the keyboard**. Use it with [Anti-Patterns](references/anti-patterns.md) (examples and fixes live there).

| Signal                                                                                                                        | Meaning                                     | Where to look                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Name needs **“and”** / **“also”**                                                                                             | Unrelated concerns in one effect            | Split into separate effects, each with one name                                                                                               |
| Name like **`syncDerivedValue`**, **`updateStateFromState`**, **`setXBasedOnY`**                                              | Likely derived state or state-to-state sync | [Anti-Patterns §1](references/anti-patterns.md#1-redundant-state-for-derived-values) — derive during render; `useMemo` if expensive           |
| Name like **`notifyParentOfChange`**, **`reportStateToParent`**                                                               | Parent updates driven by child state        | [Anti-Patterns §6–7](references/anti-patterns.md#6-notifying-parent-via-effect) — event handler, lift data, or controlled pattern             |
| Name like **`resetFormOnSubmitFlag`**                                                                                         | User intent expressed via state hop         | [Anti-Patterns §4](references/anti-patterns.md#4-event-specific-logic-in-effect) — handle in the event handler                                |
| Name like **`persistOnClose`**, **`syncWhenClosed`**, **`saveDraftOnDismiss`**                                                | Side effect on dismiss/open UI state        | [Anti-Patterns §4](references/anti-patterns.md#persist-or-sync-on-gesture--not-on-isopen--transition-flags) — handler, not Effect on `isOpen` |
| Clear, **external** verbs: `connectTo…`, `subscribeTo…`, `initialize…`, `synchronize…` (with browser, network, map SDK, etc.) | Often legitimate Effect territory           | Still name them; add cleanup when needed                                                                                                      |

If the honest name sounds like **internal React bookkeeping**, the code often belongs in render, an event handler, or a different pattern.

### Quick reference

| Situation                      | DON'T                          | DO                                                                                  |
| ------------------------------ | ------------------------------ | ----------------------------------------------------------------------------------- |
| Derived state from props/state | `useState` + `useEffect`       | Calculate during render                                                             |
| Expensive calculations         | `useEffect` to cache           | Compute in render; `useMemo` only if needed (often unnecessary with React Compiler) |
| Reset state on prop change     | `useEffect` with `setState`    | `key` prop                                                                          |
| User event responses           | `useEffect` watching state     | Event handler directly                                                              |
| Persist/sync on dismiss        | `useEffect` on `isOpen`        | Dismiss handler (or `onCloseComplete`)                                              |
| Notify parent of changes       | `useEffect` calling `onChange` | Call in event handler                                                               |
| Fetch data                     | `useEffect` without cleanup    | `useEffect` with cleanup OR framework (loaders/Query)                               |

### When you DO need Effects

- Synchronizing with **external systems** (non-React widgets, browser APIs, map SDKs)
- **Subscriptions** to external stores (`useSyncExternalStore` when it fits)
- **Analytics/logging** tied to display
- **Data fetching** with proper cleanup when framework fetch is not available

**Strict Mode (dev):** Effects run setup twice on mount to surface missing cleanup. Add teardown for subscriptions, timers, and fetches — see [Anti-Patterns §8–9](references/anti-patterns.md#8-fetching-without-cleanup-race-condition).

### Effects and React Compiler / ESLint

- **Render work:** Prefer deriving values during render. With Compiler enabled (FMC default), skip manual `useMemo` unless profiling shows a need.
- **Effects:** Compiler does not replace Effects for **external** synchronization. Changed memoization can change when effects re-run — fix effect design (deps, splits, `useEffectEvent`) rather than disabling the compiler.
- **Lint:** Use `eslint-plugin-react-hooks@latest` via oxlint jsPlugin (`react-hooks-js/*`). Rules such as `set-state-in-effect` align with [Anti-Patterns](references/anti-patterns.md).

### Legitimate effects: `useEffectEvent`

When setup must stay subscribed (connection, interval, listener) but part of the callback should read **latest** props/state without re-running setup, extract non-reactive logic with `useEffectEvent`:

- Name like user-visible events: `onConnected`, `onTick` — not `onMount` / `onUpdate`.
- Call only from Effects (or other Effect Events in the same component); never during render, in event handlers, or as props to children.
- Omit from the Effect dependency array (enforced by lint).

Do **not** use `useEffectEvent` to hide dependencies that should re-trigger the Effect.

Example: [Alternatives §9](references/use-effect-alternatives.md#9-useeffectevent-for-non-reactive-effect-logic). Docs: [Separating Events from Effects](https://react.dev/learn/separating-events-from-effects) · [`useEffectEvent`](https://react.dev/reference/react/useEffectEvent).

### When you DON'T need Effects

1. Transforming data for rendering — compute during render
2. User events — event handlers
3. Deriving state — compute it (`const x = f(a, b)`)
4. Chaining updates — do it in one event handler where possible

**Details and fixes**: [Anti-Patterns](references/anti-patterns.md). **Alternatives**: [use-effect-alternatives.md](references/use-effect-alternatives.md).

### Decision tree

```
Need to respond to something?
├── User interaction (click, submit, drag)?
│   └── Use EVENT HANDLER
├── Component appeared on screen?
│   └── Use EFFECT (external sync, analytics)
├── Props/state changed and need derived value?
│   └── CALCULATE DURING RENDER
│       └── Expensive? useMemo only if needed (Compiler often makes this unnecessary)
└── Need to reset state when prop changes?
    └── Use KEY PROP on component
```

## Generic components

```typescript
type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
};

function Table<T>({ data, columns, keyExtractor }: {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
}) {
  /* ... */
}

function List<T extends { id: string | number }>({ items }: { items: T[] }) {
  return <ul>{items.map((item) => <li key={item.id}>…</li>)}</ul>;
}
```

Examples: [generic-components.md](examples/generic-components.md)

## React 19 APIs (pointers)

| API              | Use                                     | Docs                                                                  |
| ---------------- | --------------------------------------- | --------------------------------------------------------------------- |
| `use()`          | Unwrap promise/context (can suspend)    | [use](https://react.dev/reference/react/use.md)                       |
| `useActionState` | Form action state (RSC/Next-style apps) | [useActionState](https://react.dev/reference/react/useActionState.md) |
| `useOptimistic`  | Optimistic UI                           | [useOptimistic](https://react.dev/reference/react/useOptimistic.md)   |
| `useTransition`  | Non-urgent updates                      | [useTransition](https://react.dev/reference/react/useTransition.md)   |
| `useEffectEvent` | Stable callback inside effects          | [useEffectEvent](https://react.dev/reference/react/useEffectEvent.md) |

**FMC mutations:** prefer `createServerFn` + client handlers or React Query — not Next `'use server'` forms. Conceptual RSC background: [react.dev RSC](https://react.dev/reference/rsc/server-components.md) · TanStack Start implementation: `tanstack-start-conventions` → server-components.md.

Short TS notes: [react-19-patterns.md](references/react-19-patterns.md)

## Routing (TypeScript only)

Route **behavior** and **layout** (loaders, Query, `ssr`, `validateSearch`, thin routes) → `tanstack-start-conventions`.

**Typed route hooks** — pass `from` for inference:

```typescript
const { userId } = Route.useParams() // in createFileRoute component
const { tab } = Route.useSearch()
```

`validateSearch` with Zod is defined on the route file, not in this skill. TS quirks: [tanstack-router.md](references/tanstack-router.md)

## Rules

**Always**

- `ComponentPropsWithoutRef` for native element extension
- Specific `React.*Event<HTMLElement>` types
- Explicit `useState` when inference fails (null, `[]`, unions)
- Discriminated unions for variant props
- `ref` as prop in React 19
- React Compiler on; oxlint with Compiler rules (jsPlugin)
- Server mutations via `createServerFn` in Start apps

**Never**

- `any` on events; `JSX.Element` for `children`
- New `forwardRef` / `useFormState`
- Default `useMemo` / `useCallback` / `memo` without cause
- `'use server'` / `'use client'` in TanStack Start
- `useEffect` for app data fetching (use loaders/Query)
- Await a promise you pass to `use()` for streaming handoff

## References

- [hooks.md](references/hooks.md) — imperative handle, external store typing
- [event-handlers.md](references/event-handlers.md) — extended event type table
- [react-19-patterns.md](references/react-19-patterns.md) — ref-as-prop, `use()` typing notes
- [anti-patterns.md](references/anti-patterns.md) — derived state, fetch races, effect chains, parent sync
- [use-effect-alternatives.md](references/use-effect-alternatives.md) — `useMemo`, `key`, `useSyncExternalStore`, `useEffectEvent`, fetch patterns
- [generic-components.md](examples/generic-components.md) — Table, Select patterns
- [tanstack-router.md](references/tanstack-router.md) — Router TS inference only
- React — [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) · [React Compiler](https://react.dev/learn/react-compiler)
- Neciu Dan — [Start naming your useEffect functions](https://neciudan.dev/name-your-effects)
