You can upgrade http requests to web sockets with `f.SendWsUpgrade()`.

```go
f.ServerWithApi(server, func(
    withPattern f.WithApiPattern,
    withHandler f.WithApiHandler,
) {
    withPattern("GET /")
    withHandler(func(
        request *f.Request,
        response *f.Response,
    ) {
        f.SendWsUpgrade(response)

        for {
            // Send message.
            f.SendEcho(response, "hello")

            // Wait for incoming message.
            msg := f.ReceiveMessage(request)
            
            fmt.Printf("Received message `%s`.\n", msg)
        }
    })
})
```

Use the usual `f.SendEcho()` to send a raw text message and `f.SendJson()` to send a json message to the client.


Once the request handler returns, 
for example by exiting the `for` loop, 
the web socket stream ends.

!!! warning
    Always track cancelled requests while streaming web sockets.<br/>
    Read more about cancellation [here](./cancellation.md).
