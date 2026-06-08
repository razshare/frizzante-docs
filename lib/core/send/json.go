package send

import (
	"encoding/json"

	"main/lib/core/clients"
	"main/lib/core/logs"
	"main/lib/core/stack"
)

// Json sends json content.
//
// Compatible with web sockets and server sent events.
func Json(client *clients.Client, value any) {
	data, err := json.Marshal(value)
	if err != nil {
		logs.Errorf(
			client,
			"send.Json: failed to marshal value (type=%T) to JSON: %v\n%s",
			value,
			err,
			stack.Trace(),
		)
		return
	}
	if client.WebSocket == nil {
		if client.Writer.Header().Get("Content-Type") == "" {
			client.Writer.Header().Set("Content-Type", "application/json")
		}
	}
	Content(client, data)
}
