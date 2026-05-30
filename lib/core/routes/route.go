package routes

import "main/lib/core/guards"

type Route struct {
	Pattern string
	Handler Handler
	Guards  []guards.Guard
}
