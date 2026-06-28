package main

import (
	"main/lib/core/routes"
	"main/lib/core/send"
	"net/http"
	"time"
)

var _ = routes.Route{
	Pattern: "GET /",
	Handler: func(request *http.Request, writer http.ResponseWriter) {
		event := send.SseUpgrade(&writer) // Sends sse upgrade to the client
		// and replaces writer with a sse compliant one.
		for {
			event("channel-1")                     // Switches to "channel-1".
			_, _ = writer.Write([]byte("hello 1")) // Sends message.
			event("channel-2")                     // Switches to "channel-2".
			_, _ = writer.Write([]byte("hello 2")) // Sends message.
			time.Sleep(time.Second)                // Sleeps for 1 second.
		}
	},
}
