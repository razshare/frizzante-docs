---
title: Navigate
---

Use `SendNavigate()` to redirect to a different location with status `303`.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(connection *connections.Connection) {
    connection.SendNavigate("/login") // Redirects to /login with status 303.
}
```