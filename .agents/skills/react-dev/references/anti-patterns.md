# useEffect Anti-Patterns

If you **named** the effect honestly and the name sounds like derived state, event handling, or “notify parent,” that name is a smell — the fix is usually **not** another effect. See the main skill’s **Indicators from naming** table and the sections below.

## 1. Redundant State for Derived Values

```tsx
// BAD: Extra state + Effect for derived value
function Form() {
  const [firstName, setFirstName] = useState('Taylor')
  const [lastName, setLastName] = useState('Swift')
  const [fullName, setFullName] = useState('')

  useEffect(() => {
    setFullName(firstName + ' ' + lastName)
  }, [firstName, lastName])
}

// GOOD: Calculate during rendering
function Form() {
  const [firstName, setFirstName] = useState('Taylor')
  const [lastName, setLastName] = useState('Swift')
  const fullName = firstName + ' ' + lastName // Just compute it
}
```

**Why it's bad**: Causes extra render pass with stale value, then re-renders with updated value.

---

## 2. Filtering/Transforming Data in Effect

```tsx
// BAD: Effect to filter list
function TodoList({ todos, filter }) {
  const [visibleTodos, setVisibleTodos] = useState([])

  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todos, filter))
  }, [todos, filter])
}

// GOOD: Filter during render (memoize if expensive)
function TodoList({ todos, filter }) {
  const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter])
}
```

---

## 3. Resetting State on Prop Change

```tsx
// BAD: Effect to reset state
function ProfilePage({ userId }) {
  const [comment, setComment] = useState('')

  useEffect(() => {
    setComment('')
  }, [userId])
}

// GOOD: Use key prop
function ProfilePage({ userId }) {
  return <Profile userId={userId} key={userId} />
}

function Profile({ userId }) {
  const [comment, setComment] = useState('') // Resets automatically
}
```

**Why key works**: React treats components with different keys as different components, recreating state.

---

## 4. Event-Specific Logic in Effect

```tsx
// BAD: Effect for button click result
function ProductPage({ product, addToCart }) {
  useEffect(() => {
    if (product.isInCart) {
      showNotification(`Added ${product.name}!`)
    }
  }, [product])

  function handleBuyClick() {
    addToCart(product)
  }
}

// GOOD: Handle in event handler
function ProductPage({ product, addToCart }) {
  function handleBuyClick() {
    addToCart(product)
    showNotification(`Added ${product.name}!`)
  }
}
```

**Why it's bad**: Effect fires on page refresh (isInCart is true), showing notification unexpectedly.

### Persist or sync on gesture — not on `isOpen` / transition flags

**Rule:** Persist/sync in the gesture's handler — not in an Effect watching `isOpen`, `isExpanded`, or a transition flag. If animation timing matters, use the library's close-complete callback (still gesture-tied).

```tsx
// BAD: Effect on isOpen
useEffect(
  function persistDraftOnClose() {
    if (!isOpen) saveSettings(draft)
  },
  [isOpen, draft],
)

// GOOD: same dismiss gesture
function handleDismiss() {
  saveSettings(draft)
  onClose()
}
```

**Why it's bad**: Runs on mount, prop-driven close, and remount — not only user dismiss. **Smell:** `persistOnClose`, `syncWhenClosed`, `saveDraftOnDismiss`.

---

## 5. Chains of Effects

