You can listen for requests with `frz.ServerWithRoute()`.

```go
frz.ServerWithRoute(server, "GET /",
    func(_ *frz.Server, _ *frz.Request, res *frz.Response) {
        frz.SendEcho(res, "hello")
    },
)
```

The above example listens for requests at `GET /` and responds with `hello` as `text/plain`.

## Status

You can send out a status code with `frz.SendStatus()`

```go
frz.ServerWithRoute(server, "GET /",
    func(_ *frz.Server, _ *frz.Request, res *frz.Response) {
        frz.SendStatus(res, 404)
        frz.SendEcho(res, "Resource not found, sorry.")
    },
)
```

!!! note
    Status codes must be sent out before sending any header fields.

## Header fields

You can retrieve header fields with `frz.ReceiveHeader()` and send out header fields with `frz.SendHeader()`.

```go
frz.ServerWithRoute(server, "GET /",
    func(_ *frz.Server, req *frz.Request, res *frz.Response) {
        contentType := frz.ReceiveHeader(req, "Content-Type")
        if "application/xml" != contentType {
            frz.SendStatus(res, 400)
            frz.SendHeader(res, "Content-Length", "69")
            frz.SendEcho(res, "We don't serve your kind around here, better get an XML encoder, heh.")
            return
        }

        frz.SendStatus(res, 404)
        frz.SendHeader(res, "Content-Length", "26")
        frz.SendEcho(res, "Resource not found, sorry.")
    },
)
```

!!! note
    Header fields must be sent out before sending a body.

## Path fields

You can define path fields via the `{parameter}` syntax, the name of the parameter wrapped in curly braces.

You can then retrieve the value of the path field with `frz.ReceivePath()`

```go
frz.ServerWithRoute(server, "GET /about/{name}",
    func(_ *frz.Server, req *frz.Request, res *frz.Response) {
        name := frz.ReceivePath(req, "name")
        frz.SendEcho(res, "hello ")
        frz.SendEcho(res, name)
    },
)
```

## Query

You can retrieve values of query fields with `frz.ReceiveQuery()`

```go
frz.ServerWithRoute(server, "GET /about",
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
frz.ServerWithRoute(server, "POST /about",
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

frz.ServerWithRoute(server, "POST /about",
    func(server *frz.Server, request *frz.Request, response *frz.Response) {
        person := &Person{}
        form := frz.ReceiveJson(request, person)
        frz.SendEcho(response, "hello ")
        frz.SendEcho(response, person.Name)
    },
)
```