Always track cancelled requests while streaming events, web sockets, executing long running tasks or expensive tasks in your request handlers.

You can detect cancelled requests with `f.RequestReceiveCancellation()`.

For example using sse

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

func requestIsAlive(request *f.Request) *bool {
	// Assuming the connection is alive when starting
	// and initializing state.
	value := true
	go func() {
		// Wait for cancellation.
		<-f.RequestReceiveCancellation(request)

		// Update state after cancellation.
		value = false
	}()

	// Return state pointer.
	return &value
}

func MyApi(api *f.Api) {
	// Build api.
	f.ApiWithPattern(api, "GET /welcome")
	f.ApiWithRequestHandler(api, func(request *f.Request, response *f.Response) {
		// Get a pointer to the connection status.
		alive := requestIsAlive(request)

		// Upgrade to server sent events.
		withEventName := f.ResponseSendSseUpgrade(response)
		withEventName("server-time")

		// Continuously check if connection is still alive.
		for *alive {
			f.ResponseSendMessage(response, fmt.Sprintf("Server time is %s", time.Now()))
		}
	})
}
```

or using web sockets

`lib/api/MyApi.go`
```go
package api

import f "github.com/razshare/frizzante"

func requestIsAlive(request *f.Request) *bool {
	// Assuming the connection is alive when starting
	// and initializing state.
	value := true
	go func() {
		// Wait for cancellation.
		<-f.RequestReceiveCancellation(request)

		// Update state after cancellation.
		value = false
	}()

	// Return state pointer.
	return &value
}

func MyApi(api *f.Api) {
	// Build api.
	f.ApiWithPattern(api, "GET /welcome")
	f.ApiWithRequestHandler(api, func(request *f.Request, response *f.Response) {
		// Get a pointer to the connection status.
		alive := requestIsAlive(request)

		// Upgrade to web sockets.
		f.ResponseSendWsUpgrade(response)

		// Continuously check if connection is still alive.
		for *alive {
			f.ResponseSendMessage(response, "hello")
			msg := f.RequestReceiveMessage(request)
			fmt.Printf("RequestReceived message `%s`.\n", msg)
		}
	})
}
```