You can route apis with `frz.ServerWithApi()`

```go
frz.ServerWithApi(srv, "GET /",
    func(_ *frz.Request, res *frz.Response) {
        frz.SendEcho(res, "hello")
    },
)
```

The above example listens for requests at `GET /` and responds with `hello` as `text/plain`.

## Status

You can send out a status code with `frz.SendStatus()`

```go
frz.ServerWithApi(srv, "GET /",
    func(_ *frz.Request, res *frz.Response) {
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
frz.ServerWithApi(srv, "GET /",
    func(req *frz.Request, res *frz.Response) {
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
frz.ServerWithApi(srv, "GET /about/{name}",
    func(req *frz.Request, res *frz.Response) {
        name := frz.ReceivePath(req, "name")
        frz.SendEcho(res, "hello ")
        frz.SendEcho(res, name)
    },
)
```

## Query

You can retrieve values of query fields with `frz.ReceiveQuery()`

```go
frz.ServerWithApi(srv, "GET /about",
    func(req *frz.Request, res *frz.Response) {
        name := frz.ReceiveQuery(req, "name")
        frz.SendEcho(res, "hello ")
        frz.SendEcho(res, name)
    },
)
```

## Forms

Forms can be retrieved with `frz.ReceiveForm()`.

You can use the `url.Values` api in order to retrieve specific form fields.

```go
frz.ServerWithApi(srv, "POST /about",
    func(req *frz.Request, res *frz.Response) {
        form := frz.ReceiveForm(req)
        name := form.Get("name")
        frz.SendEcho(res, "hello ")
        frz.SendEcho(res, name)
    },
)
```

!!! note
    Forms must be passed through the body of the request, so verbs without body, like `GET` and `DELETE`, will fail to read the form.

## Json

Json bodies can be read and decoded with `frz.ReceiveJson[T]()`.

```go
type Person struct {
	Name string
}

frz.ServerWithApi(srv, "POST /about",
    func(req *frz.Request, res *frz.Response) {
        person, _ := frz.ReceiveJson[Person](req)
        frz.SendEcho(res, "hello ")
        frz.SendEcho(res, person.Name)
    },
)
```