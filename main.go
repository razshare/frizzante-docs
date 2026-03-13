package main

import (
	"embed"
	"log"

	"main/lib/core/clients"
	"main/lib/core/routes"
	"main/lib/core/routes/statics"
	"main/lib/core/send"
	"main/lib/core/servers"
	"main/lib/core/ssr"
	"main/lib/core/views"
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
		{Pattern: "GET /", Handler: func(client *clients.Client) {
			if !send.RequestedFile(client) {
				send.View(client, views.View{Name: "GetStarted"})
			}
		}},
		{Pattern: "GET /get_started", Handler: func(client *clients.Client) { send.View(client, views.View{Name: "GetStarted"}) }},
		{Pattern: "GET /basics", Handler: func(client *clients.Client) { send.View(client, views.View{Name: "Basics"}) }},
		{Pattern: "GET /web_sockets", Handler: func(client *clients.Client) { send.View(client, views.View{Name: "WebSockets"}) }},
		{Pattern: "GET /server_sent_events", Handler: func(client *clients.Client) { send.View(client, views.View{Name: "ServerSentEvents"}) }},
		{Pattern: "GET /guards", Handler: func(client *clients.Client) { send.View(client, views.View{Name: "Guards"}) }},
		{Pattern: "GET /views", Handler: func(client *clients.Client) { send.View(client, views.View{Name: "Views"}) }},
		{Pattern: "GET /web_standards", Handler: func(client *clients.Client) { send.View(client, views.View{Name: "WebStandards"}) }},
		{Pattern: "GET /type_definitions", Handler: func(client *clients.Client) { send.View(client, views.View{Name: "TypeDefinitions"}) }},
		{Pattern: "GET /todos_example", Handler: func(client *clients.Client) { send.View(client, views.View{Name: "TodosExample"}) }},
		{Pattern: "GET /cli", Handler: func(client *clients.Client) { send.View(client, views.View{Name: "Cli"}) }},
		{Pattern: "GET /snapshots", Handler: func(client *clients.Client) { send.View(client, views.View{Name: "Snapshots"}) }},
		{Pattern: "GET /docker", Handler: func(client *clients.Client) { send.View(client, views.View{Name: "Docker"}) }},
		{Pattern: "GET /issues", Handler: func(client *clients.Client) { send.View(client, views.View{Name: "Issues"}) }},
		{Pattern: "GET /contributing", Handler: func(client *clients.Client) { send.View(client, views.View{Name: "Contributing"}) }},
		{Pattern: "GET /faq", Handler: func(client *clients.Client) { send.View(client, views.View{Name: "Faq"}) }},
		// Your `frizzante generate snapshot` requires an endpoint that lists
		// all static routes of the server. This `statics.New()` function
		// simply creates a route that lists those routes.
		// Your snapshot command should be: `frizzante generate snapshot http://127.0.0.1:8080/@statics .gen/snapshot`
		// or `make snapshot`. See makefile.
		statics.New("GET /@statics", server),
	}
	if err := servers.Start(server); err != nil {
		log.Fatal(err)
	}
}
