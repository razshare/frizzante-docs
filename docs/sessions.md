Use `f.SessionStart()` to start the session.

```go
func handle(request *f.Request, response *f.Response) {
    // Start session.
    state := f.SessionStart(request, response)

	// Modify state.
	f.SessionSetString(session, "name", "World")
}
```

# Session builder

By default all sessions are saved to a `.sessions` directory on your disk.

This is the default behavior, which is useful for quick debugging.

You can customize this behavior by  providing your own session builder.

!!! note
	A session builder is a function that builds (or retrieves) a session's state.<br/>
	It provides the basic mechanisms for checking, getting, setting properties and a destroyer function, which specifies what should happen when a session is "destroyed".

Use `f.ServerWithSessionBuilder()` to set the server's session builder.

```go
import f "github.com/razshare/frizzante"

package main

import (
	"embed"
	f "github.com/razshare/frizzante"
	"main/lib/api"
	"main/lib/pages"
)

//go:embed .dist/*/**
var dist embed.FS

func main() {
	// Create.
	server := f.ServerCreate()

	// Setup.
	f.ServerWithPort(server, 8080)
	f.ServerWithNotifier(server, notifier)
	f.ServerWithHostName(server, "127.0.0.1")
	f.ServerWithEmbeddedFileSystem(server, dist)

	// Sessions.
	f.ServerWithSessionBuilder(server, buildSession)

	// Api.
	f.ServerWithApiBuilder(server, buildApi)

	//Start.
	f.ServerStart(server)
}

var memory = map[string]map[string][]byte{}

// buildSession builds a session in memory.
func buildSession(session *f.Session) {
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

func buildApi(api *f.Api) {
	// Build api.
    f.ApiWithPattern(api, "GET /")
    f.ApiWithRequestHandler(api, handle)
}

func handle(request *f.Request, response *f.Response) {
    // Start session.
    state := f.SessionStart(request, response)

	// Modify state.
	f.SessionSetString(session, "name", "World")
}
```

## Lifetime

The `f.SessionStart()` function does not set any expiration date, domain or path on the session cookie sent to the browser.