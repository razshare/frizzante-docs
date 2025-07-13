---
title: Redirect
---

Use `SendRedirect()` to redirect to a different location.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(con *connections.Connection) {
    con.SendRedirect("/login", 302) // Redirects to /login
}
```