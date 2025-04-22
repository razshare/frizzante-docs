You can create apis with `f.ServerWithApi()`

```go
f.ServerWithApi(srv, api)
```

Where `api` is a setup function

```go
package main

import (
	"embed"
	f "github.com/razshare/frizzante"
)

//go:embed .dist/*/**
var dist embed.FS

func api(
	withPattern func(pattern string),
	withHandler func(handler func(
        request *f.Request,
        response *f.Response,
    )),
) {
    withPattern("GET /")
    withHandler(func(
        request *f.Request,
        response *f.Response,
    ) {
        // Handle request.
    })
}

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
	f.ServerWithApi(server, api)

	// Start.
	f.ServerStart(server)
}
```

Use `withPattern()` to route the api using a pattern.

Use `withHandler()` to set the request handler.

!!! note
    You can route the same api to multiple patterns
    ```go
    withPattern("GET /")
    withPattern("GET /api/greeting")
    withHandler(handler)
    ```


## Echo

You can send out text with `f.SendEcho()`

```go
func api(
	withPattern func(pattern string),
	withHandler func(handler func(
        request *f.Request,
        response *f.Response,
    )),
) {
    withPattern("GET /")
    withHandler(func(
        request *f.Request,
        response *f.Response,
    ) {
        f.SendEcho(response, "hello")
    })
}
```

## Path

You can define path fields in your pattern using the curly 
braces format `{}` and retrieve fields with `f.ReceivePath()`.

```go
func api(
	withPattern func(pattern string),
	withHandler func(handler func(
        request *f.Request,
        response *f.Response,
    )),
) {
    withPattern("GET /{name}")
    withHandler(func(
        request *f.Request,
        response *f.Response,
    ) {
        name := f.ReceivePath(request, "name")
        f.SendEcho(response, "hello "+name)
    })
}
```

## Status

You can send out a status code with `f.SendStatus()`

```go
func api(
	withPattern func(pattern string),
	withHandler func(handler func(
        request *f.Request,
        response *f.Response,
    )),
) {
    withPattern("GET /")
    withHandler(func(
        request *f.Request,
        response *f.Response,
    ) {
        f.SendStatus(response, 404)
        f.SendEcho(response, "Resource not found, sorry.")
    })
}
```

!!! note
    Status codes must be sent out before sending any header fields.

## Header

You can retrieve header fields with `f.ReceiveHeader()` and send out header fields with `f.SendHeader()`.

```go
func api(
	withPattern func(pattern string),
	withHandler func(handler func(
        request *f.Request,
        response *f.Response,
    )),
) {
    withPattern("GET /")
    withHandler(func(
        request *f.Request,
        response *f.Response,
    ) {
        contentType := f.ReceiveHeader(request, "Content-Type")
        if "application/xml" != contentType {
            f.SendStatus(response, 400)
            f.SendHeader(response, "Content-Length", "69")
            f.SendEcho(response, "We don't serve your kind around here, better get an XML encoder, heh.")
            return
        }

        f.SendStatus(response, 404)
        f.SendHeader(response, "Content-Length", "26")
        f.SendEcho(response, "Resource not found, sorry.")
    })
}
```

!!! note
    Header fields must be sent out before sending a body.

## Query

You can retrieve values of query fields with `f.ReceiveQuery()`

```go
func api(
	withPattern func(pattern string),
	withHandler func(handler func(
        request *f.Request,
        response *f.Response,
    )),
) {
    withPattern("GET /")
    withHandler(func(
        request *f.Request,
        response *f.Response,
    ) {
        name := f.ReceiveQuery(request, "name")
        f.SendEcho(response, "hello "+name)
    })
}
```

## Forms

Forms can be retrieved with `f.ReceiveForm()`.

You can use the `url.Values` api in order to retrieve specific form fields.

```go
func api(
	withPattern func(pattern string),
	withHandler func(handler func(
        request *f.Request,
        response *f.Response,
    )),
) {
    withPattern("GET /")
    withHandler(func(
        request *f.Request,
        response *f.Response,
    ) {
        form := f.ReceiveForm(request)
        name := form.Get("name")
        f.SendEcho(response, "hello "+name)
    })
}
```

!!! note
    Forms must be passed through the body of the request, so verbs without body, like `GET` and `DELETE`, will fail to read the form.

## Json

Json bodies can be read and decoded with `f.ReceiveJson[T]()`.

```go
type Person struct {
    Name string
}

func api(
	withPattern func(pattern string),
	withHandler func(handler func(
        request *f.Request,
        response *f.Response,
    )),
) {
    withPattern("GET /")
    withHandler(func(
        request *f.Request,
        response *f.Response,
    ) {
        person, _ := f.ReceiveJson[Person](request)
        f.SendEcho(response, "hello "+person.name)
    })
}
```

## Other details

Apis should be created under `lib/api/{name}.go`, where `{name}` is the name of the api.