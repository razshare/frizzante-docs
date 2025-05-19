Always track cancelled requests while streaming events, web sockets, executing long running tasks or expensive tasks in your request handlers.

You can detect cancelled requests with `request.IsAlive()`.

For example using sse

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
func (controller MyApiController) Handle(request *f.Request, response *f.Response) {
	alive := request.IsAlive() // <======== This tracks status of the request.

	// Upgrade to server sent events.
	event := response.SendSseUpgrade()
	event("server-time")

	// Continuously check if connection is still alive.
	for *alive {
		now := time.Now()
		message := fmt.Sprintf("Server time is %s", now)
		response.SendMessage(message)
	}
}
```