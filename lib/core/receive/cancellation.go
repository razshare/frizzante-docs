package receive

import "main/lib/core/clients"

// Cancellation returns a channel that closes when the request gets cancelled.
func Cancellation(client *clients.Client) <-chan struct{} {
	return client.Request.Context().Done()
}
