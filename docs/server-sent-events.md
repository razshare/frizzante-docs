You can upgrade http requests to server sent events with `f.SendSseUpgrade()`.

```go
func handler(request *f.Request, response *f.Response) {
    setEventName := f.SendSseUpgrade(response)
    setEventName("server-time")

	for {
		f.SendEcho(response, fmt.Sprintf("Server time is %s", time.Now()))
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
