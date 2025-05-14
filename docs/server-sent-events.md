You can upgrade http requests to server sent events with `f.ResponseSendSseUpgrade()`.

`main.go`
```go
package main

import (
	"embed"
	f "github.com/razshare/frizzante"
)

//go:embed .dist/*/**
var dist embed.FS

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
	f.ServerWithApiBuilder(server, api.MyApi)

	// Start.
	f.ServerStart(server)
}
```

`lib/api/MyApi.go`
```go
package api

import f "github.com/razshare/frizzante"

func MyApi(api *f.Api) {
    // Build api.
    f.ApiWithPattern(api, "GET /")
    f.ApiWithRequestHandler(api, func(request *f.Request, response *f.Response) {
        // Upgrade to server sent events.
        withEventName := f.ResponseSendSseUpgrade(response)

        for {
            // Send to channel-1.
            withEventName("channel-1")
            f.ResponseSendMessage(response, "This is a message for channel-1")
            
            // Send to channel-2.
            withEventName("channel-2")
            f.ResponseSendMessage(response, "This is a message for channel-2")
            f.ResponseSendMessage(response, "This is another message for channel-2")

            // Send to channel-1.
            withEventName("channel-1")
            f.ResponseSendMessage(response, "Back to channel-1")

            // Sleep for a bit.
            time.Sleep(time.Second)
        }
    })
}
```


Set the name of the current event with `withEventName`, 
then start sending content to the client with the usual `f.ResponseSendMessage()` and `f.ResponseSendJson()`.


Once the request handler returns, 
for example by exiting the `for` loop, 
the event stream ends.

!!! warning
    Always track cancelled requests while streaming events.<br/>
    Read more about cancellation [here](./cancellation.md).

!!! note
    The default event name is `message`.
