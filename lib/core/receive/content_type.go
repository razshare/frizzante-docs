package receive

import "main/lib/core/clients"

// ContentType reads the Content-Type header field and returns the value.
func ContentType(client *clients.Client) string {
	return client.Request.Header.Get("Content-Type")
}
