You can upgrade http requests to server sent events with `f.SendSseUpgrade()`.

```go
func handler(req *f.Request, res *f.Response) {
    setEventName := f.SendSseUpgrade(res)
    setEventName("server-time")

	for {
		f.SendEcho(res, fmt.Sprintf("Server time is %s", time.Now()))
	}
}
```

Set the name of the current event with `setEventName`, 
then start sending content to the client with the usual `f.SendEcho()` and `f.SendJson()`.


Once the request handler returns, 
for example by exiting the `for` loop, 
the event stream ends.

!!! warning
    Always track cancelled requests while streaming events.<br/>
    Read more about cancellation [here](./cancellation.md).

!!! note
    The default event name is `message`.

!!! note
    Read more about `serve()` [here](./api.md).
