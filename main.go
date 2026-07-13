package main

import (
	"embed"
	"errors"
	"log"
	"net/http"
	"os"

	"main/lib/core/routes"
	"main/lib/core/routes/statics"
	"main/lib/core/send"
	"main/lib/core/servers"
	"main/lib/core/ssr"
	"main/lib/core/views"
)

//go:generate frizzante clean
//go:generate frizzante configure
//go:embed app/dist
var efs embed.FS
var errorLog = log.New(os.Stderr, "[error]: ", log.Ldate|log.Ltime)
var infoLog = log.New(os.Stdout, "[info]: ", log.Ldate|log.Ltime)
var render = ssr.New(ssr.Options{
	Efs:      efs,
	ErrorLog: errorLog,
	InfoLog:  infoLog,
	Limit:    1,
})
var props = map[string]any{"prefix": os.Getenv("PREFIX")}
var appRoutes = []routes.Route{
	{Pattern: "GET /", Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
		if found, err := send.RequestedFile(writer, request, efs, "/"); err != nil || !found {
			send.View(writer, request, render, views.View{Name: "GetStarted", Props: props})
		}
	}},
	{Pattern: "GET /get_started", Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
		send.View(writer, request, render, views.View{Name: "GetStarted", Props: props})
	}},
	{Pattern: "GET /basics", Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
		send.View(writer, request, render, views.View{Name: "Basics", Props: props})
	}},
	{Pattern: "GET /build_checkpoints", Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
		send.View(writer, request, render, views.View{Name: "BuildCheckpoints", Props: props})
	}},
	{Pattern: "GET /web_sockets", Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
		send.View(writer, request, render, views.View{Name: "WebSockets", Props: props})
	}},
	{Pattern: "GET /server_sent_events", Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
		send.View(writer, request, render, views.View{Name: "ServerSentEvents", Props: props})
	}},
	{Pattern: "GET /guards", Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
		send.View(writer, request, render, views.View{Name: "Guards", Props: props})
	}},
	{Pattern: "GET /views", Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
		send.View(writer, request, render, views.View{Name: "Views", Props: props})
	}},
	{Pattern: "GET /web_standards", Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
		send.View(writer, request, render, views.View{Name: "WebStandards", Props: props})
	}},
	{Pattern: "GET /type_definitions", Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
		send.View(writer, request, render, views.View{Name: "TypeDefinitions", Props: props})
	}},
	{Pattern: "GET /todos_example", Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
		send.View(writer, request, render, views.View{Name: "TodosExample", Props: props})
	}},
	{Pattern: "GET /cli", Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
		send.View(writer, request, render, views.View{Name: "Cli", Props: props})
	}},
	{Pattern: "GET /snapshots", Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
		send.View(writer, request, render, views.View{Name: "Snapshots", Props: props})
	}},
	{Pattern: "GET /docker", Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
		send.View(writer, request, render, views.View{Name: "Docker", Props: props})
	}},
	{Pattern: "GET /issues", Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
		send.View(writer, request, render, views.View{Name: "Issues", Props: props})
	}},
	{Pattern: "GET /contributing", Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
		send.View(writer, request, render, views.View{Name: "Contributing", Props: props})
	}},
	{Pattern: "GET /faq", Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
		send.View(writer, request, render, views.View{Name: "Faq", Props: props})
	}},
	{Pattern: "GET /full_screen_menu", Handler: func(_ routes.Scope, request *http.Request, writer http.ResponseWriter) {
		send.View(writer, request, render, views.View{Name: "FullScreenMenu", Props: props})
	}},
}
var startError = servers.Start(servers.StartOptions{
	ErrorLog: errorLog,
	InfoLog:  infoLog,
	Routes: append(
		appRoutes,
		routes.Route{
			Pattern: "GET /@statics",
			Handler: statics.NewRouteHandler(appRoutes),
		},
	),
})

func main() {
	if err := errors.Join(startError); err != nil {
		log.Fatal(err)
	}
}
