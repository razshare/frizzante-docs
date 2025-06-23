---
title: Redirect
---

Use `SendRedirect()` to redirect to a different location.

```go
//lib/handlers/hello.go
package handlers

import "github.com/razshare/frizzante/connections"

func Hello(con *connections.Connection) {
    con.SendRedirect("/login", 302) // Redirects to /login
}
```