You can upgrade http requests to web sockets with `f.SendWsUpgrade()`.

```go
func handler(req *f.Request, res *f.Response) {
    f.SendWsUpgrade(res)

	for {
        f.SendEcho(res, "hello")
        msg := f.ReceiveMessage(req)
        fmt.Printf("Received message `%s`.\n", msg)
	}
}
```

Use the usual `f.SendEcho()` to send a raw text message and `f.SendJson()` to send a json message to the client.


Once the request handler returns, 
for example by exiting the `for` loop, 
the web socket stream ends.

!!! warning
    Always track cancelled requests while streaming web sockets.<br/>
    Read more about cancellation [here](./cancellation.md).

!!! note
    Read more about `serve()` [here](./api.md).
