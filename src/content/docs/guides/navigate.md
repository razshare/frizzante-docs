---
title: Navigate
---

Use `SendNavigate()` to redirect to a different location with status `302`.

```go
//lib/handlers/hello.go
package handlers

import "github.com/razshare/frizzante/connections"

func Hello(con *connections.Connection) {
    con.SendNavigate("/login") // Redirects to /login 
                               // with status 302
}
```