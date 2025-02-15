Use `frz.SessionStart()` to start a session.

```go
frz.ServerWithRoute(server, "GET /",
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
username := get("username", "guest").(string)
```

## Set

Use `set()` to create or update a session property.

```go
_, set, _ := frz.SessionStart(req, res)
set("username", "frizzante")
```

## Unset

Use `unset()` to remove a session property.

```go
_, _, unset := frz.SessionStart(req, res)
unset("username")
```

## Session operator

You can overwrite the default in-memory session operator and provide 
your own `get`, `set`, `unset` and a fourth `destroy` functions 
with `frz.ServerWithSessionOperator()`.

```go
frz.ServerWithSessionOperator(src, func(id string) (
    get func(key string, defaultValue any) (value any),
    set func(key string, value any),
    unset func(key string),
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

    destroy = func() {
        // ...
    }
    return
})
```

## Lifetime

The `frz.SessionStart()` func does not set any expiration date, domain or path on the session cookie sent to the browser.

Instead, `frz.ServerWithSessionOperator()` has complete control over the lifetime of any session.