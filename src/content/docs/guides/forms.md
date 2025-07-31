---
title: Forms
---

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
    connection.SendMessage("Hello " + name) // Sends text.
}
```