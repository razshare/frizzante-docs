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

This code will listen for requests on `GET /` and send the `hello` in response.

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

!!! danger
    Status codes must be sent out before sending any header fields.<br/>
    Failing to do so will result in s server error.

## Headers

You can retrieve header fields with `frz.ReceiveHeader()` and send out header fields wit `frz.SendHeader()`.

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

!!! danger
    Header fields must be sent out before sending a body.<br/>
    Failing to do so will result in s server error.

## Parameters

You can define parameters in your path via the `{parameter}` syntax, the name of the parameter wrapped in curly braces.

You can then retrieve the value of the parameter with `frz.ReceiveParameter()`

```go
frz.ServerWithRequestHandler(
    server,
    "GET /about/{name}", 
    func(server *frz.Server, request *frz.Request, response *frz.Response) {
        name := frz.ReceiveParameter(request, "name")
        frz.SendEcho(response, "hello ")
        frz.SendEcho(response, name)
    },
)
```

## Query

Similarly, you can retrieve values of query fields with `frz.ReceiveQuery()`

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
    Forms must be passed through the body of the request, so verbs without body, like `GET` and `DELETE`, will fail reading the form.

## Json

Json bodies can be easily read and decoded with `frz.ReceiveJson()`.

This method is a bit different that the others because it doesn't return a value,
instead it takes in an objects and projects the contents of the json onto said object.

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