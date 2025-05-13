Before starting a session, you must create a session builder.

!!! note
    The starter template comes with two separate 
    session builders out of the box, a [persistent builder](https://github.com/razshare/frizzante-starter/blob/main/lib/sessions/archive.go) and a [volatile one](https://github.com/razshare/frizzante-starter/blob/main/lib/sessions/memory.go).


A session builder is a function that builds (or retrieves) a session' state. It provides the basic mechanisms for checking, getting, setting properties and a destroyer function, which specifies what should happen when a session is "destroyed".

The following is an example of a session builder that saves state in memory.

```go
import f "github.com/razshare/frizzante"

var memory = map[string]map[string][]byte{}

// Memory builds sessions in memory.
func Memory(session *f.Session) {
	sessionId := f.SessionId(session)
	memory[sessionId] = map[string][]byte{}

	f.SessionWithGetHandler(session, func(key string) []byte {
		return memory[sessionId][key]
	})

	f.SessionWithSetHandler(session, func(key string, value []byte) {
		memory[sessionId][key] = value
	})

	f.SessionWithHasHandler(session, func(key string) bool {
		_, hasKey := memory[sessionId][key]
		return hasKey
	})

	f.SessionWithDestroyHandler(session, func() {
		delete(memory, sessionId)
	})
}
```

## Start session

Use `f.SessionStart()` to start the session.

```go
func handle(request *f.Request, response *f.Response) {
    // Start session.
    state := f.SessionStart(request, response, Memory)

	// Modify state.
	f.SessionSetString(session, "name", "World")
}
```

!!! note
    The session state is built by the `Memory` session builder, as shown above.


## Lifetime

The `f.SessionStart()` function does not set any expiration date, domain or path on the session cookie sent to the browser.