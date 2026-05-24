package send

import (
	"strings"

	"main/lib/core/clients"
	"main/lib/core/stack"
	"main/lib/core/views"
	"main/lib/core/views/renders"
)

// View sends a view.
func View(client *clients.Client, view views.View) {
	header := client.Writer.Header()
	if header.Get("Location") != "" {
		return
	}
	if strings.Contains(client.Request.Header.Get("Accept"), "application/json") {
		if header.Get("Cache-Control") == "" {
			Header(client, "Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
		}
		if header.Get("Pragma") == "" {
			Header(client, "Pragma", "no-cache")
		}
		if view.Props == nil {
			view.Props = map[string]string{}
		}
		data := views.NewData(view)
		data.Type = client.Request.Header.Get("X-FrizzanteViewType")
		Json(client, data)
		return
	}
	if client.Options.Render == nil {
		client.Options.ErrorLog.Printf(
			"send.View: no render function defined\n%s",
			stack.Trace(),
		)
		return
	}
	data := views.NewData(view)
	data.Type = client.Request.Header.Get("X-FrizzanteViewType")
	var html string
	var err error
	if html, err = client.Options.Render(renders.RenderOptions{
		Efs:      client.Options.Efs,
		View:     view,
		Data:     data,
		ErrorLog: client.Options.ErrorLog,
		InfoLog:  client.Options.InfoLog,
	}); err != nil {
		client.Options.ErrorLog.Printf(
			"send.View: failed to render view: %v\n%s",
			err,
			stack.Trace(),
		)
	}
	if client.Writer.Header().Get("Content-Type") == "" {
		Header(client, "Content-Type", "text/html")
	}
	Message(client, html)
}
