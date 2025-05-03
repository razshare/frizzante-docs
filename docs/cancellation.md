Always track cancelled requests while streaming events, web sockets, executing long running tasks or expensive tasks in your request handlers.

You can detect cancelled requests with `f.ReceiveCancellation()`.

For example using sse

```go
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

```go
f.ServerWithApi(server, func(withPattern f.WithApiPattern, withHandler f.WithApiHandler)){
	withPattern("GET /sse")
	withHandler(func(request *f.Request, response *f.Response) {
		// Get a pointer to the connection status.
		alive := requestIsAlive(request)

		// Upgrade to server sent events.
		withEventName := f.SendSseUpgrade(response)
		withEventName("server-time")

		// Continuously check if connection is still alive.
		for *alive {
			f.SendEcho(response, fmt.Sprintf("Server time is %s", time.Now()))
		}
	})
})
```

or using web sockets

```go
f.ServerWithApi(server, func(withPattern f.WithApiPattern, withHandler f.WithApiHandler)){
	withPattern("GET /ws")
	withHandler(func(request *f.Request, response *f.Response) {
		// Get a pointer to the connection status.
		alive := RequestIsAlive(request)

		// Upgrade to web sockets.
		f.SendWsUpgrade(response)

		// Continuously check if connection is still alive.
		for *alive {
			f.SendEcho(response, "hello")
			msg := f.ReceiveMessage(request)
			fmt.Printf("Received message `%s`.\n", msg)
		}
	})
})
```