Before starting a session you first need a session builder.

!!! note
	A session builder is a function that builds (or retrieves) a session's state.<br/>
	It provides the basic mechanisms for checking, getting, setting properties and a destroyer function, which specifies what should happen when a session is "destroyed".

`lib/sessions/memory.go`
```go
package sessions

import f "github.com/razshare/frizzante"

type State struct {
	Name string `json:"name"`
}

var memory = map[string]State{}

// Memorized builds sessions in memory.
func Memorized(session *f.Session[State]) {
	session.WithExistsHandler(func() bool {
		_, exists := memory[session.Id]
		return exists
	})

	session.WithLoadHandler(func() {
		session.Data = memory[session.Id]
	})

	session.WithSaveHandler(func() {
		memory[session.Id] = session.Data
	})

	session.WithDestroyHandler(func() {
		delete(memory, session.Id)
	})

	if session.Exists() {
		session.Load()
		return
	}

	session.Data = State{Name: "world"}
}
```


## Start session

Use `f.SessionStart()` to start the session.


`main.go`
```go
package main

import (
	"embed"
	f "github.com/razshare/frizzante"
	"main/lib/controllers/api"
)

//go:embed .dist/*/**
var dist embed.FS

func main() {
	// Create.
	server := f.NewServer(dist)
	notifier := f.NewNotifier()

	// Configure.
	server.WithPort(8080)
	server.WithNotifier(notifier)
	server.WithHostName("127.0.0.1")

	// Api.
	server.WithApiController(api.MyApiController{})

	//Start.
	server.Start()
}
```

`lib/controllers/api/MyApiController.go`
```go
package api

import (
	"fmt"
	f "github.com/razshare/frizzante"
)

type MyApiController struct {
	f.ApiController
}

func (_ MyApiController) Configure() f.ApiConfiguration {
	return f.ApiConfiguration{
		Pattern: "GET /api/my-controller",
	}
}

func (_ MyApiController) Handle(req *f.Request, res *f.Response) {
	// Start session.
	session := f.SessionStart(req, res, sessions.Memorized)
}
```

## Lifetime

The `f.SessionStart()` function does not set any expiration date, domain or path on the session cookie sent to the browser.