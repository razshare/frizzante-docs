---
title: Routes
---

You can add a new route to the server with `servers.AddRoute()`.

```go
//main.go
package main

import (
    "github.com/razshare/frizzante/web"
    "main/lib/handlers"
)

// Creates server.
var server = servers.New()

// Creates route.
var route = routes.Route{
    Pattern: "GET /", 
    Handler: handlers.Welcome,
}

func main() {
     // Adds route.
    servers.AddRoute(server, route)
    // Starts server.
    servers.Start(server)
}
```

Where `handlers.Welcome` is a function pointer

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(con *connections.Connection) {
    // Sends text.
    connections.SendMessage(con, "Hello")
}
```