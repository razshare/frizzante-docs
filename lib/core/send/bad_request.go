package send

import (
	"net/http"

	"main/lib/core/clients"
)

// BadRequest sends a message with status 400 Bad Request.
func BadRequest(client *clients.Client, message string) {
	Status(client, http.StatusBadRequest)
	Message(client, message)
}
