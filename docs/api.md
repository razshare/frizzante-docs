You can create apis with `f.ServerWithApiBuilder()`

```go
package main

import (
	"embed"
	f "github.com/razshare/frizzante"
)

//go:embed .dist/*/**
var dist embed.FS

func main() {
	// Create.
	server := f.ServerCreate()
	notifier := f.NotifierCreate()

	// Setup.
	f.ServerWithPort(server, 8080)
	f.ServerWithHostName(server, "127.0.0.1")
	f.ServerWithEmbeddedFileSystem(server, dist)
	f.ServerWithNotifier(server, notifier)

	// Api.
	f.ServerWithApiBuilder(server, build)

	// Start.
	f.ServerStart(server)
}

func build(context f.ApiContext) {
	// Build api.
    withPattern, withHandler := context()
    withPattern("GET /")
    withHandler(handle)
}

func handle(request *f.Request, response *f.Response) {
    // Handle request.
}
```

Where `withPattern()` routes the api using a pattern and `withHandler()` sets the request handler.

!!! note
    You can route the same api to multiple patterns
    ```go
    withPattern("GET /")
    withPattern("GET /api/greeting")
    withHandler(handle)
    ```


## Echo

You can send out text with `f.ResponseSendMessage()`

```go
func handle(request *f.Request, response *f.Response) {
    f.ResponseSendMessage(response, "hello")
}
```

## Path

You can define path fields in your pattern using the curly 
braces format `{}` and retrieve fields with `f.RequestReceivePath()`.

```go
func handle(request *f.Request, response *f.Response) {
    name := f.RequestReceivePath(request, "name")
    f.ResponseSendMessage(response, "hello "+name)
}
```

## Status

You can send out a status code with `f.ResponseSendStatus()`

```go
func handle(request *f.Request, response *f.Response) {
    f.ResponseSendStatus(response, 404)
    f.ResponseSendMessage(response, "Resource not found, sorry.")
}
```

!!! note
    Status codes must be sent out before sending any header fields.

## Header

You can retrieve header fields with `f.RequestReceiveHeader()` and send out header fields with `f.ResponseSendHeader()`.

```go
func handle(request *f.Request, response *f.Response) {
    contentType := f.RequestReceiveHeader(request, "Content-Type")
    if "application/xml" != contentType {
        f.ResponseSendStatus(response, 400)
        f.ResponseSendHeader(response, "Content-Length", "69")
        f.ResponseSendMessage(response, "We don't serve your kind around here, better get an XML encoder, heh.")
        return
    }

    f.ResponseSendStatus(response, 404)
    f.ResponseSendHeader(response, "Content-Length", "26")
    f.ResponseSendMessage(response, "Resource not found, sorry.")
}
```

!!! note
    Header fields must be sent out before sending a body.

## Query

You can retrieve values of query fields with `f.RequestReceiveQuery()`

```go
func handle(request *f.Request, response *f.Response) {
    name := f.RequestReceiveQuery(request, "name")
    f.ResponseSendMessage(response, "hello "+name)
}
```

## Forms

Forms can be retrieved with `f.RequestReceiveForm()`.

You can use the `url.Values` api in order to retrieve specific form fields.

```go
func handle(request *f.Request, response *f.Response) {
    form := f.RequestReceiveForm(request)
    name := form.Get("name")
    f.ResponseSendMessage(response, "hello "+name)
}
```

!!! note
    Forms must be passed through the body of the request, so verbs without body, like `GET` and `DELETE`, will fail to read the form.

## Json

Json bodies can be read and decoded with `f.RequestReceiveJson[T]()`.

```go
func handle(request *f.Request, response *f.Response) {
    person, _ := f.RequestReceiveJson[Person](request)
    f.ResponseSendMessage(response, "hello "+person.name)
}
```

Where `Person` would be a struct

```go
type Person struct {
    Name string
}
```

## Conventions

Api functions should be created under `lib/api/{name}.go`, where `{name}` is the name of the api.