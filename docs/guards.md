Use `f.ServerWithGuard()` to add a new guard.

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

func guard(
	withHandler func(handler func(req *f.Request, res *f.Response, pass func())),
) {
    withPattern("GET /")
    withHandler(func(req *f.Request, res *f.Response, pass func()) {
		// Guard.
		pass()
	})
}

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
	f.ServerWithGuard(server, guard)

	// Start.
	f.ServerStart(server)
}
```

Use `pass()` to let the current request pass through.

!!! warning
	Failing to invoke `pass()` means the current request will be rejected.


## Other details

Guards should be created under `lib/guards/{name}.go`, where `{name}` is the name of the guard.