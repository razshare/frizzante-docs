---
title: Routes
---

You can add a new route to the server with `AddRoute()`.

```go
//main.go
package main

import (
    "github.com/razshare/frizzante/web"
    "main/lib/handlers"
)

var server = servers.New() // Creates server.
var route = routes.Route{  // Creates route.
    Pattern: "GET /", 
    Handler: handlers.Welcome,
}

func main() {
    server.AddRoute(route) // Adds route.
    server.Start()         // Starts server.
}
```

Where `handlers.Welcome` is a function pointer

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(con *connections.Connection) {
    con.SendMessage("Hello") // Sends text.
}
```