You can upgrade http requests to web sockets with `f.SendWebSocketUpgrade()`.

```go
f.ServerWithApi(srv, "GET /",
    func(_ *f.Server, req *f.Request, res *f.Response) {
        f.SendWebSocketUpgrade(res, func() {
            for {
                f.SendEcho(res, "hello")
                msg := f.ReceiveMessage(req)
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