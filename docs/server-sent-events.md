You can upgrade http requests to server sent events with `f.SendSseUpgrade()`.

```go
package main

import (
	"embed"
	f "github.com/razshare/frizzante"
)

//go:embed .dist/*/**
var dist embed.FS

func api(
	withPattern func(pattern string),
	withHandler func(handler func(
        request *f.Request,
        response *f.Response,
    )),
) {
    withPattern("GET /")
    withHandler(func(
        request *f.Request,
        response *f.Response,
    ) {
        setEventName := f.SendSseUpgrade(response)
        setEventName("server-time")

        for {
            // Send events.
            f.SendEcho(response, fmt.Sprintf("Server time is %s", time.Now()))
        }
    })
}

func main() {
	// Create.
	server := f.ServerCreate()
	notifier := f.NotifierCreate()

	// Setup.
	f.ServerWithPort(server, 8080)
	f.ServerWithHostName(server, "127.0.0.1")
	f.ServerWithEmbeddedFileSystem(server, dist)
	f.ServerWithNotifier(server, notifier)

	// Api.
	f.ServerWithApi(server, api)

	// Start.
	f.ServerStart(server)
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
