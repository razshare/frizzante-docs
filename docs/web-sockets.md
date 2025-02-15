You can automatically upgrade http requests to web sockets with `frz.SendWebSocketUpgrade()`.

```go
frz.ServerWithRoute(srv, "GET /",
    func(_ *frz.Server, req *frz.Request, res *frz.Response) {
        frz.SendWebSocketUpgrade(res, func() {
            for {
                frz.SendEcho(res, "hello")
                msg := frz.ReceiveMessage(req)
                fmt.Printf("Received message `%s`.\n", msg)
            }
        })
    },
)
```

!!! note
    Once the callback function returns, 
    for example by exiting the `for` loop, 
    the web socket connection ends.
