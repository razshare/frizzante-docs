---
title: Cookies
---

Use `ReceiveCookie()` to retrieve cookies and `SendCookie()` to send them.

```go
//lib/handlers/welcome.go
package handlers

import "github.com/razshare/frizzante/connections"

func Welcome(con *connections.Connection) {
    id := con.ReceiveCookie("session-id") // Retrieves cookie.
    con.SendCookie("session-id", id)      // Sends it back.
}
```