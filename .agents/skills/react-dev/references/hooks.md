# Hook TypeScript patterns

Basics (`useState`, `useRef`, `useReducer`, `useContext`) are covered in [Using TypeScript](https://react.dev/learn/typescript.md) and `SKILL.md`. This file covers **advanced typing** only.

## Compiler and memoization

FMC apps use **React Compiler**. Do not add `useCallback` / `useMemo` / `memo` unless profiling or oxlint (`react-hooks-js/*`) requires it.

- [React Compiler](https://react.dev/learn/react-compiler.md)
- [useMemo](https://react.dev/reference/react/useMemo.md) — when manual memo is still appropriate
- [useCallback](https://react.dev/reference/react/useCallback.md)

## useImperativeHandle (ref as prop)

```typescript
type InputHandle = {
  focus: () => void;
  clear: () => void;
};

type InputProps = {
  ref?: React.Ref<InputHandle>;
  label: string;
};

function CustomInput({ ref, label }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      if (inputRef.current) inputRef.current.value = '';
    },
  }));

  return (
    <div>
      <label>{label}</label>
      <input ref={inputRef} />
    </div>
  );
}
```

## useSyncExternalStore

For subscribing to external stores with SSR-safe snapshots:

```typescript
function useStore<T>(store: { getState: () => T; subscribe: (onStoreChange: () => void) => () => void }): T {
  return useSyncExternalStore(
    store.subscribe,
    store.getState,
    store.getState, // server snapshot
  )
}
```

Prefer framework patterns (React Query, loaders) over custom `useEffect` + fetch hooks. Effect rules: [anti-patterns.md](anti-patterns.md) in this skill.

## Custom hook return types

```typescript
// Object return — named fields
function useCounter(initial: number) {
  const [count, setCount] = useState(initial)
  return {
    count,
    increment: () => setCount((c) => c + 1),
    reset: () => setCount(initial),
  }
}

// Tuple — use `as const` for narrow inference
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  return [value, () => setValue((v) => !v)] as const
}
```

Client global state: skill `zustand-state-management` — not context + reducer boilerplate.
