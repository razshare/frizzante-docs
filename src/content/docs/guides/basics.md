---
title: Basics
---

Before doing anything you need to start a server.

Create a new server with `server.New()`, then followup with `server.Start()` in order to start a server.

```go
//main.go
package main

import "github.com/razshare/frizzante/server"

var srv = server.New()      // Creates server.

func main() {
    defer server.Start(srv) // Starts server.
}
```

## Routes

Each server exposes a slice of **Routes** which you can freely modify.

You can add a new route by appending to or overwriting `srv.Routes`.

```go
//main.go
package main

import (
    "github.com/razshare/frizzante/server"
    "main/lib/routes/handlers/welcome"
)

var srv = server.New()                            // Creates server.

func main() {
    defer server.Start(srv)                       // Starts server.
    srv.Routes = []route.Route{                   // Overwrites routes.
       {Pattern: "GET /", Handler: welcome.View}, // Adds route.
    }
}
```

Where `welcome.View` is a function pointer.

```go
//lib/routes/handlers/welcome/view.go
package handlers

import "github.com/razshare/frizzante/client"

func View(c *client.Client) {
    // [...]
}
```

## Route Patterns

Route patterns can define dynamic **path fields** using `{}` syntax.

```go
route.Route{Pattern: "GET /{name}", Handler: welcome.View}
```

Path fields can then be retrieved with `receive.Path()`.

```go
//lib/routes/handlers/welcome/view.go
package handlers

import (
    "github.com/razshare/frizzante/client"
    "github.com/razshare/frizzante/receive"
)


func View(c *client.Client) {
    _ = receive.Path(c, "name") // Retrieves field "name".
}
```

## Messages

Use `receive.Message()` to retrieve messages sent by the client.


```go
//lib/routes/handlers/welcome/view.go
package handlers

import (
    "github.com/razshare/frizzante/client"
    "github.com/razshare/frizzante/receive"
)

func View(c *client.Client) {
    _ = receive.Message(c) // Retrieves message.
}
```

Use `send.Message()` to send a message to the client.


```go
//lib/routes/handlers/welcome/view.go
package handlers

import (
    "github.com/razshare/frizzante/client"
    "github.com/razshare/frizzante/send"
)

func View(c *client.Client) {
    send.Message(c, "Hello.") // Sends message.
}
```

## Headers

Use `receive.Header()` to retrieve header fields sent by the client.

```go
//lib/routes/handlers/welcome/view.go
package handlers

import (
    "github.com/razshare/frizzante/client"
    "github.com/razshare/frizzante/receive"
)

func View(c *client.Client) {
    _ = receive.Header(c, "Accept") // Retrieves field "Accept".
}
```

Use `send.Header()` to send header fields to the client.

```go
//lib/routes/handlers/welcome/view.go
package handlers

import (
    "github.com/razshare/frizzante/client"
    "github.com/razshare/frizzante/receive"
    "github.com/razshare/frizzante/send"
)

func View(c *client.Client) {
    a := receive.Header(c, "Accept")  // Retrieves field "Accept".
    send.Header(c, "Content-Type", a) // Sends it back.
}
```

## Status

Use `send.Status()` to send the status of the response to the client.

```go
//lib/routes/handlers/welcome/view.go
package handlers

import (
    "github.com/razshare/frizzante/client"
    "github.com/razshare/frizzante/send"
)

func View(c *client.Client) {
    send.Status(c, 404)           // Sends status 404.
    send.Message(c, "Not found.") // Sends message..
}
```

