package send

import (
	"net/http"

	"main/lib/core/clients"
)

// Unauthorized sends a message with status 401 Unauthorized.
func Unauthorized(client *clients.Client, message string) {
	Status(client, http.StatusUnauthorized)
	Message(client, message)
}
