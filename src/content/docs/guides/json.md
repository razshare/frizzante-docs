---
title: Json
---

Use `ReceiveJson()` to parse incoming content as json and `SendJson()` to send data as json when using `POST` and `PUT` http verbs.

```go
routes.Route{Pattern: "POST /", Handler: handlers.Hello}
// or
routes.Route{Pattern: "PUT /", Handler: handlers.Hello}
```

```go
//lib/handlers/hello.go
package handlers

import "github.com/razshare/frizzante/connections"

type GreetingDetails struct {
    Name string `json:"name"`
}

func Hello(con *connections.Connection) {
    var value *GreetingDetails // Prepares empty value.
    con.ReceiveJson(value)     // Parses the content into value.
    con.SendJson(value)        // Sends it back.
}
```