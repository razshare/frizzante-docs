---
title: Navigate
---

Use `connections.SendNavigate()` to redirect to a different location with status `303`.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(con *connections.Connection) {
    // Redirects to /login with status 303.
    connections.SendNavigate(con, "/login")
}
```