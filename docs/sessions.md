## Session builder

You can overwrite the default in-memory session builder and provide 
your own logic with `f.ServerWithSessionBuilder()`.

```go
f.ServerWithSessionBuilder(server, func(session *f.Session[UserSession]) {
	destroyed := false
	f.SessionWithLoader(session, func() {
        // Load state.
	})

	f.SessionWithValidator(session, func() bool {
		// Validate.

        return true.
	})

	f.SessionWithSaver(session, func() {
		// Save.
	})

	f.SessionWithDestroyer(session, func() {
		// Destroy.
	})
})
```

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
session := f.SessionStart(request, response)
username := f.SessionGet[string](session, "username")
```

## SessionSet

Use `f.SessionSet[T]()` to create or update a session property.

```go
session := f.SessionStart(request, response)
f.SessionSet(session, "username", "frizzante")
```

## SessionUnset

Use `f.SessionUnset()` to remove a session property.

```go
session := f.SessionStart(request, response)
f.SessionUnset(session, "username")
```

## SessionHas

Use `f.SessionHas()` to check if the session has a property.

```go
session := f.SessionStart(request, response)
if !f.SessionHas(session, "username") {
    // Session key "username" doesn't exist.
}
```

## Lifetime

The `f.SessionStart()` function does not set any expiration date, domain or path on the session cookie sent to the browser.

Instead, `f.ServerWithSessionBuilder()` has complete control over the lifetime of any session.