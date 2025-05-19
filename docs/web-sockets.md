You can upgrade http requests to server sent events with `response.SendWsUpgrade()`.

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
	// Upgrade to web sockets.
	response.SendWsUpgrade()

	for {
		// Send message.
		response.SendMessage("hello")

		// Wait for incoming message.
		msg := request.ReceiveMessage()
		
		// Log.
		fmt.Printf("RequestReceived message `%s`.\n", msg)
	}
}
```


You can send content to the client with the usual `response.SendMessage()` and `response.SendJson()`.


Once the request handler returns, 
for example by exiting the `for` loop, 
the web socket connection ends.

!!! warning
	Always track cancelled requests while streaming web sockets.<br/>
	Read more about cancellation [here](./cancellation.md).
