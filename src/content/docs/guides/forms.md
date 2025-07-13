---
title: Forms
---

Use `ReceiveForm()` to retrieve and parse forms
when using `POST` and `PUT` http verbs.

```go
web.Route{Pattern: "POST /", Handler: handlers.Welcome}
// or
web.Route{Pattern: "PUT /", Handler: handlers.Welcome}
```

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(con *connections.Connection) {
    form := con.ReceiveForm()        // Retrieves the form.
    name := form.Get("name")         // Retrieves field "name".
    con.SendMessage("Hello " + name) // Sends text.
}
```