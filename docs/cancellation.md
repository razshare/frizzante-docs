Always track cancelled requests while streaming events, web sockets or executing long running tasks.


You can detect cancelled requests with `f.ReceiveCancellation()`.

```go
func RequestIsAlive(request *f.Request) *bool {
	value := true
	go func() {
		<-f.ReceiveCancellation(request)
		value = false
	}()
	return &value
}
```

For example using sse

```go
func handler(request *f.Request, response *f.Response) {
	alive := RequestIsAlive(request)
    setEventName := f.SendSseUpgrade(response)
    setEventName("server-time")

	for *alive {
		f.SendEcho(response, fmt.Sprintf("Server time is %s", time.Now()))
	}
}
```

or using web sockets

```go
func handler(request *f.Request, response *f.Response) {
	alive := RequestIsAlive(request)
    f.SendWsUpgrade(response)

	for *alive {
        f.SendEcho(response, "hello")
        msg := f.ReceiveMessage(request)
        fmt.Printf("Received message `%s`.\n", msg)
	}
}
```