Use `f.SessionStart()` to start a session.

```go
f.ServerWithApi(srv, "GET /",
    func(req *f.Request, res *f.Response) {
        get, set, unset := f.SessionStart(req, res)
    },
)
```

`f.SessionStart()` always succeeds and it always returns three functions, get, set and unset.

!!! note
    The reason `f.SessionStart()` always succeeds is because it will automatically create a new session if none is found. The new session does **not** retain any data from the previous session.

## Get

Use `get()` to retrieve a session property.

```go
get, _, _ := f.SessionStart(req, res)
username := get("username", "guest").(string)
```

## Set

Use `set()` to create or update a session property.

```go
_, set, _ := f.SessionStart(req, res)
set("username", "frizzante")
```

## Unset

Use `unset()` to remove a session property.

```go
_, _, unset := f.SessionStart(req, res)
unset("username")
```

## Session operator

You can overwrite the default in-memory session operator and provide 
your own `get`, `set`, `unset`, `validate` and `destroy` functions.

Use `f.ServerWithSessionOperator()` to overwrite the default session operator

```go
f.ServerWithSessionOperator(srv, func(id string) (
    get func(key string, defaultValue any) (value any),
    set func(key string, value any),
    unset func(key string),
    validate func() bool,
    destroy func(),
) {
    get = func(key string, defaultValue any) (value any) {
        // ...
    }

    set = func(key string, value any) {
        // ...
    }

    unset = func(key string) {
        // ...
    }

    validate = func() {
        // ...
    }

    destroy = func() {
        // ...
    }
    return
})
```

!!! note
    `Validate` and `destroy` are used by the server internally 
    to manage and destroy sessions that are no longer valid.

## Lifetime

The `f.SessionStart()` function does not set any expiration date, domain or path on the session cookie sent to the browser.

Instead, `f.ServerWithSessionOperator()` has complete control over the lifetime of any session.