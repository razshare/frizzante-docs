package basics

import (
	"main/lib/core/clients"
	"main/lib/core/send"
	"main/lib/core/views"
)

func View(client *clients.Client) {
	send.View(client, views.View{Name: "Basics"})
}
