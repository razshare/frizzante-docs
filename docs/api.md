Use `server.OnRequest()` to handle incoming requests.

`main.go`
```go
package main

import f "github.com/razshare/frizzante"

//go:embed .dist/*/**
var dist embed.FS

func main() {
	f.NewServer(dist).
        OnRequest("GET /api", func(req *f.Request, res *f.Response){
			// Handle request.
		}).
		Start()
}
```

Use `server.WithApiController()` to handle requests in a more opinionated way, using a controller

`main.go`
```go
package main

import (
	f "github.com/razshare/frizzante"
	"main/lib/api/hello"
)


//go:embed .dist/*/**
var dist embed.FS

func main() {
	f.NewServer(dist).
        WithApiController(hello.Controller).
        Start()
}
```

where `hello.Controller` is defined as

`lib/api/hello/controller.go`
```go
package hello

import f "github.com/razshare/frizzante"

var Api = f.
	NewApiController().
	WithPath("/api/hello").
	WithHandler("GET", get)

func get(req *f.Request, res *f.Response) {
	// Handle request.
}
```

`req` provides receivers, which are functions that read data from the client,
while `res` providers senders, functions that send data to the client.

#### Available functions

| Usage example | Description |
|-------|-------------|
`req.ReceiveCancellation()` | <br/>Returns a channel that closes when the request gets cancelled. |
`req.IsAlive()` | Returns a reference to a bool which is initially set to `true`.<br/>This bool updates to `false` when the request gets cancelled. |
`req.ReceiveCookie("my-cookie")` | Returns a cookie from the request. |
`req.ReceiveMessage()` | Returns a message from the client. This function adapts to the protocol.<br/>In HTTP and SSE it reads the content of the body, in WS it waits for 1 message from the client. |
`req.ReceiveMessage()` | Returns a message as json from the client. This function adapts to the protocol. In HTTP and SSE it reads the content of the body, in WS it waits for 1 message from the client. | |
`req.ReceiveForm` | Returns the body of the request as a form handler. In WS mode this function will return an empty form and fail silently. |
`req.ReceiveQuery("query-key")` | Returns a query field from the request. |
`req.ReceivePath("parameter-name")` | Returns a path parameter from the request. |
`req.ReceiveHeader("header-key")` | Returns a header field from the request. |
`req.ReceiveContentType()` | Returns the `Content-Type` header from the request. |
`req.VerifyContentType("key1", "key2", "key3")` | Returns `true` if the content type of the request is among any of the provided keys. |
