---
title: Redirect
---

Use `SendRedirect()` to redirect to a different location.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    connection.SendRedirect("/login", 307) // Redirects to /login.
}
```