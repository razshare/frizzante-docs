Use `f.ApiWithGuardHandler()` or `f.PageWithGuardHandler()` to add a new guard.

!!! note
	A guard is a function that handles incoming requests before they reach any of your actual api and page handlers.<br/>
	Guards can decide which requests should pass through and which request should be rejected.

`main.go`
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
	f.ServerWithApiBuilder(server, api.MyApi)

	// Start.
	f.ServerStart(server)
}
```

`lib/api/MyApi.go`
```go
package api

import f "github.com/razshare/frizzante"

func MyApi(api *f.Api) {
	// Build api.
	f.ApiWithPattern(api, "GET /")
	f.PageWithGuardHandler(api, func(request *f.Request, response *f.Response, pass func()) {
		// Handle guard.
		pass()
	})
	f.ApiWithRequestHandler(api, func(request *f.Request, response *f.Response) {
		// Handle request.
	})
}
```

Use `pass()` to let the current request pass through.

!!! warning
	Failing to invoke `pass()` means the current request will be rejected.


## Conventions

Guards should be created under `lib/guards/{name}.go`, where `{name}` is the name of the guard.