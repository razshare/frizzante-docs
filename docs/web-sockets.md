You can upgrade http requests to web sockets with `f.SendWsUpgrade()`.

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

func build(context f.ApiContext){
	withPath, withHandler := context()
    // Build api.
	withPath("/welcome")
	withHandler(handle)
}

func handle(request *f.Request, response *f.Response) {
    f.SendWsUpgrade(response)

    for {
        // Send message.
        f.SendEcho(response, "hello")

        // Wait for incoming message.
        msg := f.ReceiveMessage(request)
        
		// Log.
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
