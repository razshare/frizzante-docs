Always track cancelled requests while streaming events, web sockets or executing long running tasks.

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

	// Return to state pointer.
	return &value
}

func api(
	withHandler func(handler func(
		request *f.Request,
		response *f.Response,
		pass func(),
	)),
) {
    withPattern("GET /")
    withHandler(func(
		request *f.Request, 
		response *f.Response,
	) {
		alive := requestIsAlive(request)
		setEventName := f.SendSseUpgrade(response)
		setEventName("server-time")

		// Continuously check if connection is alive.
		for *alive {
			f.SendEcho(response, fmt.Sprintf("Server time is %s", time.Now()))
		}
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

	// Apis.
	f.ServerWithApi(server, api)

	// Start.
	f.ServerStart(server)
}
```

or using web sockets

```go
package main

import (
	"embed"
	f "github.com/razshare/frizzante"
)

//go:embed .dist/*/**
var dist embed.FS

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

	// Return to state pointer.
	return &value
}

func api(
	withHandler func(handler func(
		request *f.Request,
		response *f.Response,
		pass func(),
	)),
) {
    withPattern("GET /")
    withHandler(func(
		request *f.Request,
		response *f.Response,
	) {
		alive := RequestIsAlive(request)
		f.SendWsUpgrade(response)

		// Continuously check if connection is alive.
		for *alive {
			f.SendEcho(response, "hello")
			msg := f.ReceiveMessage(request)
			fmt.Printf("Received message `%s`.\n", msg)
		}
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

	// Apis.
	f.ServerWithApi(server, api)

	// Start.
	f.ServerStart(server)
}
```