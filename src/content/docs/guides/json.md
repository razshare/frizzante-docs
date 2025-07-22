---
title: Json
---

Use `connections.ReceiveJson()` to parse incoming content as json and `connections.SendJson()` to send data as json when using `POST` and `PUT` http verbs.

```go
routes.Route{Pattern: "POST /", Handler: handlers.Welcome}
// or
routes.Route{Pattern: "PUT /", Handler: handlers.Welcome}
```

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

// Defines a struct in which to store the json content.
type GreetingDetails struct {
    Name string `json:"name"`
}

func Welcome(con *connections.Connection) {
    // Parses the content and stores it in value.
    value := connections.ReceiveJson[GreetingDetails](con, value)
    // Sends it back.
    connections.SendJson(con, value)
}
```