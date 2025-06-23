---
title: Redirect
---

Use `SendRedirect()` to redirect to a different location.

```go
//lib/handlers/hello.go
package handlers

import "github.com/razshare/frizzante/libcon"

func Hello(con *libcon.Connection) {
    con.SendRedirect("/login", 302) // Redirects to /login
}
```