package fallback

import (
	"main/lib/core/clients"
	"main/lib/core/send"
	"main/lib/routes/overview"
)

func View(client *clients.Client) {
	if !send.RequestedFile(client) {
		overview.View(client)
	}
}
