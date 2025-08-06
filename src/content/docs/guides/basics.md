---
title: Basics
---

Before doing anything you need to create and start a new server.

Create a new server with `servers.New()`, then followup with `Start()` in order to start it.

```go
//main.go
package main

import "github.com/razshare/frizzante/servers"

func main() {
    server := servers.New() // Creates a server.
    server.Start()          // Starts the server.
}
```

## Routes

Each server exposes a slice of **Routes** which you can freely modify.

You can add a new route by appending to or overwriting `server.Routes`.

```go
//main.go
package main

import (
    "github.com/razshare/frizzante/routes"
    "github.com/razshare/frizzante/servers"
    "main/lib/handlers"
)

var server = servers.New()                             // Creates server.

func main() {
    server.Routes = []routes.Route{                    // Overwrites routes.
        {Pattern: "GET /", Handler: handlers.Welcome}, // Adds route.
    }
    server.Start()                                     // Starts server.
}
```

Where `handlers.Welcome` is a function pointer.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    // [...]
}
```

## Route Patterns

Route patterns can define dynamic **path fields** using `{}` syntax.

```go
routes.Route{Pattern: "GET /{name}", Handler: handlers.Welcome}
```

Path fields can then be retrieved with `ReceivePath()`.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    name := connection.ReceivePath("name")  // Retrieves field "name".
    connection.SendMessage("Hello " + name) // Sends message..
}
```

## Messages

Use `ReceiveMessage()` to retrieve messages sent by the client.

:::note
`ReceiveMessage()` behaves differently based on the type of connection.

| Type of Connection                          | Description                         |
|---------------------------------------------|-------------------------------------|
| Http                                        | Reads the body of the request.      |
| [Server Sent Events](../server-sent-events) | Reads the body of the request.      |
| [Web Sockets](../web-sockets)               | Reads the next incoming message.    |
:::

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    _ := connection.ReceiveMessage() // Retrieves message.
}
```

Use `SendMessage()` to send a message to the client.

:::note
`SendMessage()` behaves differently based on the type of connection.

| Type of Connection                          | Description                                                     |
|---------------------------------------------|-----------------------------------------------------------------|
| Http                                        | Sends the body of the response.                                 |
| [Server Sent Events](../server-sent-events) | Sends a new message to the client using the current event name. |
| [Web Sockets](../web-sockets)               | Sends a new message to the client.                              |
:::

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    connection.SendMessage("Hello.") // Sends message.
}
```

## Headers

Use `ReceiveHeader()` to retrieve header fields sent by the client.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    _ := connection.ReceiveHeader("Accept") // Retrieves field "Accept".
}
```

Use `SendHeader()` to send header fields to the client.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    accept := connection.ReceiveHeader("Accept")  // Retrieves field "Accept".
    connection.SendHeader("Content-Type", accept) // Sends it back.
}
```

## Status

Use `SendStatus()` to send the status of the response to the client.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    connection.SendStatus(404)           // Sends status 404.
    connection.SendMessage("Not found.") // Sends message..
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

For example, sending the status code with `SendStatus()` **after** you've already sent content
with `SendMessage()` is not allowed.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    connection.SendMessage("Hello.") // Sends message. (Succeeds).
    connection.SendStatus(404)       // Sends status (Fails).
}
```

`connections.SendStatus(404)` will fail and the client will receive status `200` instead of `404`.

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

Use `ReceiveQuery()` to retrieve query fields.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    name := connection.ReceiveQuery("name") // Retrieves field "name".
    connection.SendMessage("Hello " + name) // Sends message..
}
```

## Forms

Use `ReceiveForm()` to retrieve and parse forms
when using `POST` and `PUT` http verbs.

```go
routes.Route{Pattern: "POST /", Handler: handlers.Welcome}
// or
routes.Route{Pattern: "PUT /", Handler: handlers.Welcome}
```

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    form := connection.ReceiveForm()        // Retrieves the form.
    name := form.Get("name")                // Retrieves field "name".
    connection.SendMessage("Hello " + name) // Sends message..
}
```


## Json


Use `ReceiveJson()` to parse incoming content as json when using `POST` and `PUT` http verbs and `SendJson()` to send data as json.

```go
routes.Route{Pattern: "POST /", Handler: handlers.Welcome}
// or
routes.Route{Pattern: "PUT /", Handler: handlers.Welcome}
```

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

type GreetingDetails struct {      // Defines a struct in which to 
    Name string `json:"name"`      // store the json content.
}

func Welcome(connection *connections.Connection) {
    var value *GreetingDetails     // Creates a value pointer.
    connection.ReceiveJson(value)  // Parses the content and stores it 
                                   // in the value pointer.
    connection.SendJson(value)     // Sends it back.
}
```

## Cookies

Use `ReceiveCookie()` to retrieve cookies and `SendCookie()` to send them.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    id := connection.ReceiveCookie("session-id") // Retrieves cookie.
    connection.SendCookie("session-id", id)      // Sends it back.
}
```

## Redirect

Use `SendRedirect()` to redirect to a different location.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    connection.SendRedirect("/login", 307) // Redirects to /login.
}
```

## Navigate

Use `SendNavigate()` to redirect to a different location with status `303`.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    connection.SendNavigate("/login") // Redirects to /login with status 303.
}
```