:::caution
**Sending** header fields or status **after** sending out content is not allowed.
Read [below](#order-of-operations).
:::

## Order of Operations

Order of operations matters when sending data to the client.

:::caution
**Status codes** and **headers** cannot be modified after sending out content.
:::

For example, sending the status code with `send.Status()` **after** you've already sent content
with `send.Message()` is not allowed.

```go
//lib/routes/handlers/welcome/view.go
package handlers

import (
    "github.com/razshare/frizzante/client"
    "github.com/razshare/frizzante/send"
)

func View(c *client.Client) {
    send.Message(c, "Hello.") // Sends message. (Succeeds).
    send.Status(c, 404)       // Sends status (Fails).
}
```

`send.Status(404)` will fail and the client will receive status `200` instead of `404`.

```http
HTTP/1.1 200 OK
Date: Sun, 25 May 2025 02:00:37 GMT
Content-Length: 6
Content-Type: text/plain; charset=utf-8

Hello.
```

The failure is notified to the server notifier.

Assuming you're using the default notifier, you'll see an error of sorts in your **console**

```sh
listening for requests at http://127.0.0.1:8080
status is locked
```

`status is locked`, meaning the status code has already been sent to the client and there's nothing you can do about it.

## Query Fields

Use `receive.Query()` to retrieve query fields.

```go
//lib/routes/handlers/welcome/view.go
package handlers

import (
    "github.com/razshare/frizzante/client"
    "github.com/razshare/frizzante/receive"
    "github.com/razshare/frizzante/send"
)

func View(c *client.Client) {
    n := receive.Query(c, "name") // Retrieves field "name".
    send.Message(c, "Hello " + n) // Sends message..
}
```

## Forms

Use `receive.Form()` to retrieve and parse forms when using `POST` and `PUT` http verbs.


```go
route.Route{Pattern: "POST /", Handler: welcome.View}
// or
route.Route{Pattern: "PUT /", Handler: welcome.View}
```

```go
//lib/routes/handlers/welcome/view.go
package handlers

import (
    "github.com/razshare/frizzante/client"
    "github.com/razshare/frizzante/receive"
    "github.com/razshare/frizzante/send"
)

func View(c *client.Client) {
    f := receive.Form(c)          // Retrieves the form.
    n := f.Get("name")            // Retrieves field "name".
    send.Message(c, "Hello " + n) // Sends message..
}
```


## Json

Use `receive.Json()` to parse incoming content as json when using `POST` and `PUT` http verbs.


```go
route.Route{Pattern: "POST /", Handler: welcome.View}
// or
route.Route{Pattern: "PUT /", Handler: welcome.View}
```

```go
//lib/routes/handlers/welcome/view.go
package handlers

import (
    "github.com/razshare/frizzante/client"
    "github.com/razshare/frizzante/receive"
    "github.com/razshare/frizzante/send"
)

type GreetingDetails struct {             // Defines a struct in which to 
    Name string `json:"name"`             // store the json content.
}

func View(c *client.Client) {
    v := receive.Json[GreetingDetails](c) // Marshals the content and returns it.
    send.Json(c, v)                       // Sends it back.
}
```

## Cookies

Use `receive.Cookie()` to retrieve cookies and `send.Cookie()` to send them.

```go
//lib/routes/handlers/welcome/view.go
package handlers

import (
    "github.com/razshare/frizzante/client"
    "github.com/razshare/frizzante/receive"
    "github.com/razshare/frizzante/send"
)

func View(c *client.Client) {
    n := receive.Cookie(c, "nickname") // Retrieves cookie.
    send.Cookie(c, "nickname", n)      // Sends it back.
}
```

## Session Id

Use `receive.SessionId()` to retrieve the client's session id.

:::note
The session id is retrieved from the client's `session-id` cookie.\
If the client doesn't provide such cookie, `receive.SessionId()`
creates a new session id and sends the cookie to the client.
:::


```go
//lib/routes/handlers/welcome/view.go
package handlers

import (
    "github.com/razshare/frizzante/client"
    "github.com/razshare/frizzante/receive"
)

func View(c *client.Client) {
    _ = receive.SessionId(c) // Retrieves session id.
}
```

## Redirect

Use `send.Redirect()` to redirect to a different location.

```go
//lib/routes/handlers/welcome/view.go
package handlers

import (
    "github.com/razshare/frizzante/client"
    "github.com/razshare/frizzante/send"
)

func View(c *client.Client) {
    send.Redirect(c, "/login", 307) // Redirects to /login.
}
```

## Navigate

Use `send.Navigate()` to redirect to a different location with status `303`.

```go
//lib/routes/handlers/welcome/view.go
package handlers

import (
    "github.com/razshare/frizzante/client"
    "github.com/razshare/frizzante/send"
)

func View(c *client.Client) {
    send.Navigate(c, "/login") // Redirects to /login with status 303.
}
```