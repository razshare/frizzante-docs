package send

import (
	"main/lib/core/clients"
	"main/lib/core/stack"
)

// Header sends a header field.
//
// If the status has not been sent already, a default "200 OK" status will be sent immediately.
//
// This means the status will become locked and further attempts to send the status will fail with an error.
//
// All errors are sent to the server notifier.
func Header(client *clients.Client, key string, value string) {
	if client.Locked {
		client.Options.ErrorLog.Println("header is locked", stack.Trace())
		return
	}
	client.Writer.Header().Set(key, value)
}
