package send

import (
	"net/http"

	"main/lib/core/clients"
)

// TooManyRequests sends a message with status 403 Forbidden.
func TooManyRequests(client *clients.Client, message string) {
	Status(client, http.StatusTooManyRequests)
	Message(client, message)
}
