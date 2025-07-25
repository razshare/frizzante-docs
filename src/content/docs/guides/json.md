---
title: Json
---

Use `ReceiveJson()` to parse incoming content as json and `SendJson()` to send data as json when using `POST` and `PUT` http verbs.

```go
routes.Route{Pattern: "POST /", Handler: handlers.Welcome}
// or
routes.Route{Pattern: "PUT /", Handler: handlers.Welcome}
```

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

type GreetingDetails struct { // Defines a struct in which to 
    Name string `json:"name"` // store the json content.
}

func Welcome(con *connections.Connection) {
    var value GreetingDetails // Create a zero value.
    con.ReceiveJson(&value)   // Parses the content 
                              // and stores it in value.
    con.SendJson(value)       // Sends it back.
}
```