You can listen for requests with `frz.ServerWithRequestHandler()`.

```go
frz.ServerWithRequestHandler(
    server,
    "GET /", 
    func(server *frz.Server, request *frz.Request, response *frz.Response) {
        frz.SendEcho(response, "hello")
    },
)
```

The above example listens for requests at `GET /` and responds with `hello` as `text/plain`.

## Status

You can send out a status code with `frz.SendStatus()`

```go
frz.ServerWithRequestHandler(
    server,
    "GET /", 
    func(server *frz.Server, request *frz.Request, response *frz.Response) {
        frz.SendStatus(response, 404)
        frz.SendEcho(response, "Resource not found, sorry.")
    },
)
```

!!! note
    Status codes must be sent out before sending any header fields.

## Header fields

You can retrieve header fields with `frz.ReceiveHeader()` and send out header fields with `frz.SendHeader()`.

```go
frz.ServerWithRequestHandler(
    server,
    "GET /", 
    func(server *frz.Server, request *frz.Request, response *frz.Response) {
        contentType := frz.ReceiveHeader(request, "Content-Type")
        if "application/xml" != contentType {
            frz.SendStatus(response, 400)
            frz.SendHeader(response, "Content-Length", "69")
            frz.SendEcho(response, "We don't serve your kind around here, better get an XML encoder, heh.")
            return
        }

        frz.SendStatus(response, 404)
        frz.SendHeader(response, "Content-Length", "26")
        frz.SendEcho(response, "Resource not found, sorry.")
    },
)
```

!!! note
    Header fields must be sent out before sending a body.

## Path fields

You can define path fields via the `{parameter}` syntax, the name of the parameter wrapped in curly braces.

You can then retrieve the value of the path field with `frz.ReceivePath()`

```go
frz.ServerWithRequestHandler(
    server,
    "GET /about/{name}", 
    func(server *frz.Server, request *frz.Request, response *frz.Response) {
        name := frz.ReceivePath(request, "name")
        frz.SendEcho(response, "hello ")
        frz.SendEcho(response, name)
    },
)
```

## Query

You can retrieve values of query fields with `frz.ReceiveQuery()`

```go
frz.ServerWithRequestHandler(
    server,
    "GET /about", 
    func(server *frz.Server, request *frz.Request, response *frz.Response) {
        name := frz.ReceiveQuery(request, "name")
        frz.SendEcho(response, "hello ")
        frz.SendEcho(response, name)
    },
)
```

## Forms

Forms can be retrieved with `frz.ReceiveForm()`.

You can use the `url.Values` api in order to retrieve specific form fields.

```go
frz.ServerWithRequestHandler(
    server,
    "POST /about", 
    func(server *frz.Server, request *frz.Request, response *frz.Response) {
        form := frz.ReceiveForm(request)
        name := form.Get("name")
        frz.SendEcho(response, "hello ")
        frz.SendEcho(response, name)
    },
)
```

!!! note
    Forms must be passed through the body of the request, so verbs without body, like `GET` and `DELETE`, will fail to read the form.

## Json

Json bodies can be read and decoded with `frz.ReceiveJson()`.

This function is a bit different that the others because it doesn't return a value,
instead it takes in an object and projects the contents of the json onto said object.

```go
type Person struct {
	Name string `json:"name"`
}

frz.ServerWithRequestHandler(
    server,
    "POST /about", 
    func(server *frz.Server, request *frz.Request, response *frz.Response) {
        person := &Person{}
        form := frz.ReceiveJson(request, person)
        frz.SendEcho(response, "hello ")
        frz.SendEcho(response, person.Name)
    },
)
```