You can upgrade http requests to server sent events with `f.SendSseUpgrade()`.

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

func build(context f.ApiContext) {
    // Build api.
	withPath, withHandler := context()
	withPath("/welcome")
	withView(f.ViewReference("Welcome")) // This references the file 
										 // "lib/components/views/Welcome.svelte"
	withHandler(handle)
}

func handle(request *f.Request, response *f.Response) {
    // Upgrade to server sent events.
    withEventName := f.SendSseUpgrade(response)

    for {
        // Send to channel-1.
        withEventName("channel-1")
        f.SendEcho(response, "This is a message for channel-1")
        
        // Send to channel-2.
        withEventName("channel-2")
        f.SendEcho(response, "This is a message for channel-2")
        f.SendEcho(response, "This is another message for channel-2")

        // Send to channel-1.
        withEventName("channel-1")
        f.SendEcho(response, "Back to channel-1")

        // Sleep for a bit.
        time.Sleep(time.Second)
    }
}
```

Set the name of the current event with `withEventName`, 
then start sending content to the client with the usual `f.SendEcho()` and `f.SendJson()`.


Once the request handler returns, 
for example by exiting the `for` loop, 
the event stream ends.

!!! warning
    Always track cancelled requests while streaming events.<br/>
    Read more about cancellation [here](./cancellation.md).

!!! note
    The default event name is `message`.
