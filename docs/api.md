Use `server.OnRequest()` to handle incoming requests.

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
	server.OnRequest("GET /api", func(req *f.Request, res *f.Response){
		// Handle request.
	})

	//Start.
	server.Start()
}
```

Use `server.WithApiController()` to handle requests in a more opinionated way, using a controller

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

where `api.MyApiController` is defined as

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
	// Handle request.
}
```

## Send message

You can send out a message with `res.SendMessage()`

`lib/controllers/api/MyApiController.go`
```go
func (_ MyApiController) Handle(req *f.Request, res *f.Response) {
	res.SendMessage("hello")
}
```

## Path

You can define path fields in your pattern using the curly 
braces format `{}` and retrieve fields with `res.ReceivePath()`.

`lib/controllers/api/MyApiController.go`
```go
func (_ MyApiController) Handle(req *f.Request, res *f.Response) {
    name := req.ReceivePath("name")
	res.SendMessage("hello "+name)
}
```

## Status

You can send out a status code with `res.SendStatus()`

`lib/controllers/api/MyApiController.go`
```go
func (_ MyApiController) Handle(req *f.Request, res *f.Response) {
    res.SendStatus(404)
	res.SendMessage("Resource not found, sorry.")
}
```

!!! note
    Status codes must be sent out before sending any header fields.

## Header

You can retrieve header fields with `req.ReceiveHeader()` and send out header fields with `res.SendHeader()`.

`lib/controllers/api/MyApiController.go`
```go
func (_ MyApiController) Handle(req *f.Request, res *f.Response) {
    contentType := req.ReceiveHeader("Content-Type")
    if "application/xml" != contentType {
        res.SendStatus(400)
        res.SendHeader("Content-Length", "69")
        res.SendMessage("We don't serve your kind around here, better get an XML encoder, heh.")
        return
    }

    res.SendStatus(404)
    res.SendHeader("Content-Length", "26")
    res.SendMessage("Resource not found, sorry.")
}
```

!!! note
    Header fields must be sent out before sending a body.

## Query

You can retrieve values of query fields with `req.ReceiveQuery()`

`lib/controllers/api/MyApiController.go`
```go
func (_ MyApiController) Handle(req *f.Request, res *f.Response) {
    name := req.ReceiveQuery("name")
    res.SendMessage("hello "+name)
}
```

## Forms

Forms can be retrieved with `req.ReceiveForm()`.

You can use the `url.Values` api in order to retrieve specific form fields.

`lib/controllers/api/MyApiController.go`
```go
func (_ MyApiController) Handle(req *f.Request, res *f.Response) {
    form := req.ReceiveForm()
    name := form.Get("name")
    res.SendMessage("hello "+name)
}
```

!!! note
    Forms must be passed through the body of the request, so verbs without body, like `GET` and `DELETE`, will fail to read the form.

## Json

Json bodies can be read and decoded with `req.ReceiveJson[T]()`.

`lib/controllers/api/MyApiController.go`
```go
func (_ MyApiController) Handle(req *f.Request, res *f.Response) {
    var person Person
    req.ReceiveJson(person)
    res.SendMessage("hello "+person.Name)
}
```

Where `Person` would be a struct

```go
type Person struct {
    Name string
}
```

## Conventions

Api functions should be created under `lib/controllers/api/{name}.go`, where `{name}` is the name of the api.