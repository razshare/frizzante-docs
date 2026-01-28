package send

import (
	"net/http"

	"main/lib/core/clients"
)

// Forbiddenf sends a message with status 403 Forbidden.
func Forbiddenf(client *clients.Client, message string, vars ...any) {
	Status(client, http.StatusForbidden)
	Messagef(client, message, vars...)
}
