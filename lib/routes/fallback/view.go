package fallback

import (
	"main/lib/core/clients"
	"main/lib/core/send"
	"main/lib/routes/welcome"
)

func View(client *clients.Client) {
	if !send.RequestedFile(client) {
		welcome.View(client)
	}
}
