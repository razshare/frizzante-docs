---
title: Redirect
---

Use `connections.SendRedirect()` to redirect to a different location.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(con *connections.Connection) {
    // Redirects to /login.
    connections.SendRedirect(con, "/login", 307)
}
```