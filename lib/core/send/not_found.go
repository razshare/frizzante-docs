package send

import (
	"net/http"

	"main/lib/core/clients"
)

// NotFound sends a message with status 404 Not Found.
func NotFound(client *clients.Client, message string) {
	Status(client, http.StatusNotFound)
	Message(client, message)
}
