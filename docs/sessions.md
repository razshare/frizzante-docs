Use `f.SessionStart()` to start a session.

```go
package main

import (
	"embed"
	f "github.com/razshare/frizzante"
)

//go:embed .dist/*/**
var dist embed.FS

func main() {
	// Create.
	server := f.ServerCreate()
	notifier := f.NotifierCreate()

	// Setup.
	f.ServerWithPort(server, 8080)
	f.ServerWithHostName(server, "127.0.0.1")
	f.ServerWithEmbeddedFileSystem(server, dist)
	f.ServerWithNotifier(server, notifier)

	// Api.
	f.ServerWithApiBuilder(server, build)

	// Start.
	f.ServerStart(server)
}

func build(api *Api*) {
    // Build api.
	f.ApiWithPath(api, "/welcome")
	f.ApiWithHandle(api, handle)
}

func handle(request *f.Request, response *f.Response) {
    // Start session.
    session := f.SessionStart(request, response)
}
```

`f.SessionStart()` always returns a session.

!!! note
    The reason `f.SessionStart()` always succeeds is because it will automatically create a new session if none is found. The new session does **not** retain any data from the previous session.

## SessionGet

Use `f.SessionGet[T]()` to retrieve a session property, or fallback and create a default value if the property doesn't exist.

```go
username := f.SessionGet[string](session, "username", "")
```

## Set

Use `f.SessionSet[T]()` to create or update a session property.

```go
f.SessionSet[string](session, response)
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

Use `f.ServerWithSessionBuilder()` to overwrite the default session operator

```go
f.ServerWithSessionBuilder(server, func(session *Session) {
    f.SessionWithGetter(session, func(key string) (value any) {
        // Get `key` from the session store.
    })

    f.SessionWithSetter(session, func(key string, value any) {
        // Set `key` and `value` int the session store.
    })

    f.SessionWithUnsetter(session, func(key string) {
        // Unset a `key` from the session store.
    })

    f.SessionWithValidator(session, func() (valid bool) {
        // Validate the session.
        // Has it expired? Has it been revoked?
    })

    f.SessionWithKeyChecker(session, func(key string) (exists bool) {
        // Check if `key` exists in the session store.
    })

    f.SessionWithDestroyer(session, func() {
        // Destroy the session and its store.
    })
})
```

## Lifetime

The `f.SessionStart()` function does not set any expiration date, domain or path on the session cookie sent to the browser.

Instead, `f.ServerWithSessionBuilder()` has complete control over the lifetime of any session.