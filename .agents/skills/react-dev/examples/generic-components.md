# Generic component patterns

TypeScript infers `T` from props — no `Table<User>` at the call site unless you want to be explicit.

## Table with `keyof T` columns

```typescript
type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
};

function Table<T>({ data, columns, keyExtractor }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={keyExtractor(item)}>
            {columns.map((col) => (
              <td key={String(col.key)}>
                {col.render ? col.render(item[col.key], item) : String(item[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## Constrained generic (`T extends HasId`)

```typescript
type HasId = { id: string | number };

function List<T extends HasId>({ items }: { items: T[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{/* render item */}</li>
      ))}
    </ul>
  );
}
```

## Select with value accessors

Keeps `T` opaque while rendering options:

```typescript
type SelectProps<T> = {
  options: T[];
  value: T | null;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
  getValue: (option: T) => string | number;
  placeholder?: string;
};

function Select<T>({
  options,
  value,
  onChange,
  getLabel,
  getValue,
  placeholder = 'Select…',
}: SelectProps<T>) {
  return (
    <select
      value={value != null ? String(getValue(value)) : ''}
      onChange={(e) => {
        const next = options.find((o) => String(getValue(o)) === e.target.value);
        if (next) onChange(next);
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={String(getValue(option))} value={String(getValue(option))}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  );
}
```

## Polymorphic “as” prop (advanced)

When one component can render as different elements:

```typescript
type BoxProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

function Box<T extends React.ElementType = 'div'>({
  as,
  children,
  ...props
}: BoxProps<T>) {
  const Component = as ?? 'div';
  return <Component {...props}>{children}</Component>;
}

// <Box as="a" href="/home">Home</Box>
```

Further reading: [Using TypeScript](https://react.dev/learn/typescript.md) · [Passing Props](https://react.dev/learn/passing-props-to-a-component.md)
