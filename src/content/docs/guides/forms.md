---
title: Forms
---

Use `ReceiveForm()` to retrieve and parse forms
when using `POST` and `PUT` http verbs.

```go
frz.Route{Pattern: "POST /", Handler: handlers.Hello}
// or
frz.Route{Pattern: "PUT /", Handler: handlers.Hello}
```

```go
//lib/handlers/hello.go
package handlers

import "github.com/razshare/frizzante/frz"

func Hello(c *frz.Connection) {
    form := c.ReceiveForm()         // Retrieves and parses the form.
    name := form.Get("name")        // Retrieves field "name".
    c.SendMessage("Hello " + name)  // Sends text.
}
```