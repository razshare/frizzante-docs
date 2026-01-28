package send

import (
	"main/lib/core/clients"
	"main/lib/core/stack"
)

// Headers sends header fields.
func Headers(client *clients.Client, fields map[string]string) {
	if client.Locked {
		client.Options.ErrorLog.Println("header is locked", stack.Trace())
		return
	}
	for key, value := range fields {
		client.Writer.Header().Set(key, value)
	}
}
