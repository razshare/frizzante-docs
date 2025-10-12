---
title: Basics
---

Before doing anything you need to start a server.

Create a new server with `servers.New()`, then followup with `servers.Start()` in order to start a server.

```go
//main.go
package main

import "main/lib/core/servers"

var server = servers.New()      // Creates server.

func main() {
    defer servers.Start(server) // Starts server.
}
```

## Routes

Each server exposes a slice of **Routes** which you can freely modify.

You can add a new route by appending to or overwriting `server.Routes`.

```go
//main.go
package main

import (
    "main/lib/core/servers"
    "main/lib/routes/welcome"
)

var server = servers.New()                        // Creates server.

func main() {
    defer servers.Start(server)                   // Starts server.
    server.Routes = []routes.Route{               // Overwrites routes.
       {Pattern: "GET /", Handler: welcome.View}, // Adds route.
    }
}
```

Where `welcome.View` is a function pointer.

```go
//lib/routes/welcome/view.go
package welcome

import "main/lib/core/clients"

func View(client *clients.Client) {}
```

## Path Fields

Route patterns can define dynamic **path fields** using `{}` syntax.

```go
routes.Route{Pattern: "GET /{name}", Handler: welcome.View}
```

Path fields can then be retrieved with `receive.Path()`.

```go
//lib/routes/welcome/view.go
package welcome

import (
    "main/lib/core/clients"
    "main/lib/core/receive"
)

func View(client *clients.Client) {
    _ = receive.Path(client, "name") // Retrieves field "name".
}
```

## Messages

Use `receive.Message()` to retrieve messages sent by the client.


```go
//lib/routes/welcome/view.go
package welcome

import (
    "main/lib/core/clients"
    "main/lib/core/receive"
)

func View(client *clients.Client) {
    _ = receive.Message(client) // Retrieves message.
}
```

Use `send.Message()` to send a message to the client.


```go
//lib/routes/welcome/view.go
package welcome

import (
    "main/lib/core/clients"
    "main/lib/core/send"
)

func View(client *clients.Client) {
    send.Message(client, "Hello.") // Sends message.
}
```

## Headers

Use `receive.Header()` to retrieve header fields sent by the client.

```go
//lib/routes/welcome/view.go
package welcome

import (
    "main/lib/core/clients"
    "main/lib/core/receive"
)

func View(client *clients.Client) {
    _ = receive.Header(client, "Accept") // Retrieves field "Accept".
}
```

Use `send.Header()` to send header fields to the client.

```go
//lib/routes/welcome/view.go
package welcome

import (
    "main/lib/core/clients"
    "main/lib/core/receive"
    "main/lib/core/send"
)

func View(client *clients.Client) {
    accept := receive.Header(client, "Accept")  // Retrieves field "Accept".
    send.Header(client, "Content-Type", accept) // Sends it back.
}
```

## Status

Use `send.Status()` to send the status of the response to the client.

```go
//lib/routes/welcome/view.go
package welcome

import (
    "main/lib/core/clients"
    "main/lib/core/send"
)

func View(client *clients.Client) {
    send.Status(client, 404)           // Sends status 404.
    send.Message(client, "Not found.") // Sends message.
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
//lib/routes/welcome/view.go
package welcome

import (
    "main/lib/core/clients"
    "main/lib/core/send"
)

func View(client *clients.Client) {
    send.Message(client, "Hello.") // Sends message. (Succeeds).
    send.Status(client, 404)       // Sends status (Fails).
}
```

`send.Status(client, 404)` will fail and the client will receive status `200` instead of `404`.

```http
HTTP/1.1 200 OK
Date: Sun, 25 May 2025 02:00:37 GMT
Content-Length: 6
Content-Type: text/plain; charset=utf-8

Hello.
```

The failure is logged to the server's error logger.

Assuming you're using the default error logger, you'll see an error of sorts in your **console**

```sh
listening for requests at http://127.0.0.1:8080
status is locked
```

`status is locked`, meaning the status code has already been sent to the client and there's nothing you can do about it.

## Queries

