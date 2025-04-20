You can route apis with `f.ServerWithApi()`

```go
f.ServerWithApi(srv, api)
```

Where `api` is a setup function

```go
func api(
	withPattern func(pattern string),
	withHandler func(handler func(req *f.Request, res *f.Response)),
) {
    withPattern("GET /")
    withHandler(handler)
}

func handler(req *f.Request, res *f.Response) {
    // Handle request.
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
func handler(req*f.Request, res *f.Response) {
    f.SendEcho(res, "hello")
}
```

## Path

You can define path fields in your pattern using the curly braces format `{}`.

```go
withPattern("GET /{name}")
```

You can then retrieve the value of the path field with `f.ReceivePath()`

```go
func handler(req *f.Request, _ *f.Response) {
    name := f.ReceivePath(req, "name")
    f.SendEcho(res, "hello "+name)
}
```

## Status

You can send out a status code with `f.SendStatus()`

```go
func handler(_ *f.Request, res *f.Response) {
    f.SendStatus(res, 404)
    f.SendEcho(res, "Resource not found, sorry.")
}
```

!!! note
    Status codes must be sent out before sending any header fields.

## Header

You can retrieve header fields with `f.ReceiveHeader()` and send out header fields with `f.SendHeader()`.

```go
func handler(req *f.Request, res *f.Response) {
    contentType := f.ReceiveHeader(req, "Content-Type")
    if "application/xml" != contentType {
        f.SendStatus(res, 400)
        f.SendHeader(res, "Content-Length", "69")
        f.SendEcho(res, "We don't serve your kind around here, better get an XML encoder, heh.")
        return
    }

    f.SendStatus(res, 404)
    f.SendHeader(res, "Content-Length", "26")
    f.SendEcho(res, "Resource not found, sorry.")
}
```

!!! note
    Header fields must be sent out before sending a body.

## Query

You can retrieve values of query fields with `f.ReceiveQuery()`

```go
func handler(req *f.Request, res *f.Response) {
    name := f.ReceiveQuery(req, "name")
    f.SendEcho(res, "hello "+name)
}
```

## Forms

Forms can be retrieved with `f.ReceiveForm()`.

You can use the `url.Values` api in order to retrieve specific form fields.

```go
func handler(req *f.Request, res *f.Response) {
    form := f.ReceiveForm(req)
    name := form.Get("name")
    f.SendEcho(res, "hello "+name)
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

func handler(req *f.Request, res *f.Response) {
    person, _ := f.ReceiveJson[Person](req)
    f.SendEcho(res, "hello "+person.name)
}
```