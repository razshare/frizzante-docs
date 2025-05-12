Before starting a session, you must create a session builder.

!!! note
    The starter template comes with two separate 
    session builders out of the box, a [persistent builder](https://github.com/razshare/frizzante-starter/blob/main/lib/sessions/archive.go) and a [volatile one](https://github.com/razshare/frizzante-starter/blob/main/lib/sessions/memory.go).


A session builder is a function that builds (or retrieves) a session for the current connection.

The following is an example of a session builder that saves state in memory.

```go
type State struct {
	Name string
}

var stores = map[string]State{}

func Memory(session *f.Session[State]) {
	f.SessionWithLoader(session, func() {
		state, sessionExists := stores[session.Id]

		if !sessionExists {
			state = lib.InitializeState()
			stores[session.Id] = state
		}

		session.Store = stores[session.Id]
	})

	f.SessionWithValidator(session, func() bool {
		return true
	})

	f.SessionWithSaver(session, func() {
		// Noop.
	})

	f.SessionWithDestroyer(session, func() {
		delete(stores, session.Id)
	})
}

```

## Start session

Use `f.SessionStart[T]()` to start the session.

```go
func handle(request *f.Request, response *f.Response) {
    // Start session.
    session := f.SessionStart(request, response, Memory)
}
```

`f.SessionStart[T]()` returns a session state, which you can freely
read and modify.

!!! note
    The session state is built by the `Memory` session builder.

## Lifetime

The `f.SessionStart()` function does not set any expiration date, domain or path on the session cookie sent to the browser.

Instead, `f.ServerWithSessionBuilder()` has complete control over the lifetime of any session.