```tsx
// BAD: Effects triggering each other
function Game() {
  const [card, setCard] = useState(null)
  const [goldCardCount, setGoldCardCount] = useState(0)
  const [round, setRound] = useState(1)
  const [isGameOver, setIsGameOver] = useState(false)

  useEffect(() => {
    if (card?.gold) setGoldCardCount((c) => c + 1)
  }, [card])

  useEffect(() => {
    if (goldCardCount > 3) {
      setRound((r) => r + 1)
      setGoldCardCount(0)
    }
  }, [goldCardCount])

  useEffect(() => {
    if (round > 5) setIsGameOver(true)
  }, [round])
}

// GOOD: Calculate in event handler
function Game() {
  const [card, setCard] = useState(null)
  const [goldCardCount, setGoldCardCount] = useState(0)
  const [round, setRound] = useState(1)
  const isGameOver = round > 5 // Derived!

  function handlePlaceCard(nextCard) {
    if (isGameOver) throw Error('Game ended')

    setCard(nextCard)
    if (nextCard.gold) {
      if (goldCardCount < 3) {
        setGoldCardCount(goldCardCount + 1)
      } else {
        setGoldCardCount(0)
        setRound(round + 1)
        if (round === 5) alert('Good game!')
      }
    }
  }
}
```

**Why it's bad**: Multiple re-renders (setCard -> setGoldCardCount -> setRound -> setIsGameOver). Also fragile for features like history replay.

---

## 6. Notifying Parent via Effect

```tsx
// BAD: Effect to notify parent
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false)

  useEffect(() => {
    onChange(isOn)
  }, [isOn, onChange])

  function handleClick() {
    setIsOn(!isOn)
  }
}

// GOOD: Notify in same event
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false)

  function updateToggle(nextIsOn) {
    setIsOn(nextIsOn)
    onChange(nextIsOn) // Same event, batched render
  }

  function handleClick() {
    updateToggle(!isOn)
  }
}

// BEST: Fully controlled component
function Toggle({ isOn, onChange }) {
  function handleClick() {
    onChange(!isOn)
  }
}
```

---

## 7. Passing Data Up to Parent

```tsx
// BAD: Child fetches, passes up via Effect
function Parent() {
  const [data, setData] = useState(null)
  return <Child onFetched={setData} />
}

function Child({ onFetched }) {
  const data = useSomeAPI()

  useEffect(() => {
    if (data) onFetched(data)
  }, [onFetched, data])
}

// GOOD: Parent fetches, passes down
function Parent() {
  const data = useSomeAPI()
  return <Child data={data} />
}
```

**Why**: Data should flow down. Upward flow via Effects makes debugging hard.

---

## 8. Fetching Without Cleanup (Race Condition)

```tsx
// BAD: No cleanup - race condition
function SearchResults({ query }) {
  const [results, setResults] = useState([])

  useEffect(() => {
    fetchResults(query).then((json) => {
      setResults(json) // "hello" response may arrive after "hell"
    })
  }, [query])
}

// GOOD: Cleanup ignores stale responses
function SearchResults({ query }) {
  const [results, setResults] = useState([])

  useEffect(
    function fetchSearchResults() {
      let ignore = false

      fetchResults(query).then((json) => {
        if (!ignore) setResults(json)
      })

      return function cancelFetchSearchResults() {
        ignore = true
      }
    },
    [query],
  )
}

// ALSO GOOD: AbortController (preferred when fetch supports signal)
function SearchResults({ query }) {
  const [results, setResults] = useState([])

  useEffect(
    function fetchSearchResults() {
      const controller = new AbortController()

      fetchResults(query, { signal: controller.signal })
        .then((json) => setResults(json))
        .catch((err) => {
          if (err.name !== 'AbortError') throw err
        })

      return function abortFetchSearchResults() {
        controller.abort()
      }
    },
    [query],
  )
}
```

---

## 9. App Initialization in Effect

```tsx
// BAD: Runs twice in dev, may break auth
function App() {
  useEffect(() => {
    loadDataFromLocalStorage()
    checkAuthToken() // May invalidate token on second call!
  }, [])
}

// GOOD: Module-level guard
let didInit = false

function App() {
  useEffect(function initializeAppOnce() {
    if (!didInit) {
      didInit = true
      loadDataFromLocalStorage()
      checkAuthToken()
    }
  }, [])
}

// ALSO GOOD: Module-level execution
if (typeof window !== 'undefined') {
  checkAuthToken()
  loadDataFromLocalStorage()
}
```
