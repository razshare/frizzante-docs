package send

import (
	"net/http"

	"main/lib/core/clients"
)

// Error sends a message with status 500 Internal Server Error.
func Error(client *clients.Client, err error) {
	Status(client, http.StatusInternalServerError)
	Message(client, err.Error())
}
