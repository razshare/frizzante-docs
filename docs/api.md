You can route apis with `f.ServerWithApi()`

```go
f.ServerWithApi(srv, api)
```

Where `api` is a setup function.

```go
func run(_ *f.Request, res *f.Response) {
    f.SendEcho(res, "hello")
}

func api(
	route f.RouteApiFunction,
	serve f.ServeApiFunction,
) {
    route("GET /")
    serve(run)
}
```

The `route` function is used for routing the api through a pattern `{verb} /path`, where `{verb}` is an http verb, like `GET`, `POST` and so on.

The `serve` function is used to respond to incoming requests.

!!! note
   You can route the same api through multiple patterns, for example
   
   ```go
   func api(
       route f.RouteApiFunction,
       serve f.ServeApiFunction,
   ) {
       route("GET /")
       route("POST /")
       route("GET /api")
       route("POST /api")
       serve(run)
   }
   ```

The above example listens for requests at `GET /` and responds with `hello` as `text/plain`.

## Status

You can send out a status code with `f.SendStatus()`

```go
func serverFunction(_ *f.Request, res *f.Response) {
    f.SendStatus(res, 404)
    f.SendEcho(res, "Resource not found, sorry.")
}
```

!!! note
    Status codes must be sent out before sending any header fields.

## Header fields

You can retrieve header fields with `f.ReceiveHeader()` and send out header fields with `f.SendHeader()`.

```go
func serverFunction(req *f.Request, res *f.Response) {
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

## Path fields

You can define path fields via the `{parameter}` syntax, the name of the parameter wrapped in curly braces.

You can then retrieve the value of the path field with `f.ReceivePath()`

```go
func serverFunction(req *f.Request, res *f.Response) {
    name := f.ReceivePath(req, "name")
    f.SendEcho(res, "hello ")
    f.SendEcho(res, name)
}
```

## Query

You can retrieve values of query fields with `f.ReceiveQuery()`

```go
func serverFunction(req *f.Request, res *f.Response) {
    name := f.ReceiveQuery(req, "name")
    f.SendEcho(res, "hello ")
    f.SendEcho(res, name)
}
```

## Forms

Forms can be retrieved with `f.ReceiveForm()`.

You can use the `url.Values` api in order to retrieve specific form fields.

```go
func serverFunction(req *f.Request, res *f.Response) {
    form := f.ReceiveForm(req)
    name := form.Get("name")
    f.SendEcho(res, "hello ")
    f.SendEcho(res, name)
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

func run(req *f.Request, res *f.Response) {
    person, _ := f.ReceiveJson[Person](req)
    f.SendEcho(res, "hello ")
    f.SendEcho(res, person.Name)
}
```