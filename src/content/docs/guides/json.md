---
title: Json
---

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