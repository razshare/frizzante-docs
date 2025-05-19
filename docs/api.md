Use `server.OnRequest()` or `server.WithApiController()` to create an api.

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
)

type MyApiController struct {
	f.ApiController
}

func (controller MyApiController) Configure() f.ApiConfiguration {
	return f.ApiConfiguration{
		Pattern: "GET /api/my-controller",
	}
}

func (controller MyApiController) Handle(request *f.Request, response *f.Response) {
	// Handle request.
}
```


## Send message

You can send out a message with `response.SendMessage()`

`lib/controllers/api/MyApiController.go`
```go
func (controller MyApiController) Handle(request *f.Request, response *f.Response) {
	response.SendMessage("hello")
}
```

## Path

You can define path fields in your pattern using the curly 
braces format `{}` and retrieve fields with `response.ReceivePath()`.

`lib/controllers/api/MyApiController.go`
```go
func (controller MyApiController) Handle(request *f.Request, response *f.Response) {
    name := request.ReceivePath("name")
	response.SendMessage("hello "+name)
}
```

## Status

You can send out a status code with `response.SendStatus()`

`lib/controllers/api/MyApiController.go`
```go
func (controller MyApiController) Handle(request *f.Request, response *f.Response) {
    response.SendStatus(404)
	response.SendMessage("Resource not found, sorry.")
}
```

!!! note
    Status codes must be sent out before sending any header fields.

## Header

You can retrieve header fields with `request.ReceiveHeader()` and send out header fields with `response.SendHeader()`.

`lib/controllers/api/MyApiController.go`
```go
func (controller MyApiController) Handle(request *f.Request, response *f.Response) {
    contentType := request.ReceiveHeader("Content-Type")
    if "application/xml" != contentType {
        response.SendStatus(400)
        response.SendHeader("Content-Length", "69")
        response.SendMessage("We don't serve your kind around here, better get an XML encoder, heh.")
        return
    }

    response.SendStatus(404)
    response.SendHeader("Content-Length", "26")
    response.SendMessage("Resource not found, sorry.")
}
```

!!! note
    Header fields must be sent out before sending a body.

## Query

You can retrieve values of query fields with `request.ReceiveQuery()`

`lib/controllers/api/MyApiController.go`
```go
func (controller MyApiController) Handle(request *f.Request, response *f.Response) {
    name := request.ReceiveQuery("name")
    response.SendMessage("hello "+name)
}
```

## Forms

Forms can be retrieved with `request.ReceiveForm()`.

You can use the `url.Values` api in order to retrieve specific form fields.

`lib/controllers/api/MyApiController.go`
```go
func (controller MyApiController) Handle(request *f.Request, response *f.Response) {
    form := request.ReceiveForm()
    name := form.Get("name")
    response.SendMessage("hello "+name)
}
```

!!! note
    Forms must be passed through the body of the request, so verbs without body, like `GET` and `DELETE`, will fail to read the form.

## Json

Json bodies can be read and decoded with `f.RequestReceiveJson[T]()`.

`lib/controllers/api/MyApiController.go`
```go
func (controller MyApiController) Handle(request *f.Request, response *f.Response) {
    var person Person
    request.ReceiveJson(person)
    response.SendMessage("hello "+person.Name)
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