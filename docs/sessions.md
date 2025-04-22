Use `f.SessionStart()` to start a session.

```go
func handler(request *f.Request, response *f.Response) {
    get, set, unset := f.SessionStart(request, response)
}
```

`f.SessionStart()` always succeeds and it always returns three functions, get, set and unset.

!!! note
    The reason `f.SessionStart()` always succeeds is because it will automatically create a new session if none is found. The new session does **not** retain any data from the previous session.

## Get

Use `get()` to retrieve a session property.

```go
get, _, _ := f.SessionStart(request, response)
username := get("username", "default").(string)
```

## Set

Use `set()` to create or update a session property.

```go
_, set, _ := f.SessionStart(request, response)
set("username", "frizzante")
```

## Unset

Use `unset()` to remove a session property.

```go
_, _, unset := f.SessionStart(request, response)
unset("username")
```

## Session operator

You can overwrite the default in-memory session operator and provide 
your own `get`, `set`, `unset`, `validate` and `destroy` functions.

Use `f.ServerWithSessionOperator()` to overwrite the default session operator

```go
f.ServerWithSessionOperator(srv, func(
    sessionId string,
    withGetter func(get SessionGetter),
    withSetter func(set SessionSetter),
    withUnsetter func(unset SessionUnsetter),
    withValidator func(validate SessionValidator),
    withDestroyer func(destroy SessionDestroyer),
) {
    withGetter(func(key string, defaultValue any) (value any) {
        // Get `key` from the session store.
        // If `key` doesn't exist, create it with value `defaultValue`.
    })

    withSetter(func(key string, value any) {
        // Set `key` to the session store.
    })

    withUnsetter(func(key string) {
        // Unset `key` from the session store.
    })

    withValidator(func() (valid bool) {
        // Validate `sessionId`.
    })

    withDestroyer(func() {
        // Destroy the session `sessionId` and its store.
    })
})
```

!!! note
    The `withValidator()` function is used by Frizzante to validate sessions whenever you invoke `f.SessionStart()`.
    <br/>
    The `withDestroyer()` function is used by Frizzante to destroy a sessions whenever validation fails.

## Lifetime

The `f.SessionStart()` function does not set any expiration date, domain or path on the session cookie sent to the browser.

Instead, `f.ServerWithSessionOperator()` has complete control over the lifetime of any session.