Use `receive.Query()` to retrieve query fields.

```go
//lib/routes/welcome/view.go
package welcome

import (
    "main/lib/core/clients"
    "main/lib/core/receive"
    "main/lib/core/send"
)

func View(client *clients.Client) {
    name := receive.Query(client, "name") // Retrieves field "name".
    send.Message(client, "Hello " + name) // Sends message.
}
```

## Forms

Use `receive.Form()` to parse incoming content as multipart form or url encoded form when using `POST` and `GET` http verbs.


```go
routes.Route{Pattern: "POST /", Handler: welcome.View}
// or
routes.Route{Pattern: "GET /", Handler: welcome.View}
```

```go
//lib/routes/welcome/action.go
package welcome

import (
    "main/lib/core/clients"
    "main/lib/core/receive"
    "main/lib/core/send"
)

type Form struct {
    Name string `form:"name"`
}

func View(client *clients.Client) {
    var form Form
    receive.Form(client, &form)                 // Retrieves form.
    send.Message(client, "Hello " + form.Name) // Sends message.
}
```

:::tip
Form structs can define slices and files.
```go
type Form struct {
    Name     string               `form:"name"`
    Comments []string             `form:"comments"` // <== slice of strings
    File     multipart.FileHeader `form:"file"`     // <== file handler
}
```

The file acts as an reader, so you can open and read it.

```go
file, err := form.File.Open()
if err != nil {
    client.Config.ErrorLog.Println(err, stack.Trace())
}
```

Remember to close the file.

```go
defer file.Close()
```
:::

## Json

Use `receive.Json()` to parse incoming content as json when using `POST` and `PUT` http verbs and `send.Json()` to send json content.


```go
routes.Route{Pattern: "POST /", Handler: welcome.View}
// or
routes.Route{Pattern: "PUT /", Handler: welcome.View}
```

```go
//lib/routes/welcome/view.go
package welcome

import (
    "main/lib/core/clients"
    "main/lib/core/receive"
    "main/lib/core/send"
)

type GreetingDetails struct {      // Defines a struct in which to 
    Name string `json:"name"`      // store the json content.
}

func View(client *clients.Client) {
    var details GreetingDetails    // Creates a zero value.
    receive.Json(client, &details) // Unmarshals the content into details.
    send.Json(client, details)     // Sends content back as json.
}
```

## Cookies

Use `receive.Cookie()` to retrieve cookies and `send.Cookie()` to send them.

```go
//lib/routes/welcome/view.go
package welcome

import (
    "main/lib/core/clients"
    "main/lib/core/receive"
    "main/lib/core/send"
)

func View(client *clients.Client) {
    nickname := receive.Cookie(client, "nickname") // Retrieves cookie.
    send.Cookie(client, "nickname", nickname)      // Sends it back.
}
```

## Session Id

Use `receive.SessionId()` to retrieve the client's session id.

:::note
The session id is retrieved from the client's `session-id` cookie.\
If the client doesn't provide such cookie, `receive.SessionId()`
creates a new session id and sends the cookie to the client.
:::

:::caution
Since `receive.SessionId()` might **send** a cookie to the client,
it is important to remember that [order of operations matters](#order-of-operations).
:::


```go
//lib/routes/welcome/view.go
package welcome

import (
    "main/lib/core/clients"
    "main/lib/core/receive"
)

func View(client *clients.Client) {
    _ = receive.SessionId(client) // Retrieves session id.
}
```

## Redirect

Use `send.Redirect()` to redirect to a different location.

```go
//lib/routes/welcome/view.go
package welcome

import (
    "main/lib/core/clients"
    "main/lib/core/send"
)

func View(client *clients.Client) {
    send.Redirect(client, "/login", 307) // Redirects to /login.
}
```

## Navigate

Use `send.Navigate()` to redirect to a different location with status `302`.

```go
//lib/routes/welcome/view.go
package welcome

import (
    "main/lib/core/clients"
    "main/lib/core/send"
)

func View(client *clients.Client) {
    send.Navigate(client, "/login") // Redirects to /login with status 302.
}
```