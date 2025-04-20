You can upgrade http requests to server sent events with `f.SendServerSentEventsUpgrade()`.

```go
f.ServerWithApi(srv, "GET /",
    func(req *f.Request, res *f.Response) {
        canc := f.ReceiveCancellationReadable(req)
        f.SendServerSentEventsUpgrade(res, func(event func(string)) {
            for !f.ReadableGet(canc) {
                f.SendEcho(res, fmt.Sprintf("Server time is %s", time.Now()))
                time.Sleep(time.Second * 1)
            }
        })
    },
)
```

!!! note
    Once the callback function returns, 
    for example by exiting the `for` loop, 
    the server sent events connection ends.