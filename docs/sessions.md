Use `frz.SessionStart()` to start a session.

```go
frz.ServerRouteApi(server, "GET /",
    func(_ *frz.Server, req *frz.Request, res *frz.Response) {
        get, set, unset := frz.SessionStart(req, res)
    },
)
```

`frz.SessionStart()` always succeeds and it always returns three functions, get, set and unset.

!!! note
    The reason `frz.SessionStart()` always succeeds is because it will automatically create a new session if none is found. The new session does **not** retain any data from the previous session.

## Get

Use `get()` to retrieve a session property.

```go
get, _, _ := frz.SessionStart(req, res)
username := get("Username", "guest").(string)
```

## Set

Use `set()` to create or update a session property.

```go
_, set, _ := frz.SessionStart(req, res)
set("Username", "frizzante")
```

## Unset

Use `unset()` to remove a session property.

```go
_, _, unset := frz.SessionStart(req, res)
unset("Username")
```

## Session operator

You can overwrite the default in-memory session operator and provide 
your own `get`, `set`, `unset`, `validate` and `destroy` functions.

Use `frz.ServerWithSessionOperator()` to overwrite the default session operator

```go
frz.ServerWithSessionOperator(srv, func(id string) (
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

The `frz.SessionStart()` function does not set any expiration date, domain or path on the session cookie sent to the browser.

Instead, `frz.ServerWithSessionOperator()` has complete control over the lifetime of any session.