package routes

import (
	"main/lib/core/clients"
	"main/lib/core/guards"
)

type Route struct {
	Pattern string
	Handler func(client *clients.Client)
	Guards  []guards.Guard
}
