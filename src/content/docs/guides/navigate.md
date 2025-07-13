---
title: Navigate
---

Use `SendNavigate()` to redirect to a different location with status `302`.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(con *connections.Connection) {
    con.SendNavigate("/login") // Redirects to /login 
                               // with status 302
}
```