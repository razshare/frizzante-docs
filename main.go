package main

import (
	"embed"
	"log"

	"main/lib/core/routes"
	"main/lib/core/routes/statics"
	"main/lib/core/servers"
	"main/lib/core/ssr"
	"main/lib/routes/fallback"
	"main/lib/routes/get_started"
	"main/lib/routes/overview"
)

//go:generate frizzante clean
//go:generate frizzante generate types
//go:generate frizzante configure
//go:embed app/dist
var efs embed.FS
var server = servers.New()

func main() {
	server.Efs = efs
	server.Render = ssr.New(1)
	server.Routes = []routes.Route{
		{Pattern: "GET /", Handler: fallback.View},
		{Pattern: "GET /overview", Handler: overview.View},
		{Pattern: "GET /get_started", Handler: get_started.View},
		statics.New("GET /@statics", server),
	}
	if err := servers.Start(server); err != nil {
		log.Fatal(err)
	}
}
