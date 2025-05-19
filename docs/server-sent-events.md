You can upgrade http requests to server sent events with `f.ResponseSendSseUpgrade()`.

`main.go`
```go
package main

import (
	"embed"
	f "github.com/razshare/frizzante"
	"main/lib/controllers/api"
)

//go:embed .dist/*/**
var dist embed.FS

func main() {
	// Create.
	server := f.NewServer()
	notifier := f.NewNotifier()

	// Configure.
	server.WithPort(8080)
	server.WithNotifier(notifier)
	server.WithHostName("127.0.0.1")
	server.WithEmbeddedFileSystem(&dist)

	// Api.
	server.WithApiController(api.MyApiController{})

	//Start.
	server.Start()
}
```

`lib/controllers/api/MyApiController.go`
```go
package api

import (
	"fmt"
	f "github.com/razshare/frizzante"
	"time"
)

type MyApiController struct {
	f.ApiController
}

func (controller MyApiController) Configure() f.ApiConfiguration {
	return f.ApiConfiguration{
		Pattern: "GET /api/my-controller",
	}
}

func (controller MyApiController) Handle(request *f.Request, response *f.Response) {
    // Upgrade to server sent events.
    event := response.SendSseUpgrade()

    for {
        // Send to channel-1.
        event("channel-1")
        response.SendMessage("This is a message for channel-1")
        
        // Send to channel-2.
        event("channel-2")
        response.SendMessage("This is a message for channel-2")
        response.SendMessage("This is another message for channel-2")

        // Send to channel-1.
        event("channel-1")
        response.SendMessage("Back to channel-1")

        // Sleep for a bit.
        time.Sleep(time.Second)
    }
}
```


Set the name of the current event with `event()`, 
then start sending content to the client with the usual `response.SendMessage()` and `response.SendJson()`.


Once the request handler returns, 
for example by exiting the `for` loop, 
the event stream ends.

!!! warning
    Always track cancelled requests while streaming events.<br/>
    Read more about cancellation [here](./cancellation.md).

!!! note
    The default event name is `message`.
