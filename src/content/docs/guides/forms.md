---
title: Forms
---

Use `connections.ReceiveForm()` to retrieve and parse forms
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

func Welcome(con *connections.Connection) {

    // Retrieves the form.
    form := connections.ReceiveForm(con)
    // Retrieves field "name".
    name := form.Get("name")
    // Sends text.
    connections.SendMessage(con, "Hello " + name)
}
```