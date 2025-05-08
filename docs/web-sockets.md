You can upgrade http requests to web sockets with `f.ResponseSendWsUpgrade()`.

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
	f.ServerWithApiBuilder(server, build)

	// Start.
	f.ServerStart(server)
}

func build(api *f.Api) {
    // Build api.
	f.ApiWithPattern("GET /welcome")
	f.ApiWithRequestHandler(handle)
}

func handle(request *f.Request, response *f.Response) {
    // Upgrade to web sockets.
    f.ResponseSendWsUpgrade(response)

    for {
        // Send message.
        f.ResponseSendMessage(response, "hello")

        // Wait for incoming message.
        msg := f.RequestReceiveMessage(request)
        
		// Log.
        fmt.Printf("RequestReceived message `%s`.\n", msg)
    }
}
```

Use the usual `f.ResponseSendMessage()` to send a raw text message and `f.ResponseSendJson()` to send a json message to the client.


Once the request handler returns, 
for example by exiting the `for` loop, 
the web socket stream ends.

!!! warning
    Always track cancelled requests while streaming web sockets.<br/>
    Read more about cancellation [here](./cancellation.md).
