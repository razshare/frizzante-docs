Use `f.ServerWithGuardBuilder()` to add a new guard.

!!! note
	A guard is a setup function that can inject arbitrary request handlers
	to handle incoming requests before they reach any of your api and page handlers.<br/>
	Guards can decide which requests should pass through and which request should be rejected.

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

	// Guards.
	f.ServerWithGuardBuilder(server, build)

	// Start.
	f.ServerStart(server)
}

func build(guard *f.Guard) {
	// Build guard.
	f.GuardWithHandler(guard, handle)
}

func handle(request *f.Request, response *f.Response, pass func()) {
	// Guard.
	pass()
}
```

Use `pass()` to let the current request pass through.

!!! warning
	Failing to invoke `pass()` means the current request will be rejected.


## Conventions

Guards should be created under `lib/guards/{name}.go`, where `{name}` is the name of the guard.