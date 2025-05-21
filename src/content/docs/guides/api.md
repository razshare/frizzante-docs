---
title: Api
---

Frizzante defines its web api through request handlers,
callback functions that are invoked whenever a client sends a request
to a given http pattern.

These request handlers are defined through the server with `.OnRequest()`.

```go
//main.go
package main

import f "github.com/razshare/frizzante"

func main() {
    f.NewServer().OnRequest("GET /api", handle).Start()
}

func handle(req *f.Request, res *f.Response){
	// Handle request here.
}
```

You can also specify path fields within the pattern
using curly braces syntax (`{}`)

```http
GET /api/{username}/about
```

You can then retrieve these fields from the request by using `.ReceivePath()`.

```go
func handle(req *f.Request, res *f.Response){
	name := req.ReceivePath("username")
	// Do something with name.
}
```

### Api Controllers

Another way of defining an api is to provide 
the server with controller handlers by using `.WithApiController()`.

```go
//main.go
package main

import (
	"main/lib/controllers/api"
	f "github.com/razshare/frizzante"
)

func main() {
    f.
    NewServer().
    WithApiController(api.About).
    Start()
}
```

```go
//lib/controllers/api/controller.go
package api

import (
	"fmt"
	f "github.com/razshare/frizzante"
)

var About = f.
	NewApiController().
	WithPath("/api/{username}/about").
	WithHandler("GET", get)

func get(req *f.Request, res *f.Response) {
	name := req.ReceivePath("username")
	message := fmt.Sprintf("Hello %s!", name)
	res.SendMessage(message)
}
```