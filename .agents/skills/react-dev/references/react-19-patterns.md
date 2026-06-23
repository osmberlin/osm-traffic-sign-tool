# React 19 — TypeScript notes

Behavior and full API docs: [react.dev/llms.txt](https://react.dev/llms.txt). FMC **server mutations** use `createServerFn` (`tanstack-start-migration`), not Next-style `'use server'`.

## ref as prop

`forwardRef` still works but is unnecessary for new components:

```typescript
type ButtonProps = {
  ref?: React.Ref<HTMLButtonElement>;
} & React.ComponentPropsWithoutRef<'button'>;

function Button({ ref, children, ...props }: ButtonProps) {
  return <button ref={ref} {...props}>{children}</button>;
}
```

Generic component:

```typescript
type SelectProps<T> = {
  ref?: React.Ref<HTMLSelectElement>
  options: T[]
  value: T
  onChange: (value: T) => void
  getLabel: (option: T) => string
}
```

Blog: [React 19](https://react.dev/blog/2024/12/05/react-19)

## use()

Unwraps promises and context; can suspend. **Do not** await a promise before passing it if the child should stream with Suspense.

```typescript
'use client';

import { use } from 'react';

function Profile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise);
  return <div>{user.name}</div>;
}
```

`use()` may be conditional (unlike other hooks). Reference: [use](https://react.dev/reference/react/use.md)

## useActionState

Replaces `useFormState`. Common in **Next/RSC** form posts; in TanStack Start prefer `createServerFn` + explicit client state or React Query mutations.

```typescript
import { useActionState } from 'react'

const [state, formAction, isPending] = useActionState(serverAction, initialState)
```

Reference: [useActionState](https://react.dev/reference/react/useActionState.md)

## Other React 19 hooks (docs only)

| Hook               | Doc                                                                |
| ------------------ | ------------------------------------------------------------------ |
| `useOptimistic`    | [reference](https://react.dev/reference/react/useOptimistic.md)    |
| `useTransition`    | [reference](https://react.dev/reference/react/useTransition.md)    |
| `useDeferredValue` | [reference](https://react.dev/reference/react/useDeferredValue.md) |
| `useEffectEvent`   | [reference](https://react.dev/reference/react/useEffectEvent.md)   |

## Migration checklist (legacy codebases)

- [ ] Replace `forwardRef` with `ref` prop
- [ ] Replace `useFormState` with `useActionState`
- [ ] `@types/react` 19.x
- [ ] Enable React Compiler + oxlint `react-hooks-js` rules
- [ ] TanStack Start: remove `'use server'` / `'use client'`; use `createServerFn`
