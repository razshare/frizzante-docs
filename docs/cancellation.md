Always track cancelled requests while streaming events, web sockets, executing long running tasks or expensive tasks in your request handlers.

You can detect cancelled requests with `f.ReceiveCancellation()`.

For example using sse

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

func build(context f.ApiContext) {
	// Build api.
    withPattern, withHandler := context()
	withPath("/welcome")
	withHandler(handle)
}

func handle(request *f.Request, response *f.Response) {
	// Get a pointer to the connection status.
	alive := requestIsAlive(request)

	// Upgrade to server sent events.
	withEventName := f.SendSseUpgrade(response)
	withEventName("server-time")

	// Continuously check if connection is still alive.
	for *alive {
		f.SendEcho(response, fmt.Sprintf("Server time is %s", time.Now()))
	}
}

func requestIsAlive(request *f.Request) *bool {
	// Assuming the connection is alive when starting
	// and initializing state.
	value := true
	go func() {
		// Wait for cancellation.
		<-f.ReceiveCancellation(request)

		// Update state after cancellation.
		value = false
	}()

	// Return state pointer.
	return &value
}
```

or using web sockets

```go
func handle(request *f.Request, response *f.Response) {
	// Get a pointer to the connection status.
	alive := requestIsAlive(request)

	// Upgrade to web sockets.
	f.SendWsUpgrade(response)

	// Continuously check if connection is still alive.
	for *alive {
		f.SendEcho(response, "hello")
		msg := f.ReceiveMessage(request)
		fmt.Printf("Received message `%s`.\n", msg)
	}
}
```