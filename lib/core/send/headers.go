package send

import (
	"main/lib/core/clients"
	"main/lib/core/logs"
	"main/lib/core/stack"
)

// Headers sends header fields.
func Headers(client *clients.Client, fields map[string]string) {
	if client.Locked {
		logs.Errorf(
			client,
			"send.Headers: headers are locked, cannot set headers\n%s",
			stack.Trace(),
		)
		return
	}
	for key, value := range fields {
		client.Writer.Header().Set(key, value)
	}
}
