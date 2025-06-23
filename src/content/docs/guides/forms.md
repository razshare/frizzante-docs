---
title: Forms
---

Use `ReceiveForm()` to retrieve and parse forms
when using `POST` and `PUT` http verbs.

```go
libsrv.Route{Pattern: "POST /", Handler: handlers.Hello}
// or
libsrv.Route{Pattern: "PUT /", Handler: handlers.Hello}
```

```go
//lib/handlers/hello.go
package handlers

import "github.com/razshare/frizzante/libcon"

func Hello(con *libcon.Connection) {
    form := con.ReceiveForm()        // Retrieves the form.
    name := form.Get("name")         // Retrieves field "name".
    con.SendMessage("Hello " + name) // Sends text.
}
```