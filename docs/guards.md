You can guard api and page controllers by configuring the `Guards` property on your controller.

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
	server := f.NewServer()
	notifier := f.NewNotifier()

	// Configure.
	server.WithPort(8080)
	server.WithNotifier(notifier)
	server.WithHostName("127.0.0.1")
	server.WithEmbeddedFileSystem(&dist)

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
	"main/lib/guards"
	"time"
)

type MyApiController struct {
	f.ApiController
}

func (controller MyApiController) Configure() f.ApiConfiguration {
	return f.ApiConfiguration{
		Pattern: "GET /api/my-controller",
		Guards: []f.GuardFunction{
			guards.SessionIsValid, // <======== This configures a guard.
		}
	}
}

func (controller MyApiController) Handle(request *f.Request, response *f.Response) {
	// Handle request.
}
```

Where `guards.SessionIsValid` is a guard function


!!! note
	A guard function is a function that handles incoming requests before they reach any of your actual api and page handlers.<br/>
	Guards can decide which requests should pass through and which request should be rejected.

`lib/guards/SessionIsValid.go`
```go
package guards

import (
	f "github.com/razshare/frizzante"
	"main/lib/sessions"
	"time"
)

func SessionIsValid(request *f.Request, response *f.Response) bool {
	session := f.SessionStart(request, response, sessions.Archived)

	if time.Since(session.Data.LastActivity) > 30*time.Minute {
		session.Destroy()
		response.SendNavigate("Expired", f.NewView(nil))
		return false
	}

	session.Data.LastActivity = time.Now()
	return true
}

```

Return `true` to let the request through and `false` to reject it.


## Conventions

Guards should be created under `lib/guards/{name}.go`, where `{name}` is the name of the guard.