# Event handler TypeScript

Official guide: [Using TypeScript — DOM events](https://react.dev/learn/typescript.md#typing-dom-events) · [Responding to Events](https://react.dev/learn/responding-to-events.md)

Use `React.*Event<HTMLElement>` so **`currentTarget`** is typed. Prefer `currentTarget` over `target` when reading the element you attached the handler to.

## Common handlers

| Handler                 | Type                                     |
| ----------------------- | ---------------------------------------- |
| `onClick` (button)      | `React.MouseEvent<HTMLButtonElement>`    |
| `onClick` (div)         | `React.MouseEvent<HTMLDivElement>`       |
| `onSubmit`              | `React.FormEvent<HTMLFormElement>`       |
| `onChange` (input)      | `React.ChangeEvent<HTMLInputElement>`    |
| `onChange` (select)     | `React.ChangeEvent<HTMLSelectElement>`   |
| `onChange` (textarea)   | `React.ChangeEvent<HTMLTextAreaElement>` |
| `onKeyDown`             | `React.KeyboardEvent<HTMLInputElement>`  |
| `onFocus` / `onBlur`    | `React.FocusEvent<HTMLInputElement>`     |
| `onDragOver` / `onDrop` | `React.DragEvent<HTMLDivElement>`        |

```typescript
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const data = new FormData(e.currentTarget)
}

function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  console.log(e.currentTarget.value)
}
```

## Generic handler prop

When a component forwards events:

```typescript
type ClickableProps<T extends HTMLElement> = {
  onClick?: React.MouseEventHandler<T>;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

function Clickable({ onClick, children, ...rest }: ClickableProps<HTMLDivElement>) {
  return (
    <div role="button" onClick={onClick} {...rest}>
      {children}
    </div>
  );
}
```

## Rules

- Never `any` for events
- Match the element type in the generic (`HTMLButtonElement`, not `HTMLElement`, when it matters)
- `e.preventDefault()` / `stopPropagation()` are available on synthetic events
