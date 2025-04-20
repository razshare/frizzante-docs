Always track cancelled requests while streaming events, web sockets or executing long running tasks.


You can detect cancelled requests with `f.ReceiveCancellation()`.

```go
func RequestIsAlive(req *f.Request) *bool {
	value := true
	go func() {
		<-f.ReceiveCancellation(req)
		value = false
	}()
	return &value
}
```

For example using sse

```go
func handler(req *f.Request, res *f.Response) {
	alive := RequestIsAlive(req)
    setEventName := f.SendSseUpgrade(res)
    setEventName("server-time")

	for *alive {
		f.SendEcho(res, fmt.Sprintf("Server time is %s", time.Now()))
	}
}
```

or using web sockets

```go
func handler(req *f.Request, res *f.Response) {
	alive := RequestIsAlive(req)
    f.SendWsUpgrade(res)

	for *alive {
        f.SendEcho(res, "hello")
        msg := f.ReceiveMessage(req)
        fmt.Printf("Received message `%s`.\n", msg)
	}
